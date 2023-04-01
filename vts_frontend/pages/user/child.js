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
                    icon ={<UserPlusIcon className='h-14 w-14 text-blue-800 shadow-lg m-3 p-2 rounded-sm'/>}
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
                                <TableRow className="bg-blue-500">
                                    <TableCell className="font-bold">Name</TableCell>
                                    <TableCell>DOB</TableCell>
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
