import React, {useState} from 'react';
import {
  DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, verticalListSortingStrategy, useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Button, Card, Tooltip} from "antd";
import {CheckOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

function SortableImage({image, setPrimaryHandler}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: image.id});
  const style = {
    transform: CSS.Transform.toString(transform), transition,

    cursor: 'move',
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Tooltip title='Set Primary'>
        {/*Set Primary Button*/}
        <Button onClick={() => setPrimaryHandler(image.id)}>
          {image.isPrimary ? <CheckOutlined/> : <PlusOutlined/>}
        </Button>
      </Tooltip>

      <Tooltip title='Delete'>
        {/*Delete Button*/}
        <Button color="danger"><DeleteOutlined/></Button>
      </Tooltip>
      <img src={image.url} alt=''
           className='max-w-48 max-h-48'/>
    </Card>
  );
}

function ImageList({images, setImages}) {

  const [isInProgress, setIsInProgress] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  }));

  const handleDragEnd = (event) => {
    const {active, over} = event;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);
      setImages((images) => arrayMove(images, oldIndex, newIndex));
    }
  };

  function handleSetPrimary(id) {
    if (isInProgress) return;

    console.log(id);
    setIsInProgress(true);

    const oldImages = [...images];

    setImages((images) => images.map((image) => image.id === id ? {...image, isPrimary: true} : {
      ...image,
      isPrimary: false
    }));

    axios.post(route('product.setPrimary', {media: id}))
      .catch(function (error) {
        console.error("Failed to update:", error);
        setImages(oldImages);
      }).finally(function () {
      setIsInProgress(false);
    });
  }

  return (<DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
  >
    <SortableContext items={images} strategy={verticalListSortingStrategy}>
      <div className="flex gap-2">
        {images.map((image) => (
          <SortableImage key={image.id} image={image} setPrimaryHandler={handleSetPrimary} />
        ))}
      </div>
    </SortableContext>
  </DndContext>)
}


export default ImageList;
