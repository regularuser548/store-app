import React, {useState} from 'react';
import {
  DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, verticalListSortingStrategy, useSortable, rectSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Button, Card, message, Tooltip} from "antd";
import {CheckOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

function SortableImage({image, setPrimaryHandler, deleteHandler}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: image.id});
  const style = {
    transform: CSS.Transform.toString(transform), transition,

    cursor: 'move',
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Tooltip title='Зробити основним'>
        {/*Set Primary Button*/}
        <Button onClick={() => setPrimaryHandler(image.id)} className='m-2'>
          {image.isPrimary ? <CheckOutlined/> : <PlusOutlined/>}
        </Button>
      </Tooltip>

      <Tooltip title='Видалити'>
        {/*Delete Button*/}
        <Button color="danger" onClick={() => deleteHandler(image.id)}><DeleteOutlined/></Button>
      </Tooltip>
      <img src={image.url} alt=''
           className='w-36 h-36 object-contain'/>
    </Card>
  );
}

function ImageList({images, setImages}) {

  const [isInProgress, setIsInProgress] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const successMsg = () => {
    messageApi.open({
      type: 'success',
      content: 'Зміни збережено',
    });
  };
  const errorMsg = () => {
    messageApi.open({
      type: 'error',
      content: 'Помилка при збереженні, відкат...',
    });
  };

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

    setIsInProgress(true);

    const oldImages = [...images];

    setImages((images) => images.map((image) => image.id === id ? {...image, isPrimary: true} : {
      ...image,
      isPrimary: false
    }));

    axios.post(route('product.setPrimary', {media: id}))
      .then(function () {
        successMsg();
      })
      .catch(function () {
        errorMsg();
        setImages(oldImages);
      })
      .finally(function () {
        setIsInProgress(false);
      });
  }

  function handleDelete(id) {
    if (isInProgress) return;

    setIsInProgress(true);

    const oldImages = [...images];

    setImages((images) => images.filter((image) => image.id !== id));

    axios.delete(route('product.deleteMedia', {media: id}))
      .then(
        function () {
          successMsg();
        }
      )
      .catch(function () {
        errorMsg();
        setImages(oldImages);
      }).finally(function () {
      setIsInProgress(false);
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={images} strategy={rectSortingStrategy}>
        {contextHolder}
        <div className="flex flex-wrap gap-2">
          {images.map((image) => (
            <SortableImage key={image.id} image={image} setPrimaryHandler={handleSetPrimary}
                           deleteHandler={handleDelete}/>
          ))}
        </div>
      </SortableContext>
    </DndContext>)


}

export default ImageList;
