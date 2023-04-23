import Head from "next/head";

import PageHeader from "@/components/PageHeader";
import {CalendarIcon} from "@heroicons/react/24/solid";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import AppointmentPatient from "@/components/appointment/AppointmentPatient";
import {useState} from "react";
import AuthHOCUser from "@/components/auth/authHOCUser";


const PatientAppointment = () =>{

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Head>
                <title>Dashboard - Appointment | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<CalendarIcon className='page-header'/>}
                    title="Appointment"
                    description = "Schedule Hospital Appointment"
                />
                <div>
                    <AppointmentPatient/>
                </div>
            </main>
        </>
    )
}
export default AuthHOCUser(PatientAppointment);
