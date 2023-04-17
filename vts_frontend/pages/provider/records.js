import Head from "next/head";
import PageHeader from "@/components/PageHeader";
import {FolderIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import HospitalForm from "@/components/hospital/HospitalForm";
import Popup from "@/components/Popup";
import QRCodeScanner from "@/components/qrcode/QRCodeScanner";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Disease from "@/components/vaccine/Disease";
import Vaccines from "@/components/vaccine/Vaccine";
import SearchPatientRecord from "@/components/record/SearchPatientRecord";
import SearchDependentRecord from "@/components/record/SearchDependentRecord";


export default function PatientRecordP(){

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Head>
                <title>Dashboard - Records | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<FolderIcon className='page-header'/>}
                    title="Records"
                    description = "Add and View Vaccination Records"
                />
                <div className="w-full max-w-5xl px-2 py-4 sm:px-0">
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='flex justify-center'>
                                <TabList onChange={handleChange}>
                                    <Tab label="Adult" value="1" />
                                    <Tab label="Dependent" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1"><SearchPatientRecord/></TabPanel>
                            <TabPanel value="2"><SearchDependentRecord/></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </main>
        </>
    )
}