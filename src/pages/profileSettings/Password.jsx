import React from 'react'
import refreshIcon from '../../assets/refresh.svg';
import googleLogo from '../../assets/google-logo.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { requiredNumber, requiredString } from '../../utils/validationSchemas';
import { Button, Input } from '@heroui/react';

const Password = () => {
  const inputWrapperStyle = "border border-[#F0F0F0] focus-within:border-blue-500 rounded-md";

  const validationSchema = Yup.object().shape({
    currentPassword: requiredString('Current Password'),
    newPassword: requiredString('New Password'),
    repeatPassword: requiredString('Repeat Password')
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log('Form submitted:', values);
      // Handle form submission here
    },
  });

  const handleSubmit = (e) => {
    formik.handleSubmit();
  }

  return (
    <div className='bg-[#f5f9f9a1] flex flex-col flex-1 p-8'>
      <div className='profile-card pt-5 !pb-0 w-full'>
        <div className='flex justify-between items-start px-5'>
          <div>
            <div className='text-[1rem] font-medium'>
              Change Password
            </div>

            <div className='text-[0.875rem] text-[#6E6E70]'>
              Change or reset the password
            </div>
          </div>

          <div className='flex items-center gap-1'>
            <img src={refreshIcon} />
            <div className='text-[0.875rem]'>
              Reset password
            </div>
          </div>
        </div>

        <div className='border-b border-[#3395B3] mb-5 mt-3 px-5' />

        <div className='flex flex-row gap-5 px-5'>
          <div className='w-full'>
            <div className='text-[1rem] font-medium pb-1'>
              Current Password
            </div>

            <Input
              name="currentPassword"
              placeholder="Enter Current Password"
              type="text"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
              errorMessage={formik.touched.currentPassword && formik.errors.currentPassword}
              classNames={{
                inputWrapper: inputWrapperStyle,
              }}
              variant="bordered"
            />
          </div>

          <div className='w-full'>
            <div className='text-[1rem] font-medium pb-1'>
              New Password
            </div>

            <Input
              name="newPassword"
              placeholder="Enter New Password"
              type="text"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              errorMessage={formik.touched.newPassword && formik.errors.newPassword}
              classNames={{
                inputWrapper: inputWrapperStyle,
              }}
              variant="bordered"
            />
          </div>

          <div className='w-full'>
            <div className='text-[1rem] font-medium pb-1'>
              Repeat Password
            </div>

            <Input
              name="repeatPassword"
              placeholder="Enter Repear Password"
              type="text"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
              errorMessage={formik.touched.repeatPassword && formik.errors.repeatPassword}
              classNames={{
                inputWrapper: inputWrapperStyle,
              }}
              variant="bordered"
            />
          </div>
        </div>

        <div className='mt-6 px-5 mb-6'>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#22223B] text-white hover:bg-[#333354]"
          >
            Change Password
          </Button>
        </div>

        <div className='flex flex-row gap-3 text-[1rem] text-[#22223B] font-medium bg-[#F2F6F6] px-5 py-3 rounded-b-[1.25rem]'>
          <img src={googleLogo} />
          You’re logged in to Scalyx via Google 
        </div>
      </div>

      <div className='profile-card p-5 w-full mt-6'>
        <div className='text-[1rem] font-medium'>
          Geo-Fencing
        </div>

        <div className='text-[0.825rem] text-[#6E6E70] mt-1'>
          Secure your account by permitting access only from the countries you want
        </div>

        <div className='border-b border-[#3395B3] mb-5 mt-3 px-5' />

        <div className='text-[1rem] text-[#22223B]'>
          United States, Vietnam
        </div>

        <div className='mt-6'>
          <Button
            type="button"
            className="bg-white text-[#22223B] border border-[#22223B] hover:bg-[#8080801a]"
          >
            Manage Countries
          </Button>
        </div>
      </div>

      <div className='profile-card p-5 w-full mt-6'>
        <div className='text-[1rem] font-medium'>
          Allowed IP Address
        </div>

        <div className='text-[0.825rem] text-[#6E6E70] mt-1'>
          Protect your account by defining trusted IP address ranges
        </div>

        <div className='border-b border-[#3395B3] mb-5 mt-3 px-5' />

        <div className='text-[1rem] text-[#22223B]'>
          192.168.1.1
        </div>

        <div className='mt-6'>
          <Button
            type="button"
            className="bg-white text-[#22223B] border border-[#22223B] hover:bg-[#8080801a]"
          >
            Manage IP Addresses
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Password