import HousekeepingTask from "../models/HousekeepingTask";
import { default as MapDateOnly } from "./dateonly";

export default function Map(task: HousekeepingTask): HousekeepingTask{
    return {
        ...task,
        date: MapDateOnly(task.date as unknown as string),
    }
}

export function MapAll(tasks: HousekeepingTask[]): HousekeepingTask[] {
    return tasks.map(Map);
}
