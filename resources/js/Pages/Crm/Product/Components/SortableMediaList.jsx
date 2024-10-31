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
import {Card} from "antd";

const cardActions = [<button>Set Primary</button>, <button>Delete</button>];

function SortableImage({ id, url }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '150px',
    height: '150px',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'move',
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} actions={cardActions}>
      <img src={url} alt={`img-${id}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
        <div className="image-list" style={{ display: 'flex', gap: '10px' }}>
          {images.map((image) => (
            <SortableImage key={image.id} id={image.id} url={image.url} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default ImageList;
