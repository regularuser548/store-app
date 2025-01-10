import React, {useState} from 'react';
//import './index.css';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {DndContext, PointerSensor, useSensor} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import {CSS} from '@dnd-kit/utilities';
import {Button, message, Upload} from 'antd';
import {usePage} from "@inertiajs/react";

const DraggableUploadListItem = ({originNode, file}) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
    id: file.uid,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      // prevent preview event when drag end
      className={isDragging ? 'is-dragging' : ''}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === 'error' && isDragging ? originNode.props.children : originNode}
    </div>
  );
};

export default function MediaUploadForm({text, fileList, changeHandler, accept, listType = 'text', max = 1, multiple = true, props}) {

  const {errors} = usePage().props;

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const onDragEnd = ({active, over}) => {
    if (active.id !== over?.id) {
      changeHandler((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const beforeUpload = (file) => {
    changeHandler([...fileList, file]);
    return false;
  }
  const onChange = ({fileList: newFileList}) => {
    changeHandler(newFileList);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        {text}
      </div>
    </button>
  );
  return (
    <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
      <SortableContext items={fileList.map((i) => i.uid)} strategy={horizontalListSortingStrategy}>
        <Upload
          fileList={fileList}
          onChange={onChange}
          listType={listType}
          beforeUpload={beforeUpload}
          accept={accept}
          multiple={multiple}
          itemRender={(originNode, file) => (
            <DraggableUploadListItem originNode={originNode} file={file}/>
          )}
          {...props}
          maxCount={max}
        >
          {fileList.length >= max ? null : uploadButton}
        </Upload>
      </SortableContext>
    </DndContext>
  );


}
