import { Button } from '@heroui/button'
import WhiteRoundedClose from '../../assets/white-rounded-close.svg';
import ComputerIcon from '../../assets/computer.svg';
import ipadIcon from '../../assets/ipad.svg';
import React from 'react'

const Sessions = () => {
  const sessions = [
    {
      deviceName: 'MacBook',
      lastAcive: '1 month ago',
      location: '7428 Maple Ridge Lane, Austin, TX 78744',
      startingTime: 'Current Session',
      icon: ComputerIcon
    },
    {
      deviceName: 'ipad',
      lastAcive: '20 hours ago',
      location: '1532 Ocean View Drive, San Diego, CA 92109',
      startingTime: 'Session Started on 22.03.2025',
      icon: ipadIcon
    }
  ]

  return (
    <div className='bg-[#f5f9f9a1] flex flex-col flex-1 p-8'>
      <div className='profile-card p-5 w-full'>
        <div className='flex justify-between items-start'>
          <div>
            <div className='text-[1rem] font-medium'>
              Sessions
            </div>

            <div className='text-[0.875rem] text-[#6E6E70]'>
              Manage your current and past sessions
            </div>
          </div>

          <div className='flex items-center gap-1'>
            <Button
              type="button"
              className="bg-[#9C0C0C] text-white border hover:bg-[#db3636]"
            >
              <img src={WhiteRoundedClose} />
              End All Sessions
            </Button>
          </div>
        </div>

        <div className='border-b border-[#3395B3] mb-5 mt-3' />

        <div className='overflow-auto'>
          <table className="w-full min-w-[20rem] table-auto border-separate border-spacing-y-2">
            <tbody>
              {sessions.map((item) => (
                <tr>
                  <td className="py-2 px-4">
                    <div className='flex flex-row gap-3 items-center'>
                      <div className='w-9 flex justify-center'>
                        <img src={item.icon} />
                      </div>

                      <div className='flex flex-col'>
                        <div className='font-[0.825rem] text-[#22223B] leading-[0.825rem] mb-[2px]'>
                          {item.deviceName}
                        </div>

                        <div className='text-[#6E6E70] font-[0.725rem]'>
                          {item.lastAcive}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-2 px-4">
                    <div className='font-[0.825rem] text-[#22223B]'>
                      {item.location}
                    </div>
                  </td>

                  <td className="py-2 px-4">
                    <div className={`font-[0.825rem] text-[#22223B] ${item.startingTime == 'Current Session' ? '!text-[#309C44]' : ''}`}>
                      {item.startingTime}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Sessions