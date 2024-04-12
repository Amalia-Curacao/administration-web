import { Fragment, ReactElement, useCallback, useMemo } from "react";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';
import AccessTokenApi from "../api/accessToken";
import { useCookies } from "react-cookie";
import useAuthentication, { AuthenticationContext } from "./useAuthentication";
import AuthenticationProviderInterface from "./IAuthenticationProvider";

const Auth0ProviderLayout = ({children}: {children: ReactElement}): ReactElement => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  if(domain === undefined) throw Error("Auth0 domain is undefined, env: REACT_APP_AUTH0_DOMAIN");
  if(clientId === undefined) throw Error("Auth0 client id is undefined, env: REACT_APP_AUTH0_CLIENT_ID");
  
  return (<Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{redirect_uri: window.location.origin}}>
      {children}
  </Auth0Provider>);
}

const AuthenticationProvider = (): ReactElement => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const initialContext = useAuthentication();

  const getAccessToken = useCallback(async () => {
    if(cookies.accessToken) return cookies.accessToken;
    const auth0Token = await getAccessTokenSilently();
    const token = await new AccessTokenApi(auth0Token).auth0();
    const cookieOptions = { 
      path: '/',
      // 2 hours 
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2)
    };
    setCookie('accessToken', token, cookieOptions);
    return token;
  }, [cookies.accessToken, getAccessTokenSilently, setCookie]);

  const signOut = useCallback(async () => {
    console.log('signOut');
    if(!cookies.accessToken) return;
    console.log("accessToken");
    await new AccessTokenApi().revoke(cookies.accessToken);
    await logout();
    setCookie('accessToken', '', { path: '/', expires: new Date(0) });
  }, [cookies.accessToken, logout, setCookie]);

  const signIn = useCallback(async () => {
    await signOut();
    await loginWithRedirect();
  }, [loginWithRedirect, signOut]);

  const context = useMemo<AuthenticationProviderInterface>(() => {
    return { 
      ...initialContext,
      getAccessToken: getAccessToken,
      signOut: signOut,
      signIn: signIn,
    };
  }, [initialContext, getAccessToken, signOut, signIn]);

  if (isLoading) return <Fragment/>;
  if (!isAuthenticated) {
    loginWithRedirect();
    return <Fragment/>;
  }
  else {
    return (<AuthenticationContext.Provider value={context}>
      <Outlet/>
    </AuthenticationContext.Provider>);
  }
}

const Provider = (): ReactElement => {
  return (
    <Auth0ProviderLayout>
      <AuthenticationProvider/>
    </Auth0ProviderLayout>
  );
};


export default Provider;
