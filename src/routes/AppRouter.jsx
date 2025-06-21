import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import AuthLayout from '../components/AuthLayout'
import ChooseStore from '../pages/ChooseStore/ChooseStore'
import Layout from '../components/Layout'
import Signup from '../pages/Auth/Signup'
import ProfileLayout from '../components/ProfileLayout'
import ProfileSettings from '../pages/profileSettings/ProfileSettings'
import Password from '../pages/profileSettings/Password'
import Sessions from '../pages/profileSettings/Sessions'
import Orders from '../pages/Orders/Orders'
import Returns from '../pages/Returns/Returns'
import Shipping from '../pages/Shipping/Shipping'
import Invoices from '../pages/Invoices/Invoices'
import Payments from '../pages/Payments/Payments'
import WorkOrders from '../pages/WorkOrder/WorkOrder'
import Inventory from '../pages/Inventory/Inventory'
import Dashboard from '../pages/Dashboard/Dashboard'

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
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/work-order" element={<WorkOrders />} />

                <Route element={<ProfileLayout />}>
                    <Route path="/profile-settings" element={<ProfileSettings />} />
                    <Route path="/password" element={<Password />} />
                    <Route path="/sessions" element={<Sessions />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter