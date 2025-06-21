// NewOrders.js
import { motion } from "framer-motion";
import WhiteRightArrow from '../../assets/white-right-arrow.svg';
import RoundedTick from '../../assets/rounded-tick.svg';
import RoundedClose from '../../assets/rounded-close.svg';
import DropDown from '../../assets/dropdown.svg';
import { useDashboard } from './DashboardContext';
import { putRequest } from "../../api/api";
import { order } from "../../api/apiEndpoints";
import { useNavigate } from "react-router-dom";

const NewOrders = () => {
    const navigate = useNavigate();
    const {
        newOrders,
        totalNewOrders,
        newOrdersLoading,
        newOrdersError,
        newOrdersPage,
        newOrdersLimit,
        refreshNewOrders,
        refreshPendingVerification
    } = useDashboard();

    const handlePageChange = (newPage) => {
        refreshNewOrders(newPage, newOrdersLimit);
    };

    const handleLimitChange = (newLimit) => {
        refreshNewOrders(1, newLimit);
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const res = await putRequest(order.purchaseOrder + '/' + orderId, {
                status: status
            });
            console.log(res);
            refreshNewOrders(1, 5);
            if (status == 'pending_verification') {
                refreshPendingVerification(1, 5);
            }
        } catch (err) {
            console.error("Error fetching new orders:", err);
        }
    }

    return (
        <div>
            <div className='flex justify-between'>
                <div className='font-bold text-[1.5rem]'>New Orders ({totalNewOrders})</div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#22223B] rounded-3xl px-3 py-1 text-white text-[12px] hover:opacity-90"
                    onClick={() => navigate('/orders', { state: { defaultTab: 'new-orders' } })}
                >
                    <div className="flex items-center gap-2">
                        See All New Orders
                        <motion.img
                            src={WhiteRightArrow}
                            alt="Arrow"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    </div>
                </motion.button>
            </div>

            <div className="overflow-auto rounded-xl border border-[#F0F0F0] bg-white p-4 shadow-[inset_0_0_4px_0_#334A5F1F] mt-[2rem]">
                {newOrdersLoading ? (
                    <div className="py-8 text-center">Loading...</div>
                ) : newOrdersError ? (
                    <div className="py-8 text-center text-red-500">{newOrdersError}</div>
                ) : newOrders.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                        <div className="text-lg font-medium mb-2">No New Orders</div>
                        <div className="text-sm">There are no new orders to display at the moment.</div>
                    </div>
                ) : (
                    <>
                        <table className="min-w-full table-auto text-sm text-left text-gray-700">
                            <thead className="text-gray-600 font-medium border-b border-[#F0F0F0] ">
                                <tr>
                                    {["Date", "Order Number", "Product Qty", "Total", "Due Date", "Status"].map((label) => (
                                        <th key={label} className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span>{label}</span>
                                                <span className="flex flex-col gap-1">
                                                    <img src={DropDown} className="w-2" alt="Sort asc" />
                                                    <img src={DropDown} className="w-2 rotate-180" alt="Sort desc" />
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tr className="h-2"></tr>
                            <tbody>
                                {newOrders.map((order, index) => {
                                    const date = order.created_at ? new Date(order.created_at).toLocaleDateString() : "-";
                                    const orderNumber = order.po_number || "-";
                                    const qty = Array.isArray(order.cart_items)
                                        ? order.cart_items.reduce((sum, item) => sum + (item.ordered_quantity || 0), 0)
                                        : "-";
                                    const total = order.total_amount ? `$${parseFloat(order.total_amount).toLocaleString()}` : "-";
                                    const dueDate = order.expected_delivery_date ? new Date(order.expected_delivery_date).toLocaleDateString() : "-";
                                    const status = order.status || "-";

                                    return (
                                        <tr
                                            key={order.po_id || index}
                                            className="odd:bg-[#FAFAFA] pt-10"
                                        >
                                            <td className="px-4 py-3">{date}</td>
                                            <td className="px-4 py-3">{orderNumber}</td>
                                            <td className="px-4 py-3">{qty}</td>
                                            <td className="px-4 py-3">{total}</td>
                                            <td className="px-4 py-3">{dueDate}</td>
                                            <td className="px-4 py-3">{status}</td>
                                            <td className="px-4 py-3 flex items-center gap-2">
                                                <motion.div
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="cursor-pointer inline-block hover:bg-green-100 rounded-full"
                                                    onClick={() => updateOrderStatus(order.po_id, 'pending_verification')}
                                                >
                                                    <img src={RoundedTick} alt="Tick Icon" />
                                                </motion.div>
                                                <motion.div
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="cursor-pointer inline-block hover:bg-red-100 rounded-full"
                                                    onClick={() => updateOrderStatus(order.po_id, 'cancelled')}
                                                >
                                                    <img src={RoundedClose} alt="Close Icon" />
                                                </motion.div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalNewOrders > newOrdersLimit && (
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#F0F0F0]">
                                <div className="text-sm text-gray-600">
                                    Showing {((newOrdersPage - 1) * newOrdersLimit) + 1} to {Math.min(newOrdersPage * newOrdersLimit, totalNewOrders)} of {totalNewOrders} results
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={newOrdersLimit}
                                        onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span className="text-sm text-gray-600">per page</span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handlePageChange(newOrdersPage - 1)}
                                            disabled={newOrdersPage <= 1}
                                            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>
                                        <span className="px-3 py-1 text-sm border border-gray-300 rounded bg-gray-50">
                                            {newOrdersPage}
                                        </span>
                                        <button
                                            onClick={() => handlePageChange(newOrdersPage + 1)}
                                            disabled={newOrdersPage * newOrdersLimit >= totalNewOrders}
                                            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default NewOrders;