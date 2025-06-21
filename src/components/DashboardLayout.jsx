import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardProvider } from '../pages/Dashboard/DashboardContext';

const DashboardLayout = () => {
  return (
    <DashboardProvider>
      <Outlet />
    </DashboardProvider>
  );
};

export default DashboardLayout; 