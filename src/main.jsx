import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import routes from './routes.jsx';


const router = createBrowserRouter(routes);


createRoot(document.getElementById('root')).render(
  <MantineProvider cssVariablesSelector='#root'>
    <StrictMode>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </StrictMode>
  </MantineProvider>
)
