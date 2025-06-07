import { Input, Select, SelectItem } from '@heroui/react';
import React, { useState } from 'react'
import dropDownIconUrl from '../../assets/drop-down-icon.svg';
import searchIcon from '../../assets/search-icon.svg';
import productImg from '../../assets/img.png';
import deleteIcon from '../../assets/delete.svg';
import { motion } from "framer-motion";
import { GoUpload } from "react-icons/go";
import RoundedTick from '../../assets/rounded-tick.svg';
import RoundedClose from '../../assets/rounded-close.svg';
import TickVerifyProduct from '../../assets/tick-verify-product.svg';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popover, PopoverTrigger, PopoverContent, Button, Listbox, ListboxItem } from '@heroui/react';
import { GoPencil } from "react-icons/go";

const Inventory = () => {
    const inputWrapperStyle = "border border-[#F0F0F0] focus-within:border-blue-500 rounded-md";
    const [searchTerm, setSearchTerm] = useState('');

    // Sample JSON data for returns
    const inventoryData = [
        {
            id: 1,
            product: {
                image: productImg,
                highLightTxt: 'Memories, Moments',
                details: 'Ring, 14K Yellow Gold, 5.4g, Size: 7, Diamond, CTW: 2',
                brand: 'Famous brand',
                sku: '234567984'
            },
            category: "Rings",
            inStock: 5,
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
            product: {
                image: productImg,
                highLightTxt: 'Memories, Moments',
                details: 'Ring, 14K Yellow Gold, 5.4g, Size: 7, Diamond, CTW: 2',
                brand: 'Famous brand',
                sku: '234567984'
            },
            category: "Rings",
            inStock: 2,
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
            product: {
                image: productImg,
                highLightTxt: 'Memories, Moments',
                details: 'Ring, 14K Yellow Gold, 5.4g, Size: 7, Diamond, CTW: 2',
                brand: 'Famous brand',
                sku: '234567984'
            },
            category: "Rings",
            inStock: 1,
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
            product: {
                image: productImg,
                highLightTxt: 'Memories, Moments',
                details: 'Ring, 14K Yellow Gold, 5.4g, Size: 7, Diamond, CTW: 2',
                brand: 'Famous brand',
                sku: '234567984'
            },
            category: "Rings",
            inStock: 3,
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
    /* const filteredReturns = inventoryData.filter(productItem =>
        productItem.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        productItem.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        productItem.store.toLowerCase().includes(searchTerm.toLowerCase())
    ); */

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
                                disableSelectorIconRotation
                            >
                                <SelectItem key="none">None</SelectItem>
                                <SelectItem key="date">Date Requested</SelectItem>
                                <SelectItem key="amount">Total Amount</SelectItem>
                                <SelectItem key="status">Status</SelectItem>
                            </Select>
                        </div>

                        <Input
                            placeholder="Search product"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            startContent={<img src={searchIcon} alt="Search" />}
                            classNames={{
                                inputWrapper: `!rounded-full ${inputWrapperStyle}`,
                            }}
                            variant="bordered"
                        />

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#22223B] rounded-lg px-4 py-[10px] text-white text-[12px] hover:opacity-90"
                        >
                            <div className="flex items-center gap-2 text-nowrap">
                                <GoUpload size={16} />
                                Import Products & Updates
                                {/* <motion.img
                                    src={WhiteRightArrow}
                                    alt="Arrow"
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                /> */}
                            </div>
                        </motion.button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="text-[#22223B] font-medium">
                                <tr className="border-b border-[#F0F0F0]">
                                    <th className="py-2 px-4">
                                        Product
                                    </th>
                                    <th className="py-2 px-4">Category</th>
                                    <th className="py-2 px-4">In Stock</th>
                                    <th className="py-2 px-4">Cost</th>
                                    <th className="py-2 px-4">Last Updated</th>
                                    <th className="py-2 px-4"></th>
                                    {/* <th className="py-2 px-4">Requested Action</th> */}
                                </tr>
                            </thead>

                            <tbody className="text-gray-700">
                                {/* Gap between header and body */}
                                <tr>
                                    <td colSpan="9" className="h-4"></td>
                                </tr>

                                {inventoryData.map((productItem) => (
                                    <tr key={productItem.id} className="even:bg-[#F5F9F9] hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            {productItem?.product ?
                                                <div className='flex gap-2 text-[0.82rem] text-[#6E6E70]'>
                                                    <div>
                                                        <img src={productItem?.product?.image} />
                                                    </div>

                                                    <div>
                                                        <div className='text-[#22223B] font-medium'>
                                                            {productItem?.product?.highLightTxt}
                                                        </div>
                                                        <div>
                                                            {productItem?.product?.details}
                                                        </div>

                                                        <div className='flex gap-5'>
                                                            <div>
                                                                <span className='text-[#22223B] font-medium'>
                                                                    Brand:
                                                                </span>
                                                                &nbsp;{productItem?.product?.brand}
                                                            </div>
                                                            <div>
                                                                <span className='text-[#22223B] font-medium'>
                                                                    SKU:
                                                                </span>
                                                                &nbsp;{productItem?.product?.sku}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> : '-'
                                            }
                                        </td>
                                        <td className="py-3 px-4">
                                            {productItem.category}
                                        </td>
                                        <td className="py-3 px-4">{productItem.inStock}</td>
                                        <td className="py-3 px-4">{formatCurrency(productItem.total)}</td>
                                        <td className="py-3 px-4">
                                            {productItem.paymentDate || '-'}
                                        </td>
                                        <td className="py-3 px-4 text-[#6E6E70]">
                                            <Popover placement="bottom-end">
                                                <PopoverTrigger>
                                                    <Button
                                                        isIconOnly
                                                        variant="light"
                                                        className="!p-0 !bg-transparent hover:!bg-gray-100"
                                                    >
                                                        <BsThreeDotsVertical className="text-black" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-1 min-w-[120px]">
                                                    <Listbox variant="flat" aria-label="Actions">
                                                        <ListboxItem key="edit">
                                                            <div className='flex items-center gap-2'>
                                                                <GoPencil />
                                                                Edit
                                                            </div>
                                                        </ListboxItem>
                                                        <ListboxItem key="delete" className="text-danger">
                                                            <div className='flex items-center gap-2'>
                                                                <img src={deleteIcon} />
                                                                Delete
                                                            </div>
                                                        </ListboxItem>
                                                    </Listbox>
                                                </PopoverContent>
                                            </Popover>
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

export default Inventory;