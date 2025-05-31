// pages/Orders.jsx
import { Input, Select, SelectItem } from '@heroui/react';
import React, { useState } from 'react';
import dropDownIconUrl from '../../assets/drop-down-icon.svg';
import searchIcon from '../../assets/search-icon.svg';
import { motion } from "framer-motion";
import RoundedTick from '../../assets/rounded-tick.svg';
import RoundedClose from '../../assets/rounded-close.svg';
import TickVerifyProduct from '../../assets/tick-verify-product.svg';
import { useDisclosure } from "@heroui/react";
import OrderModal from './OrderModal';

const Orders = () => {
    const [selectedTab, setSelectedTab] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const inputWrapperStyle = "border border-[#F0F0F0] focus-within:border-blue-500 rounded-md";

    // Sample order data
    const orders = [
        {
            date: '11.04.2025',
            orderNumber: '123–008',
            quantity: 5,
            total: '$6,998.00',
            dueDate: '21.04.2025',
            status: 'New Order'
        },
        {
            date: '10.04.2025',
            orderNumber: '123–005',
            quantity: 9,
            total: '$4,012.00',
            dueDate: '20.04.2025',
            status: 'Verified'
        },
        {
            date: '09.04.2025',
            orderNumber: '123–002',
            quantity: 3,
            total: '$2,450.00',
            dueDate: '19.04.2025',
            status: 'Pending Verification'
        }
    ];

    const filteredOrders = orders.filter(order => {
        if (selectedTab === 'all') return true;
        if (selectedTab === 'new-orders') return order.status === 'New Order';
        if (selectedTab === 'pending-verification') return order.status === 'Pending Verification';
        if (selectedTab === 'pending-shipments') return order.status === 'Pending Shipment';
        if (selectedTab === 'pending-invoice') return order.status === 'Pending Invoicing';
        return true;
    });

    const handleRowClick = (order) => {
        setSelectedOrder(order);
        onOpen();
    };

    const handleActionClick = (e, order) => {
        e.stopPropagation(); // Prevent row click from triggering
        // Handle specific action here
        console.log('Action clicked for order:', order.orderNumber);
    };

    return (
        <div className="p-8 bg-[#F5F9F9] flex flex-1">
            <div className="shadow-[inset_0_0_4px_0_#334A5F1F] border border-[#F0F0F0] bg-[#FBFFFF] rounded-2xl w-full h-fit">
                <div className='py-4 px-6'>
                    {/* Tabs */}
                    <div className="flex gap-6 border-b text-sm font-medium text-gray-600">
                        <div
                            className={`py-[10px] px-5 text-[0.82rem] text-[#6E6E70] cursor-pointer ${selectedTab === 'all' ? 'border-b-2 border-black text-black' : ''}`}
                            onClick={() => setSelectedTab('all')}
                        >
                            All
                        </div>

                        <div
                            className={`py-[10px] px-5 text-[0.82rem] text-[#6E6E70] cursor-pointer relative ${selectedTab === 'new-orders' ? 'border-b-2 border-black text-black' : ''}`}
                            onClick={() => setSelectedTab('new-orders')}
                        >
                            New Orders
                            <div className="absolute bg-[#FF5D5D] w-[6px] h-[6px] rounded-full right-3 top-[10px]"></div>
                        </div>

                        <div
                            className={`py-[10px] px-5 text-[0.82rem] text-[#6E6E70] cursor-pointer relative ${selectedTab === 'pending-verification' ? 'border-b-2 border-black text-black' : ''}`}
                            onClick={() => setSelectedTab('pending-verification')}
                        >
                            Pending Verification
                            <div className="absolute bg-[#FF5D5D] w-[6px] h-[6px] rounded-full right-3 top-[10px]"></div>
                        </div>

                        <div
                            className={`py-[10px] px-5 text-[0.82rem] text-[#6E6E70] cursor-pointer relative ${selectedTab === 'pending-shipments' ? 'border-b-2 border-black text-black' : ''}`}
                            onClick={() => setSelectedTab('pending-shipments')}
                        >
                            Pending Shipments
                            <div className="absolute bg-[#FF5D5D] w-[6px] h-[6px] rounded-full right-3 top-[10px]"></div>
                        </div>

                        <div
                            className={`py-[10px] px-5 text-[0.82rem] text-[#6E6E70] cursor-pointer relative ${selectedTab === 'pending-invoice' ? 'border-b-2 border-black text-black' : ''}`}
                            onClick={() => setSelectedTab('pending-invoice')}
                        >
                            Pending Invoicing
                            <div className="absolute bg-[#FF5D5D] w-[6px] h-[6px] rounded-full right-3 top-[10px]"></div>
                        </div>
                    </div>

                    {/* Search and Sort */}
                    <div className="flex justify-between items-center my-4 gap-3">
                        <div className='w-[13.75rem]'>
                            <Select
                                variant="bordered"
                                selectedKeys={["none"]}
                                classNames={{
                                    trigger: `${inputWrapperStyle} flex-nowrap items-center gap-2 text-[0.82rem]`,
                                }}
                                startContent={<span className="whitespace-nowrap text-[#22223B] text-[0.82rem] font-medium">
                                    Sort by:</span>}
                                selectorIcon={
                                    <img
                                        src={dropDownIconUrl}
                                        alt="dropdown"
                                        className="w-4 h-4 text-gray-500"
                                    />
                                }
                            >
                                <SelectItem key="none">None</SelectItem>
                                <SelectItem key="date">Date</SelectItem>
                                <SelectItem key="total">Total</SelectItem>
                                <SelectItem key="dueDate">Due Date</SelectItem>
                            </Select>
                        </div>

                        <Input
                            placeholder="Search order"
                            type="text"
                            startContent={<img src={searchIcon} alt="Search" />}
                            classNames={{
                                inputWrapper: `!rounded-full ${inputWrapperStyle}`,
                            }}
                            variant="bordered"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="text-[#22223B] font-medium">
                                <tr className="border-b border-[#F0F0F0]">
                                    <th className="py-2 px-4">Date</th>
                                    <th className="py-2 px-4">Order Number</th>
                                    <th className="py-2 px-4">Product Qty</th>
                                    <th className="py-2 px-4">Total</th>
                                    <th className="py-2 px-4">Due Date</th>
                                    <th className="py-2 px-4">Status</th>
                                    <th className="py-2 px-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-700">
                                <tr>
                                    <td colSpan="7" className="h-4"></td>
                                </tr>

                                {filteredOrders.map((order, index) => (
                                    <tr
                                        key={index}
                                        className="even:bg-[#F5F9F9] hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleRowClick(order)}
                                    >
                                        <td className="py-3 px-4">{order.date}</td>
                                        <td className="py-3 px-4">{order.orderNumber}</td>
                                        <td className="py-3 px-4">{order.quantity}</td>
                                        <td className="py-3 px-4">{order.total}</td>
                                        <td className="py-3 px-4">{order.dueDate}</td>
                                        <td className="py-3 px-4">{order.status}</td>
                                        <td className="py-3 px-4 flex justify-center gap-2">
                                            {order.status === 'New Order' ? (
                                                <>
                                                    <motion.div
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="cursor-pointer inline-block hover:bg-green-100 rounded-full"
                                                        onClick={(e) => handleActionClick(e, order)}
                                                    >
                                                        <img src={RoundedTick} alt="Approve" />
                                                    </motion.div>

                                                    <motion.div
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="cursor-pointer inline-block hover:bg-red-100 rounded-full"
                                                        onClick={(e) => handleActionClick(e, order)}
                                                    >
                                                        <img src={RoundedClose} alt="Reject" />
                                                    </motion.div>
                                                </>
                                            ) : (
                                                <motion.button
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="rounded-3xl px-3 py-1 text-[12px] hover:opacity-90 border border-[#22223B]"
                                                    onClick={(e) => handleActionClick(e, order)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <motion.img
                                                            src={TickVerifyProduct}
                                                            alt="Verify"
                                                            initial={{ x: 0 }}
                                                            whileHover={{ x: 5 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                        />
                                                        Verify Products
                                                    </div>
                                                </motion.button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <OrderModal isOpen={isOpen} onClose={onClose} order={selectedOrder} />
        </div>
    );
};

export default Orders;