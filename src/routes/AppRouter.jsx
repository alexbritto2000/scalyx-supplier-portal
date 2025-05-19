import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import AuthLayout from '../components/AuthLayout'
import ChooseStore from '../pages/ChooseStore/ChooseStore'
import Layout from '../components/Layout'
import Dashboard from '../pages/Dashboard/dashboard'
import Signup from '../pages/Auth/Signup'

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Signup />} />
            </Route>

            <Route path="/choose-store" element={<ChooseStore />} />

            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    )
}

export default AppRouter