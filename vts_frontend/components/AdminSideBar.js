import {forwardRef} from "react";
import Link from 'next/link';
import {
    HomeIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    ChartBarSquareIcon
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import {BsHospital} from "react-icons/bs";
import {MdOutlineManageAccounts, MdOutlineVaccines} from "react-icons/md";
import axios from "axios";



const AdminSideBar = forwardRef(({ showNav }, ref) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Get the user token from local storage
            const token = window.localStorage.getItem('adminToken');

            // Make a POST request to the logout API endpoint with the token in the Authorization header
            await axios.post('http://127.0.0.1:8000/api/admin/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove user token from local storage
            window.localStorage.removeItem('adminToken');

            // Redirect to login page or perform any other actions
            // that you want to do after successful logout
            router.push('/admin/login'); // Replace '/login' with the desired path
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
                    <div className='font-bold flex justify-center'>Admin</div>
                </picture>
            </div>
            <div className='flex flex-col'>
                <Link href='/admin'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/admin' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <HomeIcon className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Home</p>
                        </div>
                    </div>
                </Link>
                <Link href='/admin/hospital'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/admin/hospital' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <BsHospital className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Hospitals</p>
                        </div>
                    </div>
                </Link>
                <Link href='/admin/vaccine'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/admin/vaccine' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <MdOutlineVaccines className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Disease & Vaccine</p>
                        </div>
                    </div>
                </Link>
                <Link href='/admin/accounts'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/admin/accounts' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <MdOutlineManageAccounts className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Manage Users</p>
                        </div>
                    </div>
                </Link>
                <Link href='/admin/reports'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/admin/reports' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <ChartBarSquareIcon className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Reports</p>
                        </div>
                    </div>
                </Link>
                <Link href='/admin/profile'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/admin/profile' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
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

AdminSideBar.displayName = 'SideBar';

export default AdminSideBar;