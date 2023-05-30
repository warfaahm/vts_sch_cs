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
import {ArrowsPointingOutIcon, MagnifyingGlassIcon, PlusIcon, QrCodeIcon} from "@heroicons/react/24/solid";
import moment from "moment";
import Popup from "@/components/Popup";
import DependentForm from "@/components/dependents/DependentForm";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import {CalendarDaysIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import RescheduleForm from "@/components/appointment/RescheduleForm";


export default function AppointmentPatient()
{
    const [data, setData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [token1, setToken1] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data?.filter(item => {
        return item?.hospital?.hospital_name.toLowerCase().includes(searchTerm.toLowerCase());
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

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setToken1(userToken);
    }, []);
    const handleDeleteClick = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/user/appointment/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token1}`
                }
            });
            console.log(response.data);
            alert("Deleted!");
        } catch (error) {
            console.error(error);
            alert("Cannot be Deleted!");
        }
    };

    let idno;
    const handleEditClick = async (id) => {
        idno = id;
        setOpenPopup1(true);
    };

    return (
        <>
            <div className='bg-blue-50 px-4 py-6 rounded-lg mt-4'>
                <Toolbar className='mb-2 flex justify-between'>
                    <TextField
                        variant='outlined'
                        label='Search by Hospital name'
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
                                    <TableCell className="font-bold text-violet-900">Actions</TableCell>
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
                                            <TableCell><span className={item.status.toLowerCase()}>{item.status}</span></TableCell>
                                            <TableCell>
                                                <div>
                                                    <button className='text-red-800 rounded py-1.5 px-1 bg-red-100 hover:bg-red-300 ml-4 flex' onClick={() => handleDeleteClick(item.id)}>
                                                        <TrashIcon className='w-5 h-5'/>
                                                        <h1>Delete</h1>
                                                    </button>
                                                </div>
                                            </TableCell>
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
                <Popup
                    openPopup={openPopup1}
                    setOpenPopup={setOpenPopup1}
                    title='Reschedule Form'
                >
                    <RescheduleForm id={idno}/>
                </Popup>
            </div>
        </>
    )
}
