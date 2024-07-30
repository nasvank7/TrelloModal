// import React from 'react'

import { useMemo, useState } from "react";
import PlusIcons from "../Icons/PlusIcons";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./taskCard";
const TrelloBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //300px
      },
    })
  );
  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };
  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };
  const deleteColumn = (id: Id) => {
    const filteredColumn = columns.filter((col) => col.id !== id);
    setColumns(filteredColumn);
    const newTask = tasks.filter((task) => task.columnId !== id);
    setTasks(newTask);
  };

  const createTask = (columnId: Id, content: string) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: Id, content: string) => {
    const newTask = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      }
      return { ...task, content };
    });
    setTasks(newTask);
  };

  const deleteTask = (id: Id) => {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  };
  const updateColumn = (id: Id, title: string) => {
    const newColumn = columns.map((col) => {
      if (col.id !== id) {
        return col;
      }
      return { ...col, title };
    });
    setColumns(newColumn);
  };
  const onDragStart = (e: DragStartEvent) => {
    console.log("Drag start", e);
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }
    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  };
  const onDragEnd = (e: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = e;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) {
      return;
    }
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) {
      return;
    }

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    if (!isActiveTask) return;
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id == activeColumnId);
        const overIndex = tasks.findIndex((t) => t.id === overColumnId);
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === "Column";
    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id == activeColumnId);

        tasks[activeIndex].columnId = overColumnId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  return (
    <div className="m-auto flex min-h-screen w-full items-center  overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-2">
          <div className=" flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  updateTask={updateTask}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  key={column.id}
                  deleteColumns={deleteColumn}
                  column={column}
                  updateColumn={updateColumn}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="h-[60px] w-[350px]  min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-coloumnBackgroundColor ring-rose-400 hover:ring-2 flex items-center justify-center gap-2"
          >
            <PlusIcons /> Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                updateTask={updateTask}
                createTask={createTask}
                deleteTask={deleteTask}
                column={activeColumn}
                deleteColumns={deleteColumn}
                updateColumn={updateColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                deleteTask={deleteTask}
                updateTask={updateTask}
                task={activeTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default TrelloBoard;
