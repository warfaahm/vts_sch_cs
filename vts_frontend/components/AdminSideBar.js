import {forwardRef} from "react";
import Link from 'next/link';
import { HomeIcon, UserCircleIcon, CalendarIcon, UserPlusIcon, FolderIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Image from "next/image";



const AdminSideBar = forwardRef(({ showNav }, ref) => {
    const router = useRouter();

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
                <Link href='/user/appointment'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/admin/appointment' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <CalendarIcon className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Hospital</p>
                        </div>
                    </div>
                </Link>
                <Link href='/user/child'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/admin/child' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <UserPlusIcon className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Dependent</p>
                        </div>
                    </div>
                </Link>
                <Link href='/user/record'>
                    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                        router.pathname == '/admin/record' ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                    }`}>
                        <div className="mr-2">
                            <FolderIcon className='h-5 w-5'/>
                        </div>
                        <div>
                            <p>Records</p>
                        </div>
                    </div>
                </Link>
                <Link href='/user/profile'>
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
                <button className='pl-6 py-3 mx-5 mt-10 rounded text-center cursor-pointer mb-3 border border-blue-600 flex items-center transition-colors text-gray-700 hover:bg-blue-500 hover:text-white'>
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