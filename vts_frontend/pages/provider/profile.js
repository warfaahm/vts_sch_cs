import Head from "next/head";
import PageHeader from "@/components/PageHeader";
import {useEffect, useState} from "react";
import axios from "axios";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import authHOCProvider from "@/components/auth/authHOCProvider";


const ProfileProvider = () =>{

    const [data, setData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

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
            const response = await axios.get('http://127.0.0.1:8000/api/staff/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    return (
        <>
            <Head>
                <title>Dashboard - Profile | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon={<UserCircleIcon className='page-header' />}
                    title="Your Profile"
                    description="View your profile"
                />

                <div>
                    <div>
                        <div>
                            {/*<button className='border border-blue-700 rounded px-2 py-1 text-blue-800 hover:bg-blue-100 my-2 mx-2'>Edit Profile</button>*/}
                        </div>
                    </div>
                    <div className='bg-blue-50 p-4 mt-2 rounded-lg'>
                        <div>
                            <div>
                                <span className='dialog1'>Name</span>
                                <h1 className='dialog2'>{data?.data?.first_name+ '  '+data?.data?.last_name}</h1>
                            </div>
                            <div>
                                <span className='dialog1'>Email</span>
                                <h1 className='dialog2'>{data?.data?.email}</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className='dialog1'>Role</span>
                                <h1 className='dialog2'>{data?.data?.role}</h1>
                            </div>
                            <div>
                                <span className='dialog1'>Email</span>
                                <h1 className='dialog2'>{data?.data?.email}</h1>
                            </div>
                            <div>
                                <span className='dialog1'>Hospital</span>
                                <h1 className='dialog2'>{data?.hospital?.hospital_name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default authHOCProvider(ProfileProvider);
