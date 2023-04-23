import Head from "next/head";
import PageHeader from "@/components/PageHeader";
import {FolderIcon} from "@heroicons/react/24/solid";
import AdminReports from "@/components/reports/AdminReports";
import authHOCAdmin from "@/components/auth/authHOCAdmin";


const ReportsAdmin = () =>{

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
                <AdminReports/>
            </main>
        </>
    )
}
export default authHOCAdmin(ReportsAdmin);
