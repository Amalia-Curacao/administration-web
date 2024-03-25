import { ToJsonGuest } from "../extensions/ToJson";
import Guest from "../models/Guest";
import Api from "./api";

export default class GuestsApi {
    baseUrl: string = `${process.env.REACT_APP_API_URL}/Guests`;
    api : Api;

    constructor(token: string){
        this.api = new Api(token);
    }

    async set(reservationId: number, guests: Guest[]) : Promise<Guest[]> {
        return await this.api.put(process.env.REACT_APP_API_URL + "/Set/" + reservationId, guests!.map(ToJsonGuest));
    }

    async create(guest: Guest) : Promise<Guest> {
        return await this.api.post(process.env.REACT_APP_API_URL + "/Create", ToJsonGuest(guest));
    }

    async update(guest: Guest) : Promise<Guest> {
        return await this.api.post(process.env.REACT_APP_API_URL + "/Update", ToJsonGuest(guest));
    }

    async delete(guestId: number) : Promise<boolean> {
        return await this.api.delete(process.env.REACT_APP_API_URL + "/Delete/" + guestId);
    }
}