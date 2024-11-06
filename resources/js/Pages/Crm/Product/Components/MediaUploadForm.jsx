import React, {useState} from 'react';
//import './index.css';
import {UploadOutlined} from '@ant-design/icons';
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

export default function MediaUploadForm({text, fileList, changeHandler, accept, listType = 'text', max = 1, props}) {

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
  return (
    <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
      <SortableContext items={fileList.map((i) => i.uid)} strategy={horizontalListSortingStrategy}>
        <Upload
          fileList={fileList}
          onChange={onChange}
          listType={listType}
          beforeUpload={beforeUpload}
          accept={accept}
          multiple={true}
          itemRender={(originNode, file) => (
            <DraggableUploadListItem originNode={originNode} file={file}/>
          )}
          {...props}
          maxCount={max}
        >
          <Button icon={<UploadOutlined/>}>{text}</Button>
        </Upload>
      </SortableContext>
      {errors.images && <div className="text-red-500">{errors.images}</div>}
      {errors.videos && <div className="text-red-500">{errors.videos}</div>}
    </DndContext>
  );


}
