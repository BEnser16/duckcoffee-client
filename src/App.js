import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import News from "./pages/News";
import Menu from "./pages/Menu";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OrderPage from "./pages/OrderPage";
import AdminControl from "./pages/admin/AdminControl";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AuthService } from "./service/AuthService";
import BookingControl from "./components/adminpage/bookingManage/BookingControl";




const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/admin",
    element: <AdminControl />,
  },
  {
    path: "/admin/booking",
    element: <BookingControl />,
  },
]);

function App() {
  let [currentUser , setCurrentUser] = useState(AuthService.getCurrentUser());

  const useritem = useSelector((state) => state.user);
  console.log("here is useritem: " , useritem);


  return (
    <div className="App">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
