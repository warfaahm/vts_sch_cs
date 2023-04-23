import Head from "next/head";
import PageHeader from "@/components/PageHeader";
import {CalendarIcon} from "@heroicons/react/24/solid";
import AppointmentHospital from "@/components/appointment/AppointmentHospital";
import authHOCProvider from "@/components/auth/authHOCProvider";


const AppointmentProvider = () =>{

    return (
        <>
            <Head>
                <title>Dashboard - Appointment | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<CalendarIcon className='page-header'/>}
                    title="Appointment"
                    description = "View and Update Appointments"
                />
                <div>
                    <AppointmentHospital/>
                </div>
            </main>
        </>
    )
}
export default authHOCProvider(AppointmentProvider);
