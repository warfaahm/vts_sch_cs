import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";


export default function HomeProvider()
{
    const [appointment, setAppointment] = useState('');
    const [record, setRecord] = useState('');
    const [account, setAccount] = useState('');

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('staffToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/staff/home/appointment', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setAppointment(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData1 = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/staff/home/record', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setRecord(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData1();
    }, [token]);

    const fetchData2 = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/staff/home/account', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setAccount(response.data);
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
                <Link href='provider/appointment' className='py-6 px-4'>
                    <h1 className='text-blue-700 text-2xl'>{appointment?.count}</h1>
                    <h1 className='text-blue-700'>Total Appointments today</h1>
                </Link>
            </div>
            <div className='bg-green-200 hover:bg-green-300 rounded-lg flex items-between'>
                <Link href='provider/records' className='py-6 px-4'>
                    <h1 className='text-green-700 text-2xl'>{record?.count}</h1>
                    <h1 className='text-green-700'>Total Vaccinations</h1>
                </Link>
            </div>
            <div className='bg-yellow-200 hover:bg-yellow-300 rounded-lg flex items-center justify-center'>
                <Link href='provider/profile' className='py-6 px-4'>
                    <h1 className='text-yellow-700 text-1xl'>Go to your Profile</h1>
                </Link>
            </div>
            <div className='bg-red-200 hover:bg-red-300 rounded-lg flex items-between'>
                <Link href='provider/accounts' className='py-6 px-4'>
                    <h1 className='text-red-700 text-2xl'>{account?.count}</h1>
                    <h1 className='text-red-700'>Account(s) in hospital</h1>
                </Link>
            </div>
            <div className='bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center'>
                <Link href='provider/reports' className='py-6 px-4'>
                    <h1 className='text-gray-700 text-1xl'>View Reports</h1>
                </Link>
            </div>
        </div>
    )
}
