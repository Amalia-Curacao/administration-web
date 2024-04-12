import { ToJsonGuest } from "../extensions/ToJson";
import Guest from "../models/Guest";
import Api from "./api";

export default class GuestsApi {
    baseUrl: string = `${process.env.REACT_APP_API_URL}/Guests`;
    api : Api;

    constructor(token: string){
        this.api = new Api(token);
    }
    
    async create(guest: Guest) : Promise<Guest> {
        return await this.api.post(`${this.baseUrl}/Create`, ToJsonGuest(guest));
    }

    async update(guest: Guest) : Promise<Guest> {
        return await this.api.post(`${this.baseUrl}/Update`, ToJsonGuest(guest));
    }

    async delete(guestId: number) : Promise<boolean> {
        return await this.api.delete(`${this.baseUrl}/Delete/${guestId}`);
    }
}