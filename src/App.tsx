import './App.css'
import { GamePage } from './pages/GamePage'
import { createBrowserRouter, RouterProvider } from 'react-router';
import { StartPage } from './pages/StartPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/play",
    element: <GamePage />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
