import { createBrowserRouter, RouterProvider} from "react-router-dom";

import { Rules } from './routes/Rules';
import Game from "./routes/Game/Game";
import Index from "./routes/Index/Index";

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
