import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter , RouterProvider, createBrowserRouter} from 'react-router-dom'
import Quiz from './Quiz.jsx'
import Home from './Home.jsx'
import Result from './Result.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: rootLoader,
    children: [
      {
        path: "quiz",
        element: <Quiz />,
        // loader: teamLoader,
      },
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/result",
        element:<Result />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
