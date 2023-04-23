import Head from "next/head";
import PageHeader from "@/components/PageHeader";
import {FolderIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import ProviderReports from "@/components/reports/ProviderReports";
import authHOCProvider from "@/components/auth/authHOCProvider";


const ReportsProvider = () =>{

    return (
        <>
            <Head>
                <title>Dashboard - Reports | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon={<FolderIcon className='page-header' />}
                    title="Reports"
                    description="View Reports"
                />
                <ProviderReports/>
            </main>
        </>
    )
}
export default authHOCProvider(ReportsProvider);
