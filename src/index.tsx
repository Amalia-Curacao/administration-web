import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout';
import Routes from './routes';
import { CookiesProvider } from 'react-cookie';
import AuthenticationProvider from './authentication/authenticationProvider';

const router = createBrowserRouter( createRoutesFromElements(
      <Route element={<AuthenticationProvider/>}>
      {Routes()}
    </Route>)
);

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <CookiesProvider>
        <Layout>
          <RouterProvider router={router}/>
        </Layout>
      </CookiesProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
