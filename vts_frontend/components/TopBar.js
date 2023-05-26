import {Fragment, useEffect, useState} from "react";
import {Bars3CenterLeftIcon, PencilIcon, ChevronDownIcon, CreditCardIcon, Cog8ToothIcon} from "@heroicons/react/24/solid";
import {ArrowRightOnRectangleIcon, BellIcon, CheckIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import { Menu, Transition, Popover} from "@headlessui/react";
import Link from 'next/link';
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/router";

export default function TopBar({ showNav, setShowNav }) {

    const [data, setData] = useState(null);

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('userToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Get the user token from local storage
            const token = window.localStorage.getItem('userToken');

            // Make a POST request to the logout API endpoint with the token in the Authorization header
            await axios.post('http://127.0.0.1:8000/api/user/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove user token from local storage
            window.localStorage.removeItem('userToken');

            // Redirect to login page or perform any other actions
            // that you want to do after successful logout
            router.push('/user/login'); // Replace '/login' with the desired path
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`fixed w-full h-16 flex justify-between items-center bg-gray-50 border-b border-gray-300 transition-all duration-[400ms] ${showNav ? 'pl-56' : ''}`}>
            <div className='px-4 md:px-16'>
                <Bars3CenterLeftIcon className='h-8 w-8 text-gray-700 cursor-pointer' onClick={() => setShowNav(!showNav)}/>
            </div>
            <div className='flex items-center pr-4 md:pr-16'>
                <Popover className="relative">
                    <Popover.Button className='outline-none mr-5 md:mr-8 cursor-pointer text-gray-700'>
                        <BellIcon className='H-6 W-6' />
                    </Popover.Button>
                    <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform scale-95'
                    enterTo='transform scale-100'
                    leave='transition ease-in duration=75'
                    leaveFrom='transform scale-100'
                    leaveTo='transform scale-98'>
                        <Popover.Panel className='absolute -right-16 sm:right-4 z-50 mt-2 bg-white shadow-sm rounded max-w-xs sm:max-w-sm w-screen'>
                            <dv className='relative p-3'>
                                <div className='flex justify-between items-center w-full'>
                                    <p className='text-gray-700 font-medium'>Notifications</p>
                                    <a className='text-sm text-orange-500'>Mark all as read</a>
                                </div>
                                <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                                    <div className='flex'>
                                        <div className='rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center'>
                                            <CheckIcon className="h-4 w-4 text-green-600 "/>
                                        </div>
                                        <div className='ml-4'>
                                            <p className='font-medium text-gray-700'>Notification Title</p>
                                            <p className='text-sm text-gray-500 truncate'>Test Notification</p>
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        <div className='rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center'>
                                            <CheckIcon className="h-4 w-4 text-green-600 "/>
                                        </div>
                                        <div className='ml-4'>
                                            <p className='font-medium text-gray-700'>Notification Title</p>
                                            <p className='text-sm text-gray-500 truncate'>Test Notification</p>
                                        </div>
                                    </div>
                                </div>
                            </dv>
                        </Popover.Panel>
                    </Transition>
                </Popover>
                <Menu as='div' className='relative inline-block text-left'>
                    <div>
                        <Menu.Button className='inline-flex w-full justify-center items-center'>
                            <Image src='/images/profile.png' width='40' height='40' alt='profile' draggable='false' className='rounded-full h-auto md:mr-4 border-2 border-white shadow-sm'/>
                            <span className='hidden md:block font-medium text-gray-700'>{data?.first_name+ '  '+data?.last_name}</span>
                            <ChevronDownIcon className='ml-2 h-4 w-4 text-gray-700'/>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform scale-95'
                        enterTo='transform scale-100'
                        leave='transition ease-in duration=75'
                        leaveFrom='transform scale-100'
                        leaveTo='transform scale-98'>

                        <Menu.Items className='absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm'>
                            <div className='p-1'>
                                <Menu.Item>
                                    <Link href='/user/profile' className='flex hover:bg-blue-600 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center'>
                                        <UserCircleIcon className='h-4 w-4 mr-2'/>
                                        <span>Profile</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <button className='flex hover:bg-blue-600 w-full hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center' onClick={handleLogout}>
                                        <ArrowRightOnRectangleIcon className='h-4 w-4 mr-2'/>
                                        <span>Logout</span>
                                    </button>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}
