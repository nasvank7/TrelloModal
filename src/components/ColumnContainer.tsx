
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcons from "../Icons/TrashIcons";
import { Column, Id, Task } from "../types"
import { CSS } from '@dnd-kit/utilities'
import { useMemo, useState } from "react";
import PlusIcons from "../Icons/PlusIcons";
import TaskCard from "./taskCard";

interface Props {
    column: Column;
    deleteColumns: (id: Id) => void
    updateColumn: (id: Id, title: string) => void
    createTask: (columnId: Id) => void
    tasks: Task[]
    deleteTask: (id: Id) => void
    updateTask: (id: Id, content: string) => void
}

const ColumnContainer = (props: Props) => {
    const { column, deleteColumns, updateColumn, createTask, tasks, deleteTask, updateTask } = props
    const [editNode, setEditNode] = useState(false)

    const taskIds = useMemo(() => { return tasks.map((task) => task.id) }, [tasks])
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        },
        disabled: editNode
    })


    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    if (isDragging) {
        return <div ref={setNodeRef}
            style={style}
            className="bg-coloumnBackgroundColor opacity-60 border-rose-200 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">

        </div>
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-coloumnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
        >
            <div className="flex gap-2">
                <div
                    onClick={() => {
                        setEditNode(true)
                    }}
                    {...attributes} {...listeners} className="bg-mainBackgroundColor text-base h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-coloumnBackgroundColor
            border-4 flex items-center justify-between">
                    <div className="flex justify-center items-center bg-coloumnBackgroundColor px-2 py-1 text-sm rounded-full">0</div>

                    {!editNode && column.title}
                    {editNode && <input
                        className="bg-black focus:border-rose-400 border rounded outline-none px-2"
                        value={column.title}
                        onChange={(e) => updateColumn(column.id, e.target.value)}
                        autoFocus
                        onBlur={() => setEditNode(false)}
                        onKeyDown={e => {
                            if (e.key !== "Enter") return;
                            setEditNode(false)
                        }}
                    />}
                </div>
                <button
                    onClick={() => {
                        deleteColumns(column.id)
                    }}
                    className="stroke-gray-400 hover:stroke-white hover:bg-coloumnBackgroundColor rounded px-1 py-2"><TrashIcons /></button>
            </div>

            <div className="flex flex-grow flex-col gap-2 p-2 overflow-y-auto overflow-x-hidden">
                <SortableContext items={taskIds}>
                    {tasks.map((task) =>
                    (<>
                        <TaskCard updateTask={updateTask} deleteTask={deleteTask} key={task.id} task={task} />
                    </>)
                    )}
                </SortableContext>
            </div>
            <button onClick={() => {
                createTask(column.id)
            }} className="flex gap-2 items-center border-coloumnBackgroundColor border-2 rounded-md p-4 border-x-coloumnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-300 active:bg-black"><PlusIcons />Add Task</button>
        </div>
    )
}

export default ColumnContainer