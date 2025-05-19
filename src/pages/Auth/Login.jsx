import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from "@heroui/input";
import { Button, ButtonGroup } from "@heroui/button";
import scalyxLogo from '../../assets/scalyx-logo.svg';
import appleIcon from '../../assets/apple-rounded-icon.svg';
import fbIcon from '../../assets/fb-rounded-icon.svg';
import googleIcon from '../../assets/google-rounded-icon.svg';
import EyeHide from '../../assets/eye-hide.svg';
import EyeOpen from '../../assets/eye-open.svg';
import { useState } from 'react';

const Login = () => {
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Too short').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className='flex flex-col items-center'>
            <div className='flex items-center'>
                <img src={scalyxLogo} />
            </div>

            <div className='mt-[2.5rem] mb-[1.5rem] text-[#22223B] text-[1.75rem] font-bold'>
                Login
            </div>

            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <>
                        <Form className='flex flex-col gap-[0.75rem]'>
                            <div>
                                <div className='text-[1.125rem] text-[#22223B] mb-[0.45rem] font-medium'>
                                    Email
                                </div>

                                <Field name="email" className="!rounded-[2.5rem]">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            radius="full"
                                            placeholder="Email"
                                            className="w-[22.5rem] mb-2 rounded-[2.5rem]"
                                        />
                                    )}
                                </Field>
                                {errors.email && touched.email && <div className="text-red-500 text-[0.75rem] font-semibold mt-[-0.75rem] pt-[0.25rem]">
                                    {errors.email}
                                </div>}
                            </div>

                            <div>
                                <div className='text-[1.125rem] text-[#22223B] mb-[0.45rem] font-medium'>
                                    Password
                                </div>
                                <Field name="password" className="!rounded-[2.5rem]">
                                    {({ field }) => (
                                        <div className="relative password-field">
                                            <Input
                                                {...field}
                                                radius="full"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                className="w-full mb-2 !rounded-[2.5rem]"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                                tabIndex={-1}
                                            >
                                                <img
                                                    src={showPassword ? EyeOpen : EyeHide}
                                                    alt="Toggle visibility"
                                                    className="w-5 h-5"
                                                />
                                            </button>
                                        </div>
                                    )}
                                </Field>
                                {errors.password && touched.password && (
                                    <div className="text-red-500 text-[0.75rem] font-semibold mt-[-0.75rem] pt-[0.25rem]">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* <div>
                                <div className='text-[1.125rem] text-[#22223B] mb-[0.45rem] font-medium'>
                                    Repeat Password
                                </div>

                                <Field name="confirmPassword" className="!rounded-[2.5rem]">
                                    {({ field }) => (
                                        <div className="relative password-field">
                                            <Input
                                                {...field}
                                                radius="full"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                className="w-full mb-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                                tabIndex={-1}
                                            >
                                                <img
                                                    src={showConfirmPassword ? EyeOpen : EyeHide}
                                                    alt="Toggle Confirm Password Visibility"
                                                    className="w-5 h-5"
                                                />
                                            </button>
                                        </div>
                                    )}
                                </Field>

                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="text-red-500 text-[0.75rem] font-semibold mt-[-0.75rem] pt-[0.25rem]">
                                        {errors.confirmPassword}
                                    </div>
                                )}
                            </div> */}

                            <Button type="submit" className="w-full mt-6 bg-[#22223B] text-[#FBFFFF]">
                                Login
                            </Button>
                        </Form>

                        <div className='my-3'>
                            OR
                        </div>

                        <div className='flex gap-4'>
                            <img src={googleIcon} className='box-shadow shadow-[0px_3px_4px_0px_#00000014] rounded-full cursor-pointer'/>
                            <img src={fbIcon} className='cursor-pointer' />
                            <img src={appleIcon} className='cursor-pointer' />
                        </div>

                        <div className='underline mt-7 text-[0.75rem] cursor-pointer'>
                            Forgot password?
                        </div>
                    </>
                )}
            </Formik>
        </div>
    )
}

export default Login