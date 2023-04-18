import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";


export default function HomeAdmin()
{
    const [hospital, setHospital] = useState('');
    const [vaccine, setVaccine] = useState('');
    const [user, setUser] = useState('');

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('adminToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin/home/hospital', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setHospital(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData1 = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin/home/vaccine', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setVaccine(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData1();
    }, [token]);

    const fetchData2 = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin/home/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData2();
    }, [token]);

    return (
        <div className='mt-4 grid md:grid-cols-3 grid-cols-1 gap-16'>
            <div className='bg-blue-200 hover:bg-blue-300 rounded-lg  flex items-between'>
                <Link href='admin/hospital' className='py-6 px-4'>
                    <h1 className='text-blue-700 text-2xl'>{hospital?.count}</h1>
                    <h1 className='text-blue-700'>Hospitals</h1>
                </Link>
            </div>
            <div className='bg-green-200 hover:bg-green-300 rounded-lg flex items-between'>
                <Link href='admin/vaccine' className='py-6 px-4'>
                    <h1 className='text-green-700 text-2xl'>{vaccine?.count}</h1>
                    <h1 className='text-green-700'>Total vaccines</h1>
                </Link>
            </div>
            <div className='bg-yellow-200 hover:bg-yellow-300 rounded-lg flex items-center justify-center'>
                <Link href='admin/profile' className='py-6 px-4'>
                    <h1 className='text-yellow-700 text-1xl'>Go to your Profile</h1>
                </Link>
            </div>
            <div className='bg-red-200 hover:bg-red-300 rounded-lg flex items-between'>
                <Link href='admin/accounts' className='py-6 px-4'>
                    <h1 className='text-red-700 text-2xl'>{user?.count}</h1>
                    <h1 className='text-red-700'>Total Users</h1>
                </Link>
            </div>
            <div className='bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center'>
                <Link href='admin/profile' className='py-6 px-4'>
                    <h1 className='text-gray-700 text-1xl'>View Reports</h1>
                </Link>
            </div>
        </div>
    )
}
