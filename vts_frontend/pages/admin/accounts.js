import Head from "next/head";
import {FolderIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import PageHeader from "@/components/PageHeader";
import {useState} from "react";
import {MdOutlineManageAccounts, MdOutlineVaccines} from "react-icons/md";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Disease from "@/components/vaccine/Disease";
import Vaccines from "@/components/vaccine/Vaccine";
import AdminAccounts from "@/components/accounts/AdminAccounts";
import HospitalAccounts from "@/components/accounts/HospitalAccounts";


export default function Accounts(){

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Head>
                <title>Dashboard - Manage Accounts | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<MdOutlineManageAccounts className='page-header'/>}
                    title="Manage Accounts"
                    description = "Add, View Accounts"
                />
                <div className="w-full max-w-5xl px-2 py-4 sm:px-0">
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='flex justify-center'>
                                <TabList onChange={handleChange}>
                                    <Tab label="System Admins" value="1" />
                                    <Tab label="Hospital Accounts" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1"><AdminAccounts/></TabPanel>
                            <TabPanel value="2"><HospitalAccounts/></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </main>
        </>
    )
}