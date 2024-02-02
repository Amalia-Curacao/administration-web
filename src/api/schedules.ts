import axios from "axios";
import Schedule from "../models/Schedule";

const schedulesApi = {
    getAll: () : Promise<Schedule[]> =>
        axios.get(process.env.REACT_APP_API_URL + "/Schedules/Get")
            .then(response => response.data),

    get: (scheduleId: number) : Promise<Schedule> =>
        axios.get(process.env.REACT_APP_API_URL + "/Schedules/Get/" + scheduleId)
            .then(response => response.data),

    create: (scheduleName: string) : Promise<Schedule> =>
        axios.get(process.env.REACT_APP_API_URL + "/Schedules/Create/" + scheduleName)
            .then(response => response.data),
    
    update: (schedule: Schedule) : Promise<Schedule> =>
        axios.post(process.env.REACT_APP_API_URL + "/Schedules/Update", schedule)
            .then(response => response.data),

    delete: (scheduleId: number) : Promise<boolean> =>
        axios.delete(process.env.REACT_APP_API_URL + "/Schedules/Delete/" + scheduleId)
            .then(response => response.data),
}

export default schedulesApi;