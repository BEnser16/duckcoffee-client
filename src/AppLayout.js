import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppLayout = () => {
  const useritem = useSelector((state) => state.user);


  return (
    <div>
      <Navbar useritem={useritem} />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default AppLayout;
