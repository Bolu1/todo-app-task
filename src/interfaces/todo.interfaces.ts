import { number } from "zod"

export interface Input{
    id: number,
    title: string,
    created?: number,
    directoryId?: number,
    done: boolean
}

