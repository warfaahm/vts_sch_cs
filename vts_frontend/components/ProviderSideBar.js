import {forwardRef} from "react";
import Link from 'next/link';
import {
    HomeIcon,
    UserCircleIcon,
    CalendarIcon,
    UserPlusIcon,
    FolderIcon,
    ArrowRightOnRectangleIcon,
    ChartBarSquareIcon
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import {MdOutlineManageAccounts} from "react-icons/md";
import axios from "axios";



const ProviderSideBar = forwardRef(({ showNav }, ref) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Get the user token from local storage
            const token = window.localStorage.getItem('staffToken');

            // Make a POST request to the logout API endpoint with the token in the Authorization header
            await axios.post('http://127.0.0.1:8000/api/staff/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove user token from local storage
            window.localStorage.removeItem('staffToken');

            // Redirect to login page or perform any other actions
            // that you want to do after successful logout
            router.push('/provider/login'); // Replace '/login' with the desired path
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div ref={ref} className='fixed w-56 h-full bg-gray-50 border-r-2 shadow-sm'>
            <div className='flex justify-center mt-6 mb-14'>
                <picture>
                    <img
                        className="w-32 h-auto"
                        src="/images/logo.png"
                        alt="company logo"
                        draggable='false'
                        rel="preload"
                        as='image'
                    />
                    <div className='font-bold flex justify-center'>Provider</div>
                </picture>
            </div>
            <div className='flex flex-col'>
                <Link href='/provider'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/provider' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <HomeIcon className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Home</p>
                        </div>
                    </div>
                </Link>
                <Link href='/provider/appointment'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/provider/appointment' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <CalendarIcon className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Appointments</p>
                        </div>
                    </div>
                </Link>
                <Link href='/provider/accounts'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/provider/accounts' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <MdOutlineManageAccounts className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Manage Users</p>
                        </div>
                    </div>
                </Link>
                <Link href='/provider/records'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/provider/records' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <FolderIcon className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Records</p>
                        </div>
                    </div>
                </Link>
                <Link href='/provider/reports'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/provider/reports' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <ChartBarSquareIcon className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Reports</p>
                        </div>
                    </div>
                </Link>
                <Link href='/provider/profile'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/provider/profile' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <UserCircleIcon className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Profile</p>
                        </div>
                    </div>
                </Link>
                <button className='pl-6 py-3 mx-5 mt-10 rounded text-center cursor-pointer mb-3 border border-blue-600 flex items-center transition-colors text-gray-700 hover:bg-blue-500 hover:text-white' onClick={handleLogout}>
                    <div className='mr-2'>
                        <ArrowRightOnRectangleIcon className='h-5 w-5'/>
                    </div>
                    <div>
                        <p>Logout</p>
                    </div>
                </button>
            </div>
        </div>
    )
})

ProviderSideBar.displayName = 'SideBar';

export default ProviderSideBar;