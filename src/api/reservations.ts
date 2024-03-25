import Reservation from "../models/Reservation";
import Api from "./api";

export default class ReservationsApi {
    baseUrl: string = `${process.env.REACT_APP_API_URL}/Reservations`;
    api : Api;

    constructor(token: string){
        this.api = new Api(token);
    }
    async create(reservation: Reservation) : Promise<Reservation> {
        return await this.api.post(`${this.baseUrl}/Create`, reservation);
    }
    async update(reservation: Reservation) : Promise<Reservation> {
        return await this.api.post(`${this.baseUrl}/Update`, reservation);
    }
    async delete(reservationId: number) : Promise<boolean>{
        return await this.api.delete(`${this.baseUrl}/Delete/${reservationId}`);
    }
}