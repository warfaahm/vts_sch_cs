import Head from "next/head";
import {FolderIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import PageHeader from "@/components/PageHeader";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import RecordsPatient from "@/components/record/RecordsPatient";
import RecordsDependent from "@/components/record/RecordsDependent";
import {MdOutlineVaccines} from "react-icons/md";
import {useState} from "react";
import Disease from "@/components/vaccine/Disease";
import Vaccines from "@/components/vaccine/Vaccine";


export default function Vaccine(){

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Head>
                <title>Dashboard - Disease & Vaccine | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<MdOutlineVaccines className='page-header'/>}
                    title="Disease and Vaccine"
                    description = "Add, View and Edit Diseases and Vaccines"
                />
                <div className="w-full max-w-5xl px-2 py-4 sm:px-0">
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='flex justify-center'>
                                <TabList onChange={handleChange}>
                                    <Tab label="Disease" value="1" />
                                    <Tab label="Vaccine" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1"><Disease/></TabPanel>
                            <TabPanel value="2"><Vaccines/></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </main>
        </>
    )
}
