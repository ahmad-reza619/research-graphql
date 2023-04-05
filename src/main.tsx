import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import NewContact from './pages/NewContact'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
{
    path: "/",
    element: <App />,
},
{
    path: "/new",
    element: <NewContact />,
},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)