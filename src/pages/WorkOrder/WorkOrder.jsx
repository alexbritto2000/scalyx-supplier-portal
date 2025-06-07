import { Input, Select, SelectItem } from '@heroui/react';
import React, { useState } from 'react'
import dropDownIconUrl from '../../assets/drop-down-icon.svg';
import searchIcon from '../../assets/search-icon.svg';
import { motion } from "framer-motion";
import RoundedTick from '../../assets/rounded-tick.svg';
import RoundedClose from '../../assets/rounded-close.svg';
import TickVerifyProduct from '../../assets/tick-verify-product.svg';
import { IoIosArrowDown } from "react-icons/io";

const WorkOrders = () => {
    const inputWrapperStyle = "border border-[#F0F0F0] focus-within:border-blue-500 rounded-md";
    const [searchTerm, setSearchTerm] = useState('');

    // Sample JSON data for work orders
    const workOrdersData = [
        {
            id: 1,
            woNumber: "2374-4863",
            createdDate: "05.04.2025",
            store: "Fareview",
            item: "Diamond Ring",
            workType: "Casting, Polishing",
            cost: 6998.00,
            dueDate: "12.04.2025",
            status: "Pending",
        },
        {
            id: 2,
            woNumber: "2374-4864",
            createdDate: "05.04.2025",
            store: "Midtown",
            item: "Gold Bracelet",
            workType: "Resizing, Engraving",
            cost: 4500.00,
            dueDate: "10.04.2025",
            status: "In Progress",
        },
        {
            id: 3,
            woNumber: "2374-4865",
            createdDate: "04.04.2025",
            store: "Downtown",
            item: "Silver Necklace",
            workType: "Repair, Polishing",
            cost: 3200.50,
            dueDate: "08.04.2025",
            status: "Completed",
        },
        {
            id: 4,
            woNumber: "2374-4866",
            createdDate: "03.04.2025",
            store: "Uptown",
            item: "Platinum Earrings",
            workType: "Custom Design",
            cost: 8500.75,
            dueDate: "15.04.2025",
            status: "Pending",
        },
        {
            id: 5,
            woNumber: "2374-4867",
            createdDate: "02.04.2025",
            store: "Fareview",
            item: "Pearl Pendant",
            workType: "Restringing, Cleaning",
            cost: 2800.00,
            dueDate: "07.04.2025",
            status: "Completed",
        }
    ];

    // Filter work orders based on search term
    const filteredWorkOrders = workOrdersData.filter(workOrder =>
        workOrder.woNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workOrder.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workOrder.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workOrder.workType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workOrder.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusColors = {
            'Pending': 'bg-[#FFF8E6] text-[#FFA500]',
            'In Progress': 'bg-[#E6F7FF] text-[#1890FF]',
            'Completed': 'bg-[#E6F7E6] text-[#52C41A]'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
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
                                disableSelectorIconRotation
                            >
                                <SelectItem key="none">None</SelectItem>
                                <SelectItem key="date">Date Created</SelectItem>
                                <SelectItem key="cost">Total Cost</SelectItem>
                                <SelectItem key="status">Status</SelectItem>
                            </Select>
                        </div>

                        <Input
                            placeholder="Search work orders"
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
                                    <th className="py-2 px-4">WO number</th>
                                    <th className="py-2 px-4">Creation date</th>
                                    <th className="py-2 px-4">Store</th>
                                    <th className="py-2 px-4">Item</th>
                                    <th className="py-2 px-4">Work Type</th>
                                    <th className="py-2 px-4">Cost</th>
                                    <th className="py-2 px-4">Due Date</th>
                                    <th className="py-2 px-4">Status</th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-700">
                                {/* Gap between header and body */}
                                <tr>
                                    <td colSpan="8" className="h-4"></td>
                                </tr>

                                {filteredWorkOrders.map((workOrder) => (
                                    <tr key={workOrder.id} className="even:bg-[#F5F9F9] hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium">{workOrder.woNumber}</td>
                                        <td className="py-3 px-4">{workOrder.createdDate}</td>
                                        <td className="py-3 px-4">{workOrder.store}</td>
                                        <td className="py-3 px-4">{workOrder.item}</td>
                                        <td className="py-3 px-4">{workOrder.workType}</td>
                                        <td className="py-3 px-4">{formatCurrency(workOrder.cost)}</td>
                                        <td className="py-3 px-4">{workOrder.dueDate}</td>
                                        <td className="py-3 px-4 table-selection">
                                            <Select
                                                variant="borderless"
                                                selectedKeys={[workOrder.status.toLowerCase().replace(' ', '-')]}
                                                className="w-28"
                                                classNames={{
                                                    trigger: "px-0 py-0 h-auto ",
                                                    value: "text-[#6E6E70] text-sm",
                                                    selectorIcon: "text-[#6E6E70]",
                                                    mainWrapper: "outline-none",
                                                    listboxWrapper: "outline-none",
                                                }}
                                                selectorIcon={
                                                    <IoIosArrowDown />
                                                }
                                            >
                                                <SelectItem key="pending" className="text-[#6E6E70]">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem key="in-progress" className="text-[#6E6E70]">
                                                    In Progress
                                                </SelectItem>
                                                <SelectItem key="completed" className="text-[#6E6E70]">
                                                    Completed
                                                </SelectItem>
                                            </Select>
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

export default WorkOrders;