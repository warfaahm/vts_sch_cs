import Head from 'next/head'
import { Inter } from 'next/font/google'
import PageHeader from "@/components/PageHeader";
import {HomeIcon} from "@heroicons/react/24/solid";
import HomeProvider from "@/components/home/HomeProvider";
import authHOCProvider from "@/components/auth/authHOCProvider";

const ProviderHome = () => {
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
                    <HomeProvider/>
                </div>
            </main>
        </>
    )
}
export default authHOCProvider(ProviderHome);
