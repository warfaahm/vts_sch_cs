import Head from "next/head";
import PageHeader from "@/components/PageHeader";
import {MdOutlineManageAccounts} from "react-icons/md";
import ProviderAccountList from "@/components/accounts/ProviderAccountList";


export default function ProviderAccounts(){

    return (
        <>
            <Head>
                <title>Dashboard - Accounts | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<MdOutlineManageAccounts className='page-header'/>}
                    title="Manage Accounts"
                    description = "Add, View Accounts"
                />
                <div>
                    <ProviderAccountList/>
                </div>
            </main>
        </>
    )
}