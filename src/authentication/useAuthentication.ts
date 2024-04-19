import { createContext, useContext } from "react";
import AuthenticationProviderInterface from "./IAuthenticationProvider";

const stub = (): never => {
    throw new Error('You forgot to wrap your component in <AuthenticationProvider>.');
};

const initialContext: AuthenticationProviderInterface = {
    getAccessToken: stub,
    signOut: stub,
    signIn: stub,
}

export const AuthenticationContext = createContext<AuthenticationProviderInterface>(initialContext);

const useAuthentication = (): AuthenticationProviderInterface => useContext(AuthenticationContext)

export default useAuthentication;