import React, { useState } from 'react'
import '../Pages.scss'
import CameraIcon from '../../assets/camera.svg';
import dropDownIconUrl from '../../assets/drop-down-icon.svg';
import { Input, Button } from '@heroui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { requiredNumber, requiredString } from '../../utils/validationSchemas';
import { Select, SelectItem } from "@heroui/react";
import ToggleSwitch from '../../components/Buttons/ToggleSwitch';

const countries = [
    {
        code: "+91",
        name: "IN",
        language: 'Hindi',
        flag: "https://flagcdn.com/in.svg", // or your own image path
    },
    {
        code: "+1",
        name: "USA",
        language: 'English',
        flag: "https://flagcdn.com/us.svg",
    },
    {
        code: "+44",
        name: "UK",
        language: 'English',
        flag: "https://flagcdn.com/gb.svg",
    },
];

const ProfileSettings = () => {
    const inputWrapperStyle = "border border-[#F0F0F0] focus-within:border-blue-500 rounded-md";

    const validationSchema = Yup.object().shape({
        companyName: requiredString('Company Name'),
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email is required'),
        contactNo: requiredNumber('Contact No'),
        address: requiredNumber('Address'),
        taxId: requiredNumber('Tax ID'),
    });

    const formik = useFormik({
        initialValues: {
            companyName: '',
            email: '',
            contactNo: '',
            countryCode: '',
            phoneNumber: '',
            address: '',
            taxId: ''
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: async (values) => {
            console.log('Form submitted:', values);
            // Handle form submission here
        },
    });

    const [selectedCountry, setSelectedCountry] = useState({
        code: "+91",
        name: "IN",
        flag: "https://flagcdn.com/in.svg", // or your own image path
    });
    const [selectedLanguage, setSelectedLanguage] = useState({
        code: "+91",
        name: "IN",
        language: 'Hindi',
        flag: "https://flagcdn.com/in.svg", // or your own image path
    });

    const handleChange = (e) => {
        const code = e.target.value;
        const country = countries.find(c => c.code === code);
        setSelectedCountry(country);
    };

    const handleChangeLanguage = (e) => {
        const code = e.target.value;
        const country = countries.find(c => c.code === code);
        setSelectedLanguage(country);
    };

    return (
        <div className='bg-[#F5F9F9] flex flex-col flex-1 p-8'>
            <form onSubmit={formik.handleSubmit} className='w-full flex flex-col gap-6'>

                <div className='profile-card p-5 flex w-full'>
                    <div className='w-fit flex flex-col items-center'>
                        <div className='flex justify-center items-center rounded-xl w-36 h-36 text-[5rem] bg-[#D2E9FE]'>
                            A
                        </div>

                        <div className='flex gap-1 mt-4 cursor-pointer'>
                            <img src={CameraIcon} alt="Camera icon" />
                            <div className='text-[0.8rem] font-medium'>
                                Add Logo
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-1'>
                        <div className='w-full pl-8 flex flex-col gap-3'>
                            <div className='w-full'>
                                <div className='text-[1rem] font-medium pb-2'>
                                    Company Name
                                </div>

                                <Input
                                    name="companyName"
                                    placeholder="Enter Company Name"
                                    type="text"
                                    value={formik.values.companyName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                    errorMessage={formik.touched.companyName && formik.errors.companyName}
                                    classNames={{
                                        inputWrapper: inputWrapperStyle,
                                    }}
                                    variant="bordered"
                                />
                            </div>

                            <div className='w-full'>
                                <div className='text-[1rem] font-medium pb-2'>
                                    Email
                                </div>

                                <Input
                                    name="email"
                                    placeholder="Enter Email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                                    errorMessage={formik.touched.email && formik.errors.email}
                                    classNames={{
                                        inputWrapper: inputWrapperStyle,
                                    }}
                                    variant="bordered"
                                />
                            </div>
                        </div>

                        <div className='w-full pl-8 flex flex-col gap-3'>
                            <div className='w-full'>
                                <div className='text-[1rem] font-medium pb-2'>
                                    Contact Name
                                </div>

                                <Input
                                    name="contactNo"
                                    placeholder="Enter Contact No"
                                    type="text"
                                    value={formik.values.contactNo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
                                    errorMessage={formik.touched.contactNo && formik.errors.contactNo}
                                    classNames={{
                                        inputWrapper: inputWrapperStyle,
                                    }}
                                    variant="bordered"
                                />
                            </div>

                            <div className='w-full'>
                                <div className='text-[1rem] font-medium pb-2'>
                                    Phone number
                                </div>

                                <div className='flex flex-row gap-5'>
                                    <div className='w-44'>
                                        <Select
                                            variant="bordered"
                                            placeholder="Select a country"
                                            classNames={{
                                                trigger: inputWrapperStyle,
                                            }}
                                            selectorIcon={
                                                <img src={dropDownIconUrl} alt="dropdown" className="w-4 h-4 text-gray-500" />
                                            }
                                            selectedKeys={selectedCountry ? [selectedCountry.code] : []}
                                            onChange={handleChange}
                                            renderValue={() =>
                                                selectedCountry ? (
                                                    <div className="flex items-center gap-2">
                                                        <span>
                                                            {selectedCountry.name}
                                                        </span>
                                                        <img src={selectedCountry.flag} className="w-6 h-6 rounded-full object-cover" />
                                                    </div>
                                                ) : null
                                            }
                                        >
                                            {countries.map((country) => (
                                                <SelectItem key={country.code} value={country.code}>
                                                    <div className="flex items-center gap-2">
                                                        <span>
                                                            {country.name}
                                                        </span>
                                                        <img src={country.flag} className="w-6 h-6 rounded-full object-cover" />
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    <Input
                                        name="phoneNumber"
                                        placeholder="Enter Contact No"
                                        type="text"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        classNames={{
                                            inputWrapper: inputWrapperStyle,
                                        }}
                                        variant="bordered"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2.Business Details */}
                <div className='profile-card p-5 w-full'>
                    <div className='text-[1rem] font-medium'>
                        Business Details
                    </div>

                    <div className='border-b border-[#3395B3] mb-5 mt-3' />

                    <div className='flex flex-col gap-5'>
                        <div className='w-full'>
                            <div className='text-[1rem] font-medium pb-1'>
                                Address
                            </div>

                            <Input
                                name="address"
                                placeholder="Enter Address"
                                type="text"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.address && Boolean(formik.errors.address)}
                                errorMessage={formik.touched.address && formik.errors.address}
                                classNames={{
                                    inputWrapper: inputWrapperStyle,
                                }}
                                variant="bordered"
                            />
                        </div>

                        <div className='w-full'>
                            <div className='text-[1rem] font-medium pb-1'>
                                Tax ID
                            </div>

                            <Input
                                name="taxId"
                                placeholder="Enter Tax ID"
                                type="text"
                                value={formik.values.taxId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.taxId && Boolean(formik.errors.taxId)}
                                errorMessage={formik.touched.taxId && formik.errors.taxId}
                                classNames={{
                                    inputWrapper: inputWrapperStyle,
                                }}
                                variant="bordered"
                            />
                        </div>

                        <div className='w-full'>
                            <div className='text-[1rem] font-medium pb-1'>
                                Preferred Payment Method
                            </div>

                            <Select
                                placeholder="Select Preferred Payment Method"
                                variant="bordered"
                                classNames={{
                                    trigger: inputWrapperStyle,
                                }}
                                selectorIcon={
                                    <img src={dropDownIconUrl} alt="dropdown" className="w-4 h-4 text-gray-500" />
                                }
                            >
                                <SelectItem>
                                    Bank Transfer
                                </SelectItem>
                            </Select>
                        </div>

                        <div className='w-full'>
                            <div className='text-[1rem] font-medium pb-1'>
                                Preferred Carrier
                            </div>

                            <Select
                                placeholder="Select Preferred Carrier"
                                variant="bordered"
                                classNames={{
                                    trigger: inputWrapperStyle,
                                }}
                                selectorIcon={
                                    <img src={dropDownIconUrl} alt="dropdown" className="w-4 h-4 text-gray-500" />
                                }
                            >
                                <SelectItem>
                                    FedEx
                                </SelectItem>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* 3.Return Policy */}
                <div className='profile-card p-5 w-full'>
                    <div className='text-[1rem] font-medium'>
                        Return Policy
                    </div>

                    <div className='border-b border-[#3395B3] mb-5 mt-3' />

                    <div className='flex flex-col gap-5'>
                        <div className='w-full'>
                            <div className='text-[1rem] font-medium pb-1'>
                                Return Window
                            </div>

                            <Select
                                placeholder="Select Return Window"
                                variant="bordered"
                                classNames={{
                                    trigger: inputWrapperStyle,
                                }}
                                selectorIcon={
                                    <img src={dropDownIconUrl} alt="dropdown" className="w-4 h-4 text-gray-500" />
                                }
                            >
                                <SelectItem>
                                    30 Days
                                </SelectItem>
                            </Select>
                        </div>

                        <div className='w-full'>
                            <div className='text-[1rem] font-medium pb-1'>
                                Return Notes
                            </div>

                            <Select
                                placeholder="Select Return Notes"
                                variant="bordered"
                                classNames={{
                                    trigger: inputWrapperStyle,
                                }}
                                selectorIcon={
                                    <img src={dropDownIconUrl} alt="dropdown" className="w-4 h-4 text-gray-500" />
                                }
                            >
                                <SelectItem>
                                    Contact via email for returns
                                </SelectItem>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* 4.Portal Preferences */}
                <div className='profile-card p-5 w-full'>
                    <div className='text-[1rem] font-medium'>
                        Portal Preferences
                    </div>

                    <div className='border-b border-[#3395B3] mb-5 mt-3' />

                    <div className='flex flex-col gap-5'>
                        <div className='w-full'>
                            <div className='text-[1rem] font-medium pb-1'>
                                Language
                            </div>

                            <Select
                                variant="bordered"
                                placeholder="Select a country"
                                classNames={{
                                    trigger: inputWrapperStyle,
                                }}
                                selectorIcon={
                                    <img src={dropDownIconUrl} alt="dropdown" className="w-4 h-4 text-gray-500" />
                                }
                                selectedKeys={selectedLanguage ? [selectedLanguage.code] : []}
                                onChange={handleChangeLanguage}
                                renderValue={() =>
                                    selectedLanguage ? (
                                        <div className="flex items-center gap-2">
                                            <img src={selectedLanguage.flag} className="w-6 h-6 rounded-full object-cover" />
                                            <span>
                                                {selectedLanguage.language}
                                            </span>
                                        </div>
                                    ) : null
                                }
                            >
                                {countries.map((country) => (
                                    <SelectItem key={country.code} value={country.code}>
                                        <div className="flex items-center gap-2">
                                            <img src={country.flag} className="w-6 h-6 rounded-full object-cover" />
                                            <span>
                                                {country.language}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div className='flex gap-3 items-center'>
                            <ToggleSwitch />

                            <div className='font-normal'>
                                Email Notifications for Orders/Work Orders
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className='flex justify-end mt-4'>
                <Button
                    type="submit"
                    color="primary"
                    isDisabled={!formik.isValid || !formik.dirty}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

export default ProfileSettings