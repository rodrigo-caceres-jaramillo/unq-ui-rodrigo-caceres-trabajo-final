import './App.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello wdsaorld!</div>,
    },
    {
      path: "/game",
      element: <div>Game</div>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
