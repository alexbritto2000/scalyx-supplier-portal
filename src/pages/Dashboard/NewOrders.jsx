import { motion } from "framer-motion";
import WhiteRightArrow from '../../assets/white-right-arrow.svg';
import RoundedTick from '../../assets/rounded-tick.svg';
import RoundedClose from '../../assets/rounded-close.svg';
import DropDown from '../../assets/dropdown.svg';

const NewOrders = () => {
    const orders = [
        {
            date: "11.04.2025",
            orderNumber: "123-008",
            qty: 12,
            total: "$12,102.00",
            dueDate: "21.04.2025",
            status: "New Order",
        },
        {
            date: "11.04.2025",
            orderNumber: "123-007",
            qty: 20,
            total: "$3,568.00",
            dueDate: "21.04.2025",
            status: "New Order",
        },
        {
            date: "11.04.2025",
            orderNumber: "123-006",
            qty: 4,
            total: "$906.00",
            dueDate: "21.04.2025",
            status: "New Order",
        },
    ];

    return (
        <div>
            <div className='flex justify-between'>
                <div className='font-bold text-[1.5rem]'>New Orders (5)</div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#22223B] rounded-3xl px-3 py-1 text-white text-[12px] hover:opacity-90"
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
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                className="odd:bg-[#FAFAFA] pt-10"
                            >
                                <td className="px-4 py-3">{order.date}</td>
                                <td className="px-4 py-3">{order.orderNumber}</td>
                                <td className="px-4 py-3">{order.qty}</td>
                                <td className="px-4 py-3">{order.total}</td>
                                <td className="px-4 py-3">{order.dueDate}</td>
                                <td className="px-4 py-3">{order.status}</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="cursor-pointer inline-block"
                                    >
                                        <img src={RoundedTick} alt="Tick Icon" />
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="cursor-pointer inline-block"
                                    >
                                        <img src={RoundedClose} />
                                    </motion.div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NewOrders