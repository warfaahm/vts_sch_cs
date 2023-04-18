import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";


export default function HomeUser()
{
    const [dependent, setDependent] = useState('');
    const [appointment, setAppointment] = useState('');
    const [record, setRecord] = useState('');

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
            const response = await axios.get('http://127.0.0.1:8000/api/user/home/dependent', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setDependent(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData1 = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/home/appointment', {
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
        fetchData1();
    }, [token]);

    const fetchData2 = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/home/record', {
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
        fetchData2();
    }, [token]);

    return (
        <div className='mt-4 grid md:grid-cols-3 grid-cols-1 gap-16'>
            <div className='bg-blue-200 hover:bg-blue-300 rounded-lg  flex items-between'>
                <Link href='user/child' className='py-6 px-4'>
                    <h1 className='text-blue-700 text-2xl'>{dependent?.count}</h1>
                    <h1 className='text-blue-700'>Dependent(s)</h1>
                </Link>
            </div>
            <div className='bg-green-200 hover:bg-green-300 rounded-lg flex items-between'>
                <Link href='user/appointment' className='py-6 px-4'>
                    <h1 className='text-green-700 text-2xl'>{appointment?.count}</h1>
                    <h1 className='text-green-700'>Total Appointments</h1>
                </Link>
            </div>
            <div className='bg-yellow-200 hover:bg-yellow-300 rounded-lg flex items-center justify-center'>
                <Link href='user/profile' className='py-6 px-4'>
                    <h1 className='text-yellow-700 text-1xl'>Go to your Profile</h1>
                </Link>
            </div>
            <div className='bg-red-200 hover:bg-red-300 rounded-lg flex items-between'>
                <Link href='user/record' className='py-6 px-4'>
                    <h1 className='text-red-700 text-2xl'>{record?.count}</h1>
                    <h1 className='text-red-700'>Vaccination Record(s)</h1>
                </Link>
            </div>
        </div>
    )
}
