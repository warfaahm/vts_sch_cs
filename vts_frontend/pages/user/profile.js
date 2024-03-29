import Head from "next/head";
import {UserCircleIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import PageHeader from "@/components/PageHeader";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment/moment";
import Popup from "@/components/Popup";
import QRCodeGenerate from "@/components/qrcode/QRCodeGenerate";
import ProfileUser from "@/components/profile/ProfileUser";
import AuthHOCUser from "@/components/auth/authHOCUser";


const PatientProfile = () =>{

    const [data, setData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);

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

    return (
        <>
            <Head>
                <title>Dashboard - Profile</title>
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
                            <button className='border border-blue-700 rounded px-2 py-1 text-blue-800 hover:bg-blue-100 my-2 mx-2' onClick={()=>setOpenPopup1(true)}>Edit Profile</button>
                        </div>
                        <div>
                            <button className='border border-green-700 rounded px-2 py-1 text-green-800 hover:bg-green-100 my-2 mx-2' onClick={()=>setOpenPopup(true)}>Get QR Code</button>
                        </div>
                    </div>
                    <div className='bg-blue-50 p-4 rounded-lg'>
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
                                <span className='dialog1'>ID Number</span>
                                <h1 className='dialog2'>{data?.patient?.nat_id_no}</h1>
                            </div>
                            <div>
                                <span className='dialog1'>Gender</span>
                                <h1 className='dialog2'>{data?.patient?.gender === 'M' ? 'Male' : 'Female'}</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className='dialog1'>Phone no</span>
                                <h1 className='dialog2'>{data?.patient?.phone_no}</h1>
                            </div>
                            <div>
                                <span className='dialog1'>Date of Birth</span>
                                <h1 className='dialog2'>{moment(data?.patient?.dob).format('DD/MM/YYYY')}</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className='dialog1'>Allergy</span>
                                <h1 className='dialog2'>{data?.patient?.allergy}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    title='QR Code'
                >
                    <QRCodeGenerate name={data?.last_name} id={data?.patient?.nat_id_no}/>
                </Popup>
                <Popup
                    openPopup={openPopup1}
                    setOpenPopup={setOpenPopup1}
                    title='Edit Profile'
                >
                    <ProfileUser data={data}/>
                </Popup>
            </main>
        </>
    )
}
export default AuthHOCUser(PatientProfile);

