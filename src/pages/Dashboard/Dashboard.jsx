// Dashboard.js
import React from 'react';
import CardIcon from '../../assets/fareview-jewelry.svg';
import DropDown from '../../assets/dropdown.svg';
import '../pages.scss';
import PendingVerification from './PendingVerification';
import { useNavigate } from 'react-router-dom';
import NewOrders from './NewOrders';
import { useDashboard } from './DashboardContext';
import PendingShipments from './PendingShipments';
import Shipments from './Shipments';
import PendingReturns from './PendingReturns';
import PendingInvoicing from './PendingInvoicing';

const Dashboard = () => {
    const navigate = useNavigate();
    const { totalNewOrders, totalPendingVerification, totalPendingShipments, totalShipments, totalPendingReturns, totalPendingInvoicing } = useDashboard();

    return (
        <div className='px-8 py-8 bg-[#F5F9F9]'>
            <div className='flex justify-center items-center gap-2 border border-[#F0F0F0] rounded-xl px-4 py-[0.5rem] w-fit bg-white cursor-pointer' onClick={() => navigate('/choose-store')}>
                <img src={CardIcon} alt="Store Icon" />

                <div>
                    <div className='text-[#22223B] text-[0.875rem]'>
                        Fareview Store
                    </div>
                    <div className='text-[#6E6E70] text-[0.675rem]'>
                        1234 Oakwood Drive, Austin, TX 78701
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <img
                        src={DropDown}
                        className='w-2'
                        alt="Dropdown Icon"
                    />
                    <img
                        src={DropDown}
                        className='rotate-180 w-2'
                        alt="Dropdown Icon"
                    />
                </div>
            </div>

            {/* cards */}
            <div className='pt-8 gap-[1.25rem] grid grid-cols-4'>
                <div className='bg-[#E2ECD2] rounded-2xl p-4 shadow-[inset_0px_0px_4px_0px_#334A5F1F]'>
                    <div className='font-bold text-[1.125rem]'>
                        New Orders
                    </div>
                    <div className='font-bold text-[2.1rem]'>
                        {totalNewOrders || 0}
                    </div>
                </div>

                <div className='bg-[#D2E9FE] rounded-2xl p-4 shadow-[inset_0px_0px_4px_0px_#334A5F1F]'>
                    <div className='font-bold text-[1.125rem]'>
                        Pending Verification
                    </div>
                    <div className='font-bold text-[2.1rem]'>
                        {totalPendingVerification || 0}
                    </div>
                </div>

                {/* <div className='bg-[#D2E9FE] rounded-2xl p-4 shadow-[inset_0px_0px_4px_0px_#334A5F1F]'>
                    <div className='font-bold text-[1.125rem]'>
                        Pending Invoicing
                    </div>
                    <div className='font-bold text-[2.1rem]'>
                        {totalPendingInvoicing || 0}
                    </div>
                </div> */}

                {/* <div className='bg-[#FEEFD2] rounded-2xl p-4 shadow-[inset_0px_0px_4px_0px_#334A5F1F]'>
                    <div className='font-bold text-[1.125rem]'>
                        Pending Shipments
                    </div>
                    <div className='font-bold text-[2.1rem]'>
                        {totalPendingShipments || 0}
                    </div>
                </div> */}

                <div className='bg-[#D2FEE2] rounded-2xl p-4 shadow-[inset_0px_0px_4px_0px_#334A5F1F]'>
                    <div className='font-bold text-[1.125rem]'>
                        Shipments
                    </div>
                    <div className='font-bold text-[2.1rem]'>
                        {totalShipments || 0}
                    </div>
                </div>

                <div className='bg-white rounded-2xl p-4 shadow-[inset_0px_0px_4px_0px_#334A5F1F]'>
                    <div className='font-bold text-[1.125rem]'>
                        Pending Returns
                    </div>
                    <div className='font-bold text-[2.1rem]'>
                        {totalPendingReturns || 0}
                    </div>
                </div>
            </div>

            <div className='border-b border-gray my-[1.5rem]' />

            <NewOrders />
            <PendingVerification />
            <div className='my-[1.5rem]' />
            <PendingShipments />
            <div className='my-[1.5rem]' />
            <PendingInvoicing />
            <div className='my-[1.5rem]' />
            <Shipments />
            <div className='my-[1.5rem]' />
            <PendingReturns />
        </div>
    );
};

export default Dashboard;