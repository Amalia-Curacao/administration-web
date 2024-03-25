import axios from "axios";

export default class Api {
    token?: string;
    constructor(accessToken?: string) {
        this.token = accessToken
    }

    async get(url: string): Promise<any> {
        return await axios.get(url, { headers: { Authorization: `Bearer ${this.token}` } })
            .then(response => response.data);
    }

    async post(url: string, data: any): Promise<any> {
        return await axios.post(url, data, { headers: { Authorization: `Bearer ${this.token}` } })
            .then(response => response.data);
    }

    async put(url: string, data: any): Promise<any> {
        return await axios.put(url, data, { headers: { Authorization: `Bearer ${this.token}` } })
            .then(response => response.data);
    }

    async delete(url: string): Promise<any> {
        return await axios.delete(url, { headers: { Authorization: `Bearer ${this.token}` } })
            .then(response => response.data);
    }
}