// components/OrderModal.jsx
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import productImg from '../../../assets/img.png';
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

const products = [
    {
        id: 1,
        brand: "Famous brand",
        name: "Memories, Moments",
        description: "Magic Princess-Cut Diamond Three-Stone Engagement Ring, Size 8, 1 ct tw 10K Yellow Gold",
        sku: "R12454",
        quantity: 2,
        price: 2699.00,
        category: "Rings"
    },
    {
        id: 2,
        brand: "Luxury Watches",
        name: "Eternal Classic",
        description: "Premium Automatic Chronograph Men's Watch with Leather Strap",
        sku: "W98765",
        quantity: 1,
        price: 1899.00,
        category: "Watches"
    },
    {
        id: 3,
        brand: "Pearl Elegance",
        name: "Ocean's Treasure",
        description: "South Sea Pearl Necklace with 18K White Gold Clasp",
        sku: "N54321",
        quantity: 1,
        price: 3499.00,
        category: "Necklaces"
    },
    {
        id: 4,
        brand: "Golden Heritage",
        name: "Timeless Beauty",
        description: "Diamond Stud Earrings, 0.5 ct tw, 14K White Gold",
        sku: "E13579",
        quantity: 1,
        price: 899.00,
        category: "Earrings"
    }
];

const OrderModal = ({ isOpen, onClose, order }) => {
    if (!order) return null;

    // Calculate total quantity and price from the order data
    const totalQuantity = order.cart_items?.reduce((sum, item) => sum + (item.ordered_quantity || 0), 0) || 0;
    const totalPrice = order.total_amount || 0;

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleActionClick = (e, action) => {
        e.preventDefault();
        if (action === 'accept') {
            console.log('Order accepted', order.po_id);
            toast.success(`Order #${order.po_number || 'N/A'} has been accepted successfully!`);
        } else if (action === 'decline') {
            console.log('Order declined', order.po_id);
            toast.error(`Order #${order.po_number || 'N/A'} has been declined.`);
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            placement="center"
            classNames={{
                base: "justify-center",
                wrapper: "items-center",
            }}
            hideCloseButton={true}
        >
            <ModalContent className="max-w-fit mx-auto my-8">
                {(onClose) => (
                    <div>
                        <div className="flex justify-between items-center px-6 py-4 bg-[#FBFFFF] shadow-sm">
                            <div className="text-[1.375rem] text-[#22223B] font-medium">
                                Order #{order.po_number || 'N/A'}
                            </div>

                            <div className="cursor-pointer" onClick={onClose}>
                                <IoMdClose size={24} />
                            </div>
                        </div>

                        <div className="bg-[#F5F9F9] px-5 py-6">
                            <div className="flex gap-14">
                                <div className="text-[1rem] text-[#6E6E70]">
                                    Date:&nbsp;
                                    <span className="font-medium !text-[#22223B]">
                                        {formatDate(order.order_date)}
                                    </span>
                                </div>

                                <div className="text-[1rem] text-[#6E6E70]">
                                    Product Qty:&nbsp;
                                    <span className="font-medium !text-[#22223B]">
                                        {totalQuantity}
                                    </span>
                                </div>

                                <div className="text-[1rem] text-[#6E6E70]">
                                    Total:&nbsp;
                                    <span className="font-medium !text-[#22223B]">
                                        ${Number(totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>

                                <div className="text-[1rem] text-[#6E6E70]">
                                    Status:&nbsp;
                                    <span className="font-medium !text-[#22223B] capitalize">
                                        {order.status || 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <div className="border-b border-[#3395B3] my-5" />

                            <div className="text-[#22223B] font-medium mb-4">
                                Products ({totalQuantity})
                            </div>

                            {/* Product cards */}
                            <div className="flex flex-col gap-2 h-[48vh] overflow-y-auto">
                                {order.cart_items?.map((item) => {
                                    const product = item.product;
                                    const mainImage = product?.product_images?.[0]?.media_url;

                                    return (
                                        <div key={item.po_detail_id} className="relative shadow-[inset_0_0_4px_0_rgba(51,74,95,0.12)] rounded-lg bg-[#FBFFFF] p-3 flex justify-between items-center gap-3">
                                            <div className="flex justify-between items-center gap-3">
                                                <div>
                                                    {mainImage && (
                                                        <img
                                                            src={mainImage}
                                                            className="w-[6.125rem] h-[6.125rem] object-contain"
                                                            alt={product?.product_name}
                                                        />
                                                    )}
                                                </div>

                                                <div className="text-[0.825rem]">
                                                    <div>
                                                        {product?.brand?.brand_name || 'No Brand'}
                                                    </div>

                                                    <div className="mt-1 font-medium">
                                                        {product?.product_name || 'No Name'}
                                                    </div>

                                                    <div className="max-w-[40vw]">
                                                        {product?.description || 'No Description'}
                                                    </div>

                                                    <div>
                                                        <span className="font-medium">SKU:&nbsp;</span>
                                                        {item.stock_number || 'N/A'}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center gap-3">
                                                <div className="flex flex-col items-center gap-2 mx-8">
                                                    <div className="text-[#6E6E70]">
                                                        Qty
                                                    </div>

                                                    <div className="text-[#22223B]">
                                                        {item.ordered_quantity || 0}
                                                    </div>
                                                </div>

                                                <div className="text-[#22223B] text-[1.375rem]">
                                                    ${Number(item.unit_cost || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </div>

                                                <div className="absolute text-[0.75rem] text-[#22223B] px-[0.725rem] py-[0.2rem] rounded-xl bg-[#F2F6F6] top-[0.75rem] right-[1.25rem]">
                                                    {product?.category?.category_name || 'No Category'}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Buttons */}
                            <div className="py-4 flex justify-between">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="rounded-xl px-8 py-2 hover:opacity-90 border border-[#22223B] font-medium"
                                    onClick={(e) => handleActionClick(e, 'close')}
                                >
                                    Close
                                </motion.button>

                                <div className="flex gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="rounded-xl px-8 py-2 hover:opacity-90 border border-[#9C0C0C] font-medium text-[#9C0C0C]"
                                        onClick={(e) => handleActionClick(e, 'decline')}
                                    >
                                        Decline
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="rounded-xl px-8 py-2 hover:opacity-90 bg-[#22223B] font-medium text-white"
                                        onClick={(e) => handleActionClick(e, 'accept')}
                                    >
                                        Accept
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
};

export default OrderModal;