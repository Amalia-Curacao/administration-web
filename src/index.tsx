import { ReactElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout';
import Routes from './routes';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderLayout = (): ReactElement => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  if(domain === undefined) throw Error("Auth0 domain is undefined, env: REACT_APP_AUTH0_DOMAIN");
  if(clientId === undefined) throw Error("Auth0 client id is undefined, env: REACT_APP_AUTH0_CLIENT_ID");
  
  return (
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
    redirect_uri: window.location.origin,
    }}
  >
      <Outlet/>
  </Auth0Provider>);
}

const router = createBrowserRouter( createRoutesFromElements(
  <Route element={<Auth0ProviderLayout/>}>
    {Routes()}
  </Route>)
);

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <Layout>
        <RouterProvider router={router}/>
      </Layout>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
