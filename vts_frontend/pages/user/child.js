import Head from "next/head";
import DependentForm from "@/components/DependentForm";
import {UserPlusIcon} from "@heroicons/react/24/solid";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PageHeader from "@/components/PageHeader";


export default function PatientDependent(){

    return (
        <>
            <Head>
                <title>Dashboard - Dependent | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon ={<UserPlusIcon className='page-header'/>}
                    title="Dependent"
                    description = "description"
                />
                <Paper className='m-5 p-3 max-w-xl'>
                    <DependentForm/>
                </Paper>
                <div className='bg-blue-50'>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-violet-200">
                                    <TableCell className="font-bold text-violet-900">Name</TableCell>
                                    <TableCell className="font-bold text-violet-900">DOB</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Birth Cert No</TableCell>
                                    <TableCell>Allergy</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </main>
        </>
    )
}
