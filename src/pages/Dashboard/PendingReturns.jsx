import { motion } from "framer-motion";
import WhiteRightArrow from '../../assets/white-right-arrow.svg';
import RoundedTick from '../../assets/rounded-tick.svg';
import RoundedClose from '../../assets/rounded-close.svg';
import DropDown from '../../assets/dropdown.svg';
import { useDashboard } from './DashboardContext';

const PendingReturns = () => {
    const {
        pendingReturns,
        totalPendingReturns,
        pendingReturnsLoading,
        pendingReturnsError,
        pendingReturnsPage,
        pendingReturnsLimit,
        refreshPendingReturns
    } = useDashboard();

    const handlePageChange = (newPage) => {
        refreshPendingReturns(newPage, pendingReturnsLimit);
    };

    const handleLimitChange = (newLimit) => {
        refreshPendingReturns(1, newLimit);
    };

    return (
        <div>
            <div className='flex justify-between'>
                <div className='font-bold text-[1.5rem]'>Pending Returns ({totalPendingReturns})</div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#22223B] rounded-3xl px-3 py-1 text-white text-[12px] hover:opacity-90"
                    onClick={() => refreshPendingReturns(1, pendingReturnsLimit)}
                >
                    <div className="flex items-center gap-2">
                        See All Pending Returns
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
                {pendingReturnsLoading ? (
                    <div className="py-8 text-center">Loading...</div>
                ) : pendingReturnsError ? (
                    <div className="py-8 text-center text-red-500">{pendingReturnsError}</div>
                ) : pendingReturns.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                        <div className="text-lg font-medium mb-2">No Pending Returns</div>
                        <div className="text-sm">There are no pending returns to display at the moment.</div>
                    </div>
                ) : (
                    <>
                        <table className="min-w-full table-auto text-sm text-left text-gray-700">
                            <thead className="text-gray-600 font-medium border-b border-[#F0F0F0] ">
                                <tr>
                                    {["Date", "Order Number", "Product Qty", "Total", "Store", "Tracking", "Status"].map((label) => (
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
                                {pendingReturns.map((order, index) => {
                                    const date = order.created_at ? new Date(order.created_at).toLocaleDateString() : "-";
                                    const orderNumber = order.po_number || "-";
                                    const qty = Array.isArray(order.cart_items)
                                        ? order.cart_items.reduce((sum, item) => sum + (item.ordered_quantity || 0), 0)
                                        : "-";
                                    const total = order.total_amount ? `$${parseFloat(order.total_amount).toLocaleString()}` : "-";
                                    const store = order?.store?.store_name || "-";
                                    const tracking = order?.tracking || "-";
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
                                            <td className="px-4 py-3">{store}</td>
                                            <td className="px-4 py-3">{tracking}</td>
                                            <td className="px-4 py-3">{status}</td>
                                            <td className="px-4 py-3 flex items-center gap-2">
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPendingReturns > pendingReturnsLimit && (
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#F0F0F0]">
                                <div className="text-sm text-gray-600">
                                    Showing {((pendingReturnsPage - 1) * pendingReturnsLimit) + 1} to {Math.min(pendingReturnsPage * pendingReturnsLimit, totalPendingReturns)} of {totalPendingReturns} results
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={pendingReturnsLimit}
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
                                            onClick={() => handlePageChange(pendingReturnsPage - 1)}
                                            disabled={pendingReturnsPage <= 1}
                                            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>
                                        <span className="px-3 py-1 text-sm border border-gray-300 rounded bg-gray-50">
                                            {pendingReturnsPage}
                                        </span>
                                        <button
                                            onClick={() => handlePageChange(pendingReturnsPage + 1)}
                                            disabled={pendingReturnsPage * pendingReturnsLimit >= totalPendingReturns}
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

export default PendingReturns; 