import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Rooms from "../pages/Rooms";

// Placeholder components for pages
const Dashboard = () => <div>Dashboard Page</div>;
const Reservations = () => <div>Reservations Page</div>;
const Guests = () => <div>Guests Page</div>;


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
      {
        path: "guests",
        element: <Guests />,
      },
    ],
  },
]);