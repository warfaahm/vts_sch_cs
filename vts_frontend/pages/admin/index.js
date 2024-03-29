import Head from 'next/head'
import { Inter } from 'next/font/google'
import PageHeader from "@/components/PageHeader";
import {HomeIcon} from "@heroicons/react/24/solid";
import HomeAdmin from "@/components/home/HomeAdmin";
import authHOCAdmin from "@/components/auth/authHOCAdmin";

const AdminHome = () => {
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
                    <HomeAdmin/>
                </div>
            </main>
        </>
    )
}
export default authHOCAdmin(AdminHome);
