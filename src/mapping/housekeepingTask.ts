import { ToJsonDateOnly } from "../extensions/ToJson";
import HousekeepingTask from "../models/HousekeepingTask";
import { default as MapDateOnly } from "./dateonly";

export default function Map(task: HousekeepingTask): HousekeepingTask{
    return {
        ...task,
        date: MapDateOnly(task.date ? ToJsonDateOnly(task.date) : ""),
    }
}

export function MapAll(tasks: HousekeepingTask[]): HousekeepingTask[] {
    return tasks.map(Map);
}
