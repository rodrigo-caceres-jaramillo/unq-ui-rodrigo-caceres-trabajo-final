import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Index } from './routes/Index';
import { Rules } from './routes/Rules';
import Game from "./routes/Game/Game";

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
