import Api from "./api";

export default class AccessTokenApi {
    private baseUrl: string = `${process.env.REACT_APP_API_URL}/AccessToken`;
    private api : Api;

    constructor(auth0token?: string) {
        this.api = new Api(auth0token, "Bearer");
    }
    
    async auth0() : Promise<string> {
        if(!this.api) throw Error("Invalid operation; Auth0 token is not set");
        return await this.api.get(`${this.baseUrl}/Auth0`);
    }

    async revoke(token?: string) : Promise<void> {
        if(token) await this.api.get(`${this.baseUrl}/Revoke/${token}`);
        else throw Error("Invalid operation; No token to revoke");
    }
}