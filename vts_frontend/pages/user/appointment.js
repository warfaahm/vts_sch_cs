import Head from "next/head";

import PageHeader from "@/components/PageHeader";
import {CalendarIcon} from "@heroicons/react/24/solid";


export default function PatientAppointment(){

    return (
        <>
            <Head>
                <title>Dashboard - Appointment | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<CalendarIcon className='page-header'/>}
                    title="Appointment"
                    description = "description"
                />
            </main>
        </>
    )
}
