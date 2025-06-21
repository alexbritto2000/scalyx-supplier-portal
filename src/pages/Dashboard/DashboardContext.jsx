// contexts/DashboardContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getRequest } from '../../api/api';
import { order } from '../../api/apiEndpoints';


const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    // New Orders state
    const [newOrders, setNewOrders] = useState([]);
    const [totalNewOrders, setTotalNewOrders] = useState(0);
    const [newOrdersLoading, setNewOrdersLoading] = useState(true);
    const [newOrdersError, setNewOrdersError] = useState(null);
    const [newOrdersPage, setNewOrdersPage] = useState(1);
    const [newOrdersLimit, setNewOrdersLimit] = useState(5);

    // Pending Verification state
    const [pendingVerification, setPendingVerification] = useState([]);
    const [totalPendingVerification, setTotalPendingVerification] = useState(0);
    const [pendingVerificationLoading, setPendingVerificationLoading] = useState(true);
    const [pendingVerificationError, setPendingVerificationError] = useState(null);
    const [pendingVerificationPage, setPendingVerificationPage] = useState(1);
    const [pendingVerificationLimit, setPendingVerificationLimit] = useState(5);

    // Pending Shipment state
    const [pendingShipments, setPendingShipments] = useState([]);
    const [totalPendingShipments, setTotalPendingShipments] = useState(0);
    const [pendingShipmentsLoading, setPendingShipmentsLoading] = useState(true);
    const [pendingShipmentsError, setPendingShipmentsError] = useState(null);
    const [pendingShipmentsPage, setPendingShipmentsPage] = useState(1);
    const [pendingShipmentsLimit, setPendingShipmentsLimit] = useState(5);

    // Shipments state
    const [shipments, setShipments] = useState([]);
    const [totalShipments, setTotalShipments] = useState(0);
    const [shipmentsLoading, setShipmentsLoading] = useState(true);
    const [shipmentsError, setShipmentsError] = useState(null);
    const [shipmentsPage, setShipmentsPage] = useState(1);
    const [shipmentsLimit, setShipmentsLimit] = useState(5);

    // Pending Returns state
    const [pendingReturns, setPendingReturns] = useState([]);
    const [totalPendingReturns, setTotalPendingReturns] = useState(0);
    const [pendingReturnsLoading, setPendingReturnsLoading] = useState(true);
    const [pendingReturnsError, setPendingReturnsError] = useState(null);
    const [pendingReturnsPage, setPendingReturnsPage] = useState(1);
    const [pendingReturnsLimit, setPendingReturnsLimit] = useState(5);

    // Pending Invoicing state
    const [pendingInvoicing, setPendingInvoicing] = useState([]);
    const [totalPendingInvoicing, setTotalPendingInvoicing] = useState(0);
    const [pendingInvoicingLoading, setPendingInvoicingLoading] = useState(true);
    const [pendingInvoicingError, setPendingInvoicingError] = useState(null);
    const [pendingInvoicingPage, setPendingInvoicingPage] = useState(1);
    const [pendingInvoicingLimit, setPendingInvoicingLimit] = useState(5);

    const fetchNewOrders = async (page = 1, limit = 5) => {
        setNewOrdersLoading(true);
        setNewOrdersError(null);
        try {
            const res = await getRequest(order.purchaseOrder, {
                page,
                limit,
                status: "submitted"
            });
            const data = res.data || res.results || res;
            setTotalNewOrders(res.total || 0);
            setNewOrders(Array.isArray(data) ? data : data.data || []);
            setNewOrdersPage(page);
            setNewOrdersLimit(limit);
        } catch (err) {
            setNewOrdersError("Failed to load new orders");
            console.error("Error fetching new orders:", err);
        } finally {
            setNewOrdersLoading(false);
        }
    };

    const fetchPendingVerification = async (page = 1, limit = 5) => {
        setPendingVerificationLoading(true);
        setPendingVerificationError(null);
        try {
            const res = await getRequest(order.purchaseOrder, {
                page,
                limit,
                status: "pending_verification"
            });
            const data = res.data || res.results || res;
            setTotalPendingVerification(res.total || 0);
            setPendingVerification(Array.isArray(data) ? data : data.data || []);
            setPendingVerificationPage(page);
            setPendingVerificationLimit(limit);
        } catch (err) {
            setPendingVerificationError("Failed to load pending verification");
            console.error("Error fetching pending verification:", err);
        } finally {
            setPendingVerificationLoading(false);
        }
    };

    const fetchPendingShipments = async (page = 1, limit = 5) => {
        setPendingShipmentsLoading(true);
        setPendingShipmentsError(null);
        try {
            const res = await getRequest(order.purchaseOrder, {
                page,
                limit,
                status: "pending_shipment"
            });
            const data = res.data || res.results || res;
            setTotalPendingShipments(res.total || 0);
            setPendingShipments(Array.isArray(data) ? data : data.data || []);
            setPendingShipmentsPage(page);
            setPendingShipmentsLimit(limit);
        } catch (err) {
            setPendingShipmentsError("Failed to load pending shipments");
            console.error("Error fetching pending shipments:", err);
        } finally {
            setPendingShipmentsLoading(false);
        }
    };

    const fetchShipments = async (page = 1, limit = 5) => {
        setShipmentsLoading(true);
        setShipmentsError(null);
        try {
            const res = await getRequest(order.purchaseOrder, {
                page,
                limit,
                status: "shipped"
            });
            const data = res.data || res.results || res;
            setTotalShipments(res.total || 0);
            setShipments(Array.isArray(data) ? data : data.data || []);
            setShipmentsPage(page);
            setShipmentsLimit(limit);
        } catch (err) {
            setShipmentsError("Failed to load shipments");
            console.error("Error fetching shipments:", err);
        } finally {
            setShipmentsLoading(false);
        }
    };

    const fetchPendingReturns = async (page = 1, limit = 5) => {
        setPendingReturnsLoading(true);
        setPendingReturnsError(null);
        try {
            const res = await getRequest(order.purchaseOrder, {
                page,
                limit,
                status: "returned"
            });
            const data = res.data || res.results || res;
            setTotalPendingReturns(res.total || 0);
            setPendingReturns(Array.isArray(data) ? data : data.data || []);
            setPendingReturnsPage(page);
            setPendingReturnsLimit(limit);
        } catch (err) {
            setPendingReturnsError("Failed to load pending returns");
            console.error("Error fetching pending returns:", err);
        } finally {
            setPendingReturnsLoading(false);
        }
    };

    const fetchPendingInvoicing = async (page = 1, limit = 5) => {
        setPendingInvoicingLoading(true);
        setPendingInvoicingError(null);
        try {
            const res = await getRequest(order.purchaseOrder, {
                page,
                limit,
                status: "submitted"
            });
            const data = res.data || res.results || res;
            setTotalPendingInvoicing(res.total || 0);
            setPendingInvoicing(Array.isArray(data) ? data : data.data || []);
            setPendingInvoicingPage(page);
            setPendingInvoicingLimit(limit);
        } catch (err) {
            setPendingInvoicingError("Failed to load pending invoicing");
            console.error("Error fetching pending invoicing:", err);
        } finally {
            setPendingInvoicingLoading(false);
        }
    };

    useEffect(() => {
        fetchNewOrders();
        fetchPendingVerification();
        fetchPendingShipments();
        fetchShipments();
        fetchPendingReturns();
        fetchPendingInvoicing();
    }, []);

    return (
        <DashboardContext.Provider value={{
            // New Orders
            newOrders,
            totalNewOrders,
            newOrdersLoading,
            newOrdersError,
            newOrdersPage,
            newOrdersLimit,
            refreshNewOrders: fetchNewOrders,
            
            // Pending Verification
            pendingVerification,
            totalPendingVerification,
            pendingVerificationLoading,
            pendingVerificationError,
            pendingVerificationPage,
            pendingVerificationLimit,
            refreshPendingVerification: fetchPendingVerification,
            
            // Pending Shipments
            pendingShipments,
            totalPendingShipments,
            pendingShipmentsLoading,
            pendingShipmentsError,
            pendingShipmentsPage,
            pendingShipmentsLimit,
            refreshPendingShipments: fetchPendingShipments,
            
            // Shipments
            shipments,
            totalShipments,
            shipmentsLoading,
            shipmentsError,
            shipmentsPage,
            shipmentsLimit,
            refreshShipments: fetchShipments,
            
            // Pending Returns
            pendingReturns,
            totalPendingReturns,
            pendingReturnsLoading,
            pendingReturnsError,
            pendingReturnsPage,
            pendingReturnsLimit,
            refreshPendingReturns: fetchPendingReturns,
            
            // Pending Invoicing
            pendingInvoicing,
            totalPendingInvoicing,
            pendingInvoicingLoading,
            pendingInvoicingError,
            pendingInvoicingPage,
            pendingInvoicingLimit,
            refreshPendingInvoicing: fetchPendingInvoicing,
            
            // Legacy support
            loading: newOrdersLoading,
            error: newOrdersError,
            refreshOrders: fetchNewOrders
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};