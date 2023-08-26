import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter , RouterProvider, createBrowserRouter} from 'react-router-dom'
import Quiz from './Quiz.jsx'
import Home from './Home.jsx'
import Result from './Result.jsx'
import AddQuiz from './Admin/AddQuiz.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: rootLoader,
    children: [
      {
        path: "quiz/:topic",
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
      },
      {
        path:"/addquiz",
        element:<AddQuiz />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
