import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RouteDetail from './Pages/RouteDetail.jsx';

import Home from "./pages/Home.jsx";
import FindTickets from "./pages/FindTickets.jsx";
import RouteDetail from "./pages/RouteDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "find-tickets", element: <FindTickets /> },
      { path: "about/:id", element: <RouteDetail /> }, // 🔹 id bilan
    ],
  },
  {
     path:"/route/:id",
     element:<RouteDetail/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
