import React from 'react'
import scalyxLogo from '../../assets/scalyx-logo.svg';
import store2 from '../../assets/store-2.svg';
import store1 from '../../assets/store-1.svg';
import store3 from '../../assets/store-3.svg';

const ChooseStore = () => {
    const storeDetails = [
        { storeName: 'Johnny Dang & Co', logo: store2, description: '9101 Pine Street, Houston, TX 77001' },
        { storeName: 'Flawless Dang & Co', logo: store1, description: '5678 Maple Lane, Dallas, TX 75201' },
        { storeName: 'Fareview Store', logo: store3, description: '1234 Oakwood Drive, Austin, TX 78701' }
    ]

    return (
        <main className='p-8'>
            <section className='flex items-center border-b border-[#22223B] pb-8'>
                <img src={scalyxLogo} />
            </section>

            <section className='py-8'>
                <div className='text-[2rem] font-bold pb-6'>
                    Choose the Store
                </div>

                <div className='flex flex-row gap-6'>
                    {storeDetails.length && storeDetails.map((item) => (
                        <div className='p-[1.5rem] shadow-[inset_0px_0px_4px_0px_#334A5F1F] border border-[#F0F0F0] rounded-[1rem] w-[16rem]'>
                            <div className='pb-[1.25rem] flex justify-center min-h-[15rem]'>
                                <img src={item.logo} />
                            </div>

                            <div className='text-center'>
                                {item.storeName}
                            </div>

                            <div className='text-center pt-[0.55rem] text-[#6E6E70] text-[0.875rem]'>
                                {item.description}
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </main>
    )
}

export default ChooseStore