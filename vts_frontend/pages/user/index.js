import Head from 'next/head'
import { Inter } from 'next/font/google'
import PageHeader from "@/components/PageHeader";
import {HomeIcon} from "@heroicons/react/24/solid";
import HomeUser from "@/components/home/HomeUser";

export default function PatientHome() {
    return (
        <>
            <Head>
                <title>Dashboard - Home | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<HomeIcon className='page-header'/>}
                    title="Home"
                    description = ""
                />
                <div>
                    <HomeUser/>
                </div>
            </main>
        </>
    )
}