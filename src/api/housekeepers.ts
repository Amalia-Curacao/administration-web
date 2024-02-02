import axios from "axios";
import Housekeeper from "../models/Housekeeper";

export const housekeepersApi = {
    getAll: (scheduleId: number): Promise<Housekeeper[]> => 
        axios.get(process.env.REACT_APP_API_URL + "/Housekeepers/GetAll/" + scheduleId)
            .then(response => response.data),

    get: (housekeeperId: number): Promise<Housekeeper> =>
        axios.get(process.env.REACT_APP_API_URL + "/Housekeepers/Get/" + housekeeperId)
            .then(response => response.data),

    create: (housekeeper: Housekeeper): Promise<Housekeeper> =>
        axios.post(process.env.REACT_APP_API_URL + "/Housekeepers/Create", housekeeper)
            .then(response => response.data),

    update: (housekeeper: Housekeeper): Promise<Housekeeper> =>
        axios.post(process.env.REACT_APP_API_URL + "/Housekeepers/Update", housekeeper)
            .then(response => response.data),
    
    delete: (housekeeperId: number): Promise<boolean> =>
        axios.delete(process.env.REACT_APP_API_URL + "/Housekeepers/Delete/" + housekeeperId)
            .then(response => response.data),
}