// import React, { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// import Home from "./pages/Home.jsx";
// import FindTickets from "./pages/FindTickets.jsx";
// import RouteDetail from "./pages/RouteDetail.jsx";
// import Login from "./pages/Login.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "find-tickets", element: <FindTickets /> },
//       { path: "about/:id", element: <RouteDetail /> },
//        {
//      path:"/route/:id",
//      element:<RouteDetail/>
//   }, // 🔹 id bilan
//   {
//     path: "/login",
//     element: <Login />
//   }
//     ],
//   },
 
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./app/store";

// Pages
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FindTickets from "./pages/FindTickets";
import RouteDetail from "./pages/RouteDetail";
import Admin from "./pages/Admin";
import "./index.css";
import TicketsMap from "./Pages/TicketsMap";

// Router yaratish
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "find-tickets", element: <FindTickets /> },
      { path: "about/:id", element: <RouteDetail /> },
      { path: "/map" ,element: <TicketsMap /> }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />
  }
]);

// Render
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
