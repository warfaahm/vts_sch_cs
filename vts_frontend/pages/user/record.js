import Head from "next/head";
import {FolderIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import PageHeader from "@/components/PageHeader";


export default function PatientRecord(){

    return (
        <>
            <Head>
                <title>Dashboard - Record | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<FolderIcon className='page-header'/>}
                    title="Records"
                    description = "description"
                />
            </main>
        </>
    )
}
