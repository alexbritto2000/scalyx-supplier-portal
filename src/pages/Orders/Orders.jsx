// pages/Orders.jsx
import { Input, Select, SelectItem } from '@heroui/react';
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import dropDownIconUrl from '../../assets/drop-down-icon.svg';
import PendingShipmentsIcon from '../../assets/pending-shipments.svg';
import searchIcon from '../../assets/search-icon.svg';
import { motion } from "framer-motion";
import RoundedTick from '../../assets/rounded-tick.svg';
import RoundedClose from '../../assets/rounded-close.svg';
import TickVerifyProduct from '../../assets/tick-verify-product.svg';
import InvoiceIcon from '../../assets/invoice-icon.svg';
import AddInvoiceIcon from '../../assets/add-invoice.svg';
import { useDisclosure } from "@heroui/react";
import OrderModal from './Modal/OrderModal';
import { getRequest, putRequest } from '../../api/api';
import { order as orderEndpoints } from '../../api/apiEndpoints';
import { useDebounce } from 'use-debounce';
import toast from 'react-hot-toast';

const Orders = () => {
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(location.state?.defaultTab || 'all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const inputWrapperStyle = "border border-[#F0F0F0] focus-within:border-blue-500 rounded-md";

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalOrders, setTotalOrders] = useState(0);

    // Filters State
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
    const [sortBy, setSortBy] = useState('none');

    const getStatusForTab = (tab) => {
        switch (tab) {
            case 'new-orders': return 'submitted';
            case 'pending-verification': return 'pending_verification';
            case 'pending-shipments': return 'pending_shipment';
            case 'pending-invoice': return 'pending_invoicing';
            case 'shipped': return 'shipped';
            case 'returned': return 'returned';
            default: return undefined;
        }
    };

    const fetchOrdersForTab = useCallback(async (tab, newPage = 1, newLimit = 10, search = '', sort = 'none') => {
        setLoading(true);
        setError(null);
        const status = getStatusForTab(tab);
        const params = {
            page: newPage,
            limit: newLimit,
            ...(status && { status }),
            ...(search && { keyword: search }),
            ...(sort !== 'none' && { sort_by: sort }),
        };
        try {
            const res = await getRequest(orderEndpoints.purchaseOrder, params);
            const data = res.data || res.results || res;
            setOrders(Array.isArray(data) ? data : (data.data || []));
            setTotalOrders(res.total || 0);
            setPage(newPage);
            setLimit(newLimit);
        } catch (err) {
            setError("Failed to load orders");
            console.error(`Error fetching ${tab} orders:`, err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrdersForTab(selectedTab, 1, limit, debouncedSearchTerm, sortBy);
    }, [selectedTab, limit, debouncedSearchTerm, sortBy, fetchOrdersForTab]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= Math.ceil(totalOrders / limit)) {
            fetchOrdersForTab(selectedTab, newPage, limit, debouncedSearchTerm, sortBy);
        }
    };

    const handleLimitChange = (newLimit) => {
        fetchOrdersForTab(selectedTab, 1, newLimit, debouncedSearchTerm, sortBy);
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await putRequest(`${orderEndpoints.purchaseOrder}/${orderId}`, { status });
            
            // Show appropriate toast message based on status change
            const statusMessages = {
                'pending_verification': 'Order moved to pending verification',
                'cancelled': 'Order has been cancelled',
                'pending_shipment': 'Order moved to pending shipment',
                'shipped': 'Order has been shipped',
                'returned': 'Order has been returned'
            };
            
            const message = statusMessages[status] || `Order status updated to ${status}`;
            toast.success(message);
            
            fetchOrdersForTab(selectedTab, page, limit, debouncedSearchTerm, sortBy); // Refresh current tab
        } catch (err) {
            console.error("Error updating order status:", err);
            toast.error('Failed to update order status');
        }
    };

    const handleRowClick = (order) => {
        setSelectedOrder(order);
        onOpen();
    };

    const handleActionClick = (e, orderId, status) => {
        e.stopPropagation();
        updateOrderStatus(orderId, status);
    };

    const renderOrderActions = (order) => {
        switch (order.status) {
            case 'submitted':
                return (
                    <>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer hover:bg-green-100 rounded-full p-1" onClick={(e) => handleActionClick(e, order.po_id, 'pending_verification')}>
                            <img src={RoundedTick} alt="Approve" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer hover:bg-red-100 rounded-full p-1" onClick={(e) => handleActionClick(e, order.po_id, 'cancelled')}>
                            <img src={RoundedClose} alt="Reject" />
                        </motion.div>
                    </>
                );
            case 'pending_verification':
                return (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="rounded-full px-3 py-1 text-xs hover:opacity-90 border border-[#22223B]" onClick={(e) => handleActionClick(e, order.po_id, 'pending_shipment')}>
                        <div className="flex items-center gap-2">
                            <img src={TickVerifyProduct} alt="Verify" className="w-4 h-4" />
                            Verify Products
                        </div>
                    </motion.button>
                );
            case 'pending_invoicing':
                return (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="rounded-full px-3 py-1 text-xs hover:opacity-90 border border-[#22223B]" onClick={(e) => handleActionClick(e, order.po_id, 'shipped')}>
                        <div className="flex items-center gap-2">
                            <img src={AddInvoiceIcon} alt="Add Invoice" className="w-4 h-4" />
                            Add Invoice
                        </div>
                    </motion.button>
                );
            case 'pending_shipment':
                return(
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-3xl px-3 py-1 text-[12px] hover:opacity-90 border border-[#22223B]"
                        onClick={() => updateOrderStatus(order.po_id, 'shipped')}
                    >
                        <div className="flex items-center gap-2">
                            <motion.img
                                src={PendingShipmentsIcon}
                                alt="Arrow"
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                            Add Tracking Number
                        </div>
                    </motion.button>
                )
            default:
                return null;
        }
    };

    const TABS = [
        { key: 'all', label: 'All' },
        { key: 'new-orders', label: 'New Orders' },
        { key: 'pending-verification', label: 'Pending Verification' },
        { key: 'pending-shipments', label: 'Pending Shipments' },
        { key: 'pending-invoice', label: 'Pending Invoicing' },
        { key: 'shipped', label: 'Shipped' },
        { key: 'returned', label: 'Pending Returns' },
    ];

    return (
        <div className="p-8 bg-[#F5F9F9] flex flex-1">
            <div className="shadow-[inset_0_0_4px_0_#334A5F1F] border border-[#F0F0F0] bg-[#FBFFFF] rounded-2xl w-full h-fit">
                <div className='py-4 px-6'>
                    {/* Tabs */}
                    <div className="flex gap-6 border-b text-sm font-medium text-gray-600">
                        {TABS.map(tab => (
                            <div
                                key={tab.key}
                                className={`py-[10px] px-5 text-[0.82rem] text-[#6E6E70] cursor-pointer ${selectedTab === tab.key ? 'border-b-2 border-black text-black' : ''}`}
                                onClick={() => setSelectedTab(tab.key)}
                            >
                                {tab.label}
                            </div>
                        ))}
                    </div>

                    {/* Search and Sort */}
                    <div className="flex justify-between items-center my-4 gap-3">
                        <div className="flex gap-3 items-center">
                            <div className='w-[13.75rem]'>
                                <Select
                                    variant="bordered"
                                    selectedKeys={[sortBy]}
                                    onSelectionChange={(keys) => setSortBy(Array.from(keys)[0])}
                                    disableSelectorIconRotation
                                    classNames={{ trigger: `${inputWrapperStyle} flex-nowrap items-center gap-2 text-[0.82rem]` }}
                                    startContent={<span className="whitespace-nowrap text-[#22223B] text-[0.82rem] font-medium">Sort by:</span>}
                                    selectorIcon={<img src={dropDownIconUrl} alt="dropdown" className="w-4 h-4 text-gray-500" />}
                                >
                                    <SelectItem key="none">None</SelectItem>
                                    <SelectItem key="date">Date</SelectItem>
                                    <SelectItem key="total">Total</SelectItem>
                                    <SelectItem key="dueDate">Due Date</SelectItem>
                                </Select>
                            </div>
                        </div>
                        <Input
                            placeholder="Search order"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            startContent={<img src={searchIcon} alt="Search" />}
                            classNames={{ inputWrapper: `!rounded-full ${inputWrapperStyle}` }}
                            variant="bordered"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="text-[#22223B] font-medium">
                                <tr className="border-b border-[#F0F0F0]">
                                    {["Date", "Order Number", "Product Qty", "Total", "Due Date", "Status", "Actions"].map(label => (
                                        <th key={label} className="py-2 px-4">{label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                <tr className="h-4"></tr>
                                {loading ? (
                                    <tr><td colSpan="7" className="text-center py-8">Loading...</td></tr>
                                ) : error ? (
                                    <tr><td colSpan="7" className="text-center py-8 text-red-500">{error}</td></tr>
                                ) : orders.length === 0 ? (
                                    <tr><td colSpan="7" className="text-center py-12 text-gray-500">No orders found.</td></tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.po_id} className="even:bg-[#F5F9F9] hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(order)}>
                                            <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="py-3 px-4">{order.po_number}</td>
                                            <td className="py-3 px-4">{order.cart_items?.reduce((sum, item) => sum + (item.ordered_quantity || 0), 0) || 0}</td>
                                            <td className="py-3 px-4">{`$${parseFloat(order.total_amount || 0).toLocaleString()}`}</td>
                                            <td className="py-3 px-4">{new Date(order.expected_delivery_date).toLocaleDateString()}</td>
                                            <td className="py-3 px-4">{order.status}</td>
                                            <td className="py-3 px-4 flex justify-center items-center gap-2">{renderOrderActions(order)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                     {/* Pagination */}
                    {totalOrders > limit && (
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#F0F0F0]">
                            <div className="text-sm text-gray-600">
                                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalOrders)} of {totalOrders} results
                            </div>
                            <div className="flex items-center gap-2">
                                <select value={limit} onChange={(e) => handleLimitChange(parseInt(e.target.value))} className="border border-gray-300 rounded px-2 py-1 text-sm">
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                                <span className="text-sm text-gray-600">per page</span>
                                <div className="flex gap-1">
                                    <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1} className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                                        Previous
                                    </button>
                                    <span className="px-3 py-1 text-sm border border-gray-300 rounded bg-gray-50">{page}</span>
                                    <button onClick={() => handlePageChange(page + 1)} disabled={page * limit >= totalOrders} className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <OrderModal isOpen={isOpen} onClose={onClose} order={selectedOrder} />
        </div>
    );
};

export default Orders;