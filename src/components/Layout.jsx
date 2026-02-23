// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <div className="box1">
        <Header /> 
      </div>

      <div className="box2">
        <Outlet /> 
      </div>
    </>
  );
};

export default Layout;