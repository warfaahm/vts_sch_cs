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
                    icon ={<CalendarIcon className='h-14 w-14 text-blue-800 shadow-lg m-3 p-2 rounded-sm'/>}
                    title="Appointment"
                    description = "description"
                />
            </main>
        </>
    )
}
