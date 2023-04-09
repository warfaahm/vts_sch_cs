import Head from "next/head";
import {FolderIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import PageHeader from "@/components/PageHeader";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {useState} from "react";
import RecordsPatient from "@/components/record/RecordsPatient";
import RecordsDependent from "@/components/record/RecordsDependent";


export default function PatientRecord(){

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Head>
                <title>Dashboard - Record | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<FolderIcon className='page-header'/>}
                    title="Records"
                    description = "View Vaccination Records"
                />
                <div className="w-full max-w-5xl px-2 py-4 sm:px-0">
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='flex justify-center'>
                                <TabList onChange={handleChange}>
                                    <Tab label="Your Records" value="1" />
                                    <Tab label="Your Kids Record" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1"><RecordsPatient/></TabPanel>
                            <TabPanel value="2"><RecordsDependent/></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </main>
        </>
    )
}
