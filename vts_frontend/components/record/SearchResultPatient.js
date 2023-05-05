import {useEffect, useState} from "react";
import axios from "axios";
import {
    InputAdornment,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar
} from "@mui/material";
import {ArrowsPointingOutIcon, MagnifyingGlassIcon, PlusIcon} from "@heroicons/react/24/solid";
import moment from "moment";
import Popup from "@/components/Popup";
import RecordPatientPop from "@/components/record/RecordPatientPop";
import AddPatientRecord from "@/components/record/AddPatientRecord";


export default function SearchResultPatient(props)
{
    const {name, number} = props;
    const [data, setData] = useState('');
    const [record, setRecord] = useState('');
    const [openPopup, setOpenPopup] = useState();

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('staffToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/staff/search_record/', {
                last_name: name,
                nat_id_no: number,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setData(response.data);
            setRecord(response.data.records);
            console.log(record);
        } catch (error) {
            console.error(error);
            alert('Error!! Wrong QR Code or form data entered! Click clear to continue.');
        }
    };

    useEffect(() => {
        fetchData();
    }, [name, number, token]);

    return (
        <div>
            <div className='bg-blue-50 px-4 py-6 rounded-lg mt-4'>
                <div className='border-b-2 border-gray-300 mb-2'>
                    <div className='flex'>
                        <div className='m-2'>
                            <span className='dialog1'>Name</span>
                            <h1 className='dialog2'>{data?.patient?.user?.first_name+ '  '+data?.patient?.user?.last_name}</h1>
                        </div>
                        <div className='m-2'>
                            <span className='dialog1'>Email</span>
                            <h1 className='dialog2'>{data?.patient?.user?.email}</h1>
                        </div>
                        <div className='m-2'>
                            <span className='dialog1'>DOB</span>
                            <h1 className='dialog2'>{moment(data?.patient?.dob).format('DD/MM/YYYY')}</h1>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='m-2'>
                            <span className='dialog1'>Gender</span>
                            <h1 className='dialog2'>{data?.patient?.gender === 'M' ? 'Male' : 'Female'}</h1>
                        </div>
                        <div className='m-2'>
                            <span className='dialog1'>National ID</span>
                            <h1 className='dialog2'>{data?.patient?.nat_id_no}</h1>
                        </div>
                        <div className='m-2'>
                            <span className='dialog1'>Allergy</span>
                            <h1 className='dialog2'>{data?.patient?.allergy}</h1>
                        </div>
                    </div>
                </div>
                <Toolbar className='mb-2 flex justify-between'>
                    <div className=''>
                        <button className='border border-blue-700 text-blue-900 rounded py-2 px-2 hover:bg-blue-100  flex' onClick={()=>setOpenPopup(true)}><PlusIcon className='w-6 h-6'/> Add Record</button>
                    </div>
                </Toolbar>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-violet-200">
                                    <TableCell className="font-bold text-violet-900">Vaccine Name</TableCell>
                                    <TableCell className="font-bold text-violet-900">Date Administered</TableCell>
                                    <TableCell className="font-bold text-violet-900">Dose No</TableCell>
                                    <TableCell className="font-bold text-violet-900">Lot/Batch No</TableCell>
                                    <TableCell className="font-bold text-violet-900">Next Dose Date</TableCell>
                                    <TableCell className="font-bold text-violet-900">Hospital</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {(!record || !Array.isArray(record)) ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">Loading...</TableCell>
                                    </TableRow>
                                ) : (
                                    record.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-gray-100">
                                            <TableCell>{item.vaccine.vaccine_name}</TableCell>
                                            <TableCell>{moment(item.date).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{item.dose_no}</TableCell>
                                            <TableCell>{item.batch.lot_number}</TableCell>
                                            <TableCell>{moment(item.next_date).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{item.hospital.hospital_name}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                    </TableContainer>
                    {/*<TablePagination count={data.length} page={1} rowsPerPage={5} />*/}
                </Paper>
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    title='Record Info'
                >
                    <AddPatientRecord id = {data?.patient?.id} />
                </Popup>
            </div>
        </div>
    )
}
