import './App.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Index } from './routes/Index';
import { Game } from './routes/Game';
import { Rules } from './routes/Rules';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />
    },
    {
      path: "/game",
      element: <Game />
    },
    {
      path: "/rules",
      element: <Rules />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
