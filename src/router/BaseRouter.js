import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import About from "../pages/About";
import News from "../pages/News";
import Menu from "../pages/Menu";
import Booking from "../pages/Booking";
import Contact from "../pages/Contact";
import OrderPage from "../pages/OrderPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminLogin from "../pages/admin/AdminLogin";
import AppLayout from "../AppLayout";
import IntroSystem from "../pages/IntroSystem";
import AdminPage from "../pages/AdminPage";
import OrderControl from "../components/adminpage/orderManage/OrderControl";
import MenuControl from "../components/adminpage/MenuControl";
import PostControl from "../components/adminpage/PostControl";
import TableControl from "../components/adminpage/TableControl";
import BookingControl from "../components/adminpage/bookingManage/BookingControl";
import AdminDashboard from "../components/adminpage/AdminDashboard";


export const baseRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
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
            path: "/intro-system",
            element: <IntroSystem />,
          }
      ],
    },
    
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
      path:"/admin/",
      element: <AdminPage />,
      children: [
        {
          path: "",
          element: <AdminDashboard />,
        },
        {
          path: "order-control",
          element: <OrderControl />,
        },
        {
          path: "menu-control",
          element: <MenuControl />,
        },
        {
          path: "post-control",
          element: <PostControl />,
        },
        {
          path: "table-control",
          element: <TableControl />,
        },
        {
          path: "booking-control",
          element: <BookingControl />,
        },
        {
          path: "role-control",
          element: <OrderControl />,
        },
      ]

    }
    
]);