import { Button } from "@heroui/button";
import { Avatar } from "@heroui/react";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import './App.scss'
import { DashboardProvider } from "./pages/Dashboard/DashboardContext";

export default function App() {
  return (
    <div>
      <Router>
        <DashboardProvider>
          <AppRouter />
        </DashboardProvider>
      </Router>
      <Toaster />
    </div>
  )
}