import axios from "axios";

export default class Api {
    private tokenName;
    token?: string;
    constructor(accessToken?: string, tokenName?: string) {
        this.token = accessToken
        this.tokenName = tokenName ?? 'Token';
    }

    async get(url: string): Promise<any> {
        return await axios.get(url, { headers: { Authorization: `${this.tokenName} ${this.token}` } })
            .then(response => response.data);
    }

    async post(url: string, data: any): Promise<any> {
        return await axios.post(url, data, { headers: { Authorization: `${this.tokenName} ${this.token}` } })
            .then(response => response.data);
    }

    async put(url: string, data: any): Promise<any> {
        return await axios.put(url, data, { headers: { Authorization: `${this.tokenName} ${this.token}` } })
            .then(response => response.data);
    }

    async delete(url: string): Promise<any> {
        return await axios.delete(url, { headers: { Authorization: `${this.tokenName} ${this.token}` } })
            .then(response => response.data);
    }
}