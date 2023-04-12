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
import DependentForm from "@/components/dependents/DependentForm";
import AppointmentForm from "@/components/appointment/AppointmentForm";


export default function AppointmentPatient()
{
    const [data, setData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data?.filter(item => {
        return item?.vaccine?.vaccine_name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Confirmed":
                return "bg-green-200 text-green-800";
            case "Approved":
                return "bg-green-200 text-green-800";
            case "Cancelled":
                return "bg-red-200 text-red-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('userToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/appointment/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    function formatTimeSlot(timeSlot) {
        const hour = parseInt(timeSlot.split('.')[0]);
        const minute = parseInt(timeSlot.split('.')[1]) === 1 ? '00' : '30';
        return `${hour}:${minute}`;
    }

    return (
        <>
            <div className='bg-blue-50 px-4 py-6 rounded-lg mt-4'>
                <Toolbar className='mb-2 flex justify-between'>
                    <TextField
                        variant='outlined'
                        label='Search Appointment'
                        name='search'
                        className='bg-white'
                        onChange={handleSearch}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <MagnifyingGlassIcon className='w-6 h-6 text-gray-700' />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className=''>
                        <button className='border border-blue-700 text-blue-900 rounded py-2 px-2 hover:bg-blue-100  flex' onClick={()=>setOpenPopup(true)}><PlusIcon className='w-6 h-6'/> Schedule an Appointment</button>
                    </div>
                </Toolbar>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-violet-200">
                                    <TableCell className="font-bold text-violet-900">Name</TableCell>
                                    <TableCell className="font-bold text-violet-900">Hospital</TableCell>
                                    <TableCell className="font-bold text-violet-900">Vaccine</TableCell>
                                    <TableCell className="font-bold text-violet-900">Dose No</TableCell>
                                    <TableCell className="font-bold text-violet-900">Date</TableCell>
                                    <TableCell className="font-bold text-violet-900">Time</TableCell>
                                    <TableCell className="font-bold text-violet-900">Status</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {(!data || !Array.isArray(data)) ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">Loading...</TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-gray-100">
                                            <TableCell>{item.dependent === null ? item.info.first_name+" "+item.info.last_name : item.dependent.first_name+" "+item.dependent.last_name}</TableCell>
                                            <TableCell>{item.hospital.hospital_name}</TableCell>
                                            <TableCell>{item.vaccine.vaccine_name}</TableCell>
                                            <TableCell>{item.dose_no}</TableCell>
                                            <TableCell>{moment(item.date).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{formatTimeSlot(item.time)}</TableCell>
                                            <TableCell><span className='bg-green-200 text-green-800 border border-green-800 px-1.5 py-1.5 rounded-full'>{item.status}</span></TableCell>
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
                    title='Appointment Form'
                >
                    <AppointmentForm/>
                </Popup>
            </div>
        </>
    )
}
