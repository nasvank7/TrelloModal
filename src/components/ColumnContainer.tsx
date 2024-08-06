import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcons from "../Icons/TrashIcons";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcons from "../Icons/PlusIcons";
import TaskCard from "./taskCard";

interface Props {
  column: Column;
  deleteColumns: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id, content: string) => void;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const ColumnContainer = (props: Props) => {
  const {
    column,
    deleteColumns,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;
  const [editNode, setEditNode] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [newTaskContent, setNewTaskContent] = useState("");
  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const handleAddModal = (id: Id) => {
    setAddModal(true);
  };
  const handleCreateTask = () => {
    createTask(column.id, newTaskContent);
    setAddModal(false);
    setNewTaskContent("");
  };
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editNode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-coloumnBackgroundColor opacity-60 border-rose-200 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      ></div>
    );
  }

  const modal = () => {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
          <div className="relative w-auto my-6 mx-auto max-w-3xl bg-mainBackgroundColor rounded-lg">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-mainBackgroundColor outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 ">
                <h3 className="text-3xl font-semibold ">Add Task</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setAddModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <input
                  type="text"
                  className="w-full bg-coloumnBackgroundColor h-[50px] text-white"
                  value={newTaskContent}
                  onChange={(e) => setNewTaskContent(e.target.value)}
                  name=""
                  id=""
                />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setAddModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-coloumnBackgroundColor hover:bg-gray-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    handleCreateTask(), setAddModal(false);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-coloumnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div className="flex items-center justify-center gap-2">
        <div
          onClick={() => {
            setEditNode(true);
          }}
          {...attributes}
          {...listeners}
          className="bg-mainBackgroundColor text-base w-full h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-coloumnBackgroundColor
            border-4 flex items-center justify-between"
        >
          <div className="flex justify-center items-center bg-coloumnBackgroundColor px-2 py-1 text-sm rounded-full"></div>

          {!editNode && column.title}
          {editNode && (
            <input
              className="bg-black focus:border-rose-400 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditNode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditNode(false);
              }}
            />
          )}
          <button
            onClick={() => {
              deleteColumns(column.id);
            }}
            className="stroke-gray-400 hover:stroke-white hover:bg-coloumnBackgroundColor rounded px-1 py-2"
          >
            <TrashIcons />
          </button>
        </div>
      </div>

      <div className="flex flex-grow flex-col gap-2 p-2 overflow-y-auto overflow-x-hidden">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <>
              <TaskCard
                updateTask={updateTask}
                deleteTask={deleteTask}
                key={task.id}
                task={task}
              />
            </>
          ))}
        </SortableContext>
      </div>
      <button
        onClick={() => {
          //   createTask(column.id);
          handleAddModal(column.id);
        }}
        className="flex gap-2 items-center justify-center border-coloumnBackgroundColor border-2 rounded-md p-4 border-x-coloumnBackgroundColor bg-gray-900 hover:bg-mainBackgroundColor hover:text-rose-300 active:bg-black"
      >
        <PlusIcons />
        Add Task
      </button>
      {addModal && modal()}
    </div>
  );
};

export default ColumnContainer;
