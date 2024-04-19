
export default interface IAuthenticationProvider {
    getAccessToken: () => Promise<string>;
    signOut: () => void;
    signIn: () => void;
}