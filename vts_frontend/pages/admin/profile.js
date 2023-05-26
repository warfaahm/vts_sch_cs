import Head from "next/head";
import {FolderIcon, UserCircleIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import PageHeader from "@/components/PageHeader";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import authHOCAdmin from "@/components/auth/authHOCAdmin";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import Popup from "@/components/Popup";


const ProfileAdmin = () =>{

    const [data, setData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

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
            const response = await axios.get('http://127.0.0.1:8000/api/admin/profile/', {
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
                            <button className='border border-blue-700 rounded px-2 py-1 text-blue-800 hover:bg-blue-100 my-2 mx-2' onClick={()=>setOpenPopup(true)}>Change Password</button>
                        </div>
                    </div>
                    <div className='bg-blue-50 p-4 mt-2 rounded-lg'>
                        <div>
                            <div>
                                <span className='dialog1'>Name</span>
                                <h1 className='dialog2'>{data?.first_name+ '  '+data?.last_name}</h1>
                            </div>
                            <div>
                                <span className='dialog1'>Email</span>
                                <h1 className='dialog2'>{data?.email}</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className='dialog1'>Role</span>
                                <h1 className='dialog2'>{data?.role}</h1>
                            </div>
                            <div>
                                <span className='dialog1'>Email</span>
                                <h1 className='dialog2'>{data?.email}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    title='Change Password Form'
                >
                    <ChangePasswordForm/>
                </Popup>
            </main>
        </>
    )
}
export default authHOCAdmin(ProfileAdmin);
