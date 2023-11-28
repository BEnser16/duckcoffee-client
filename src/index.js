import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import News from './pages/News';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import OrderPage from './pages/OrderPage';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"/news",
    element:<News/>
  },
  {
    path:"/menu",
    element:<Menu/>
  },{
    path:"/booking",
    element:<Booking/>
  },{
    path:"/contact",
    element:<Contact/>
  },{
    path:"/login",
    element:<Login/>
  },{
    path:"/register",
    element:<Register/>
  },{
    path:"/order",
    element:<OrderPage/>
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/>
    <RouterProvider router={router} />
    <Footer/>
  </React.StrictMode>
);

