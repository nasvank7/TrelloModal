export type Id = string | number;
export type Column = {
    id: Id,
    userId:number | undefined,
    title: string

}

export type Task = {
    id: Id,
    columnId: Id,
    content: string
}