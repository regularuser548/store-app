import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {Button, Card, Tooltip} from "antd";
import {CheckOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";


function SortableImage({ id, url, primary = false }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,

    cursor: 'move',
  };

  const [isPrimary, setIsPrimary] = useState(primary);

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Tooltip title='Set Primary'>
        {/*Set Primary Button*/}
        <Button onClick={() => setIsPrimary(true)}>{isPrimary ? <CheckOutlined /> : <PlusOutlined/>}</Button>
      </Tooltip>

      <Tooltip title='Delete'>
        {/*Delete Button*/}
        <Button color="danger"><DeleteOutlined /></Button>
      </Tooltip>

      <img src={url} alt={`img-${id}`} className='max-w-48 max-h-48' />
    </Card>
  );
}

function ImageList({images, setImages}) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);
      setImages((images) => arrayMove(images, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={images} strategy={verticalListSortingStrategy}>
        <div className="flex gap-2">
          {images.map((image) => (
            <SortableImage key={image.id} id={image.id} url={image.url} primary={image.isPrimary} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default ImageList;
