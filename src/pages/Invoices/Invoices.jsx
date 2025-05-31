import { Input, Select, SelectItem } from '@heroui/react';
import React, { useState } from 'react'
import dropDownIconUrl from '../../assets/drop-down-icon.svg';
import searchIcon from '../../assets/search-icon.svg';
import { motion } from "framer-motion";
import RoundedTick from '../../assets/rounded-tick.svg';
import RoundedClose from '../../assets/rounded-close.svg';
import TickVerifyProduct from '../../assets/tick-verify-product.svg';

const Invoices = () => {
    const inputWrapperStyle = "border border-[#F0F0F0] focus-within:border-blue-500 rounded-md";
    const [searchTerm, setSearchTerm] = useState('');

    // Sample JSON data for returns
    const returnsData = [
        {
            id: 1,
            invoice: "Invoice_14657",
            orderNumber: "123-008",
            productQty: 5,
            total: 6998.00,
            store: "Fareview",
            requestedAction: "Get replacement",
            status: "Payment",
            customerName: "John Doe",
            returnReason: "Damaged product",
            dateRequested: "05.04.2025"
        },
        {
            id: 2,
            invoice: "Invoice_14656",
            orderNumber: "123-009",
            productQty: 2,
            total: 2499.99,
            store: "UrbanStyle",
            paymentDate: "05.05.2025",
            requestedAction: "Refund",
            status: "Payment",
            customerName: "Jane Smith",
            returnReason: "Wrong size",
            dateRequested: "07.04.2025"
        },
        {
            id: 3,
            invoice: "Invoice_146345",
            orderNumber: "123-010",
            productQty: 1,
            total: 1299.50,
            store: "TechHaven",
            paymentDate: "05.04.2025",
            requestedAction: "Exchange",
            status: "Delayed",
            customerName: "Robert Johnson",
            returnReason: "Defective item",
            dateRequested: "09.04.2025"
        },
        {
            id: 4,
            invoice: "Invoice_14625",
            orderNumber: "123-011",
            productQty: 3,
            total: 4599.75,
            store: "HomeEssentials",
            paymentDate: "25.05.2025",
            requestedAction: "Store credit",
            status: "Completed",
            customerName: "Emily Davis",
            returnReason: "Changed mind",
            dateRequested: "10.04.2025"
        }
    ];

    // Filter returns based on search term
    const filteredReturns = returnsData.filter(returnItem =>
        returnItem.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.store.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="p-8 bg-[#F5F9F9] flex flex-1">
            <div className="shadow-[inset_0_0_4px_0_#334A5F1F] border border-[#F0F0F0] bg-[#FBFFFF] rounded-2xl w-full h-fit">
                <div className='py-4 px-6'>
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
                                <SelectItem key="date">Date Requested</SelectItem>
                                <SelectItem key="amount">Total Amount</SelectItem>
                                <SelectItem key="status">Status</SelectItem>
                            </Select>
                        </div>

                        <Input
                            placeholder="Search invoices"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                    <th className="py-2 px-4">Invoice</th>
                                    <th className="py-2 px-4">Order Number</th>
                                    <th className="py-2 px-4">Product Qty</th>
                                    <th className="py-2 px-4">Total</th>
                                    <th className="py-2 px-4">Store</th>
                                    <th className="py-2 px-4">Payment Date</th>
                                    <th className="py-2 px-4">Status</th>
                                    {/* <th className="py-2 px-4">Requested Action</th> */}
                                </tr>
                            </thead>

                            <tbody className="text-gray-700">
                                {/* Gap between header and body */}
                                <tr>
                                    <td colSpan="9" className="h-4"></td>
                                </tr>

                                {filteredReturns.map((returnItem) => (
                                    <tr key={returnItem.id} className="even:bg-[#F5F9F9] hover:bg-gray-50">
                                        <td className="py-3 px-4 underline">{returnItem.invoice}</td>
                                        <td className="py-3 px-4 font-medium">{returnItem.orderNumber}</td>
                                        <td className="py-3 px-4">{returnItem.productQty}</td>
                                        <td className="py-3 px-4">{formatCurrency(returnItem.total)}</td>
                                        <td className="py-3 px-4">{returnItem.store}</td>
                                        <td className="py-3 px-4">
                                            {returnItem.paymentDate || '-'}
                                        </td>
                                        <td className="py-3 px-4 text-[#6E6E70]">
                                            {returnItem.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoices;