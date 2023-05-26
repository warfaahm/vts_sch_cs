import {useEffect, useState} from "react";
import axios from "axios";
import {
    Grid,
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
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DateField} from "@mui/x-date-pickers";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import StatusUpdateForm from "@/components/appointment/StatusUpdateForm";
import StatusUpdate from "@/components/appointment/StatusUpdate";


export default function AppointmentHospital()
{
    const [data, setData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [id, setId] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState(null);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data?.filter(item => {
        const patientName = item?.info?.first_name?.toLowerCase();
        const kidName = item?.dependent?.first_name?.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();

        return patientName.includes(searchTermLower) || kidName?.includes(searchTermLower);
    });

    const [token1, setToken1] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem('staffToken');
        setToken1(userToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/staff/appointment',
                {

                    date: date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token1}`,

                    },
                }
            );
            console.log(response.data);
            setData(response.data.data);
            console.log(date);
        } catch (error) {
            console.log(error);
        }
    };

    function formatTimeSlot(timeSlot) {
        const hour = parseInt(timeSlot.split('.')[0]);
        const minute = parseInt(timeSlot.split('.')[1]) === 1 ? '00' : '30';
        return `${hour}:${minute}`;
    }
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const handleEditClick = async (id) => {
        setId(id);
        setOpenPopup1(true);
    };

    return (
        <>
            <div className='bg-blue-50 px-4 py-6 rounded-lg mt-4'>
                <Toolbar className='mb-2 flex justify-between'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Grid container>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TextField label="Date"  id="date" type='date' name="date"  onChange={handleDateChange}/>
                                </LocalizationProvider>
                            </Grid>
                        </div>
                        <div className='mt-2'>
                            <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Search</button>
                        </div>
                    </form>
                    <TextField
                        variant='outlined'
                        label='Search by first name'
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
                        <button className='border border-blue-700 text-blue-900 rounded py-2 px-2 hover:bg-blue-100  flex' onClick={()=>setOpenPopup(true)}><PencilSquareIcon className='w-6 h-6'/>Update status by date</button>
                    </div>
                </Toolbar>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-violet-200">
                                    <TableCell className="font-bold text-violet-900">Name</TableCell>
                                    <TableCell className="font-bold text-violet-900">Type</TableCell>
                                    <TableCell className="font-bold text-violet-900">National/Birth No</TableCell>
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
                                            <TableCell>{item.dependent === null ? 'Adult' : 'Kid'}</TableCell>
                                            <TableCell>{item.dependent === null ? item.patient.nat_id_no : item.dependent.birth_cert_no}</TableCell>
                                            <TableCell>{item.vaccine.vaccine_name}</TableCell>
                                            <TableCell>{item.dose_no}</TableCell>
                                            <TableCell>{moment(item.date).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{formatTimeSlot(item.time)}</TableCell>
                                            <TableCell><span className={item.status.toLowerCase()}>{item.status}</span></TableCell>
                                            <TableCell>
                                                <div>
                                                    <button className='text-violet-800 rounded py-1.5 px-1 bg-violet-100 hover:bg-violet-300' onClick={() => handleEditClick(item.id)}>
                                                        <PencilSquareIcon className='w-5 h-5'/>
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
                    title='Change Status'
                >
                    <StatusUpdateForm/>
                </Popup>
                <Popup
                    openPopup={openPopup1}
                    setOpenPopup={setOpenPopup1}
                    title='Change Status'
                >
                    <StatusUpdate id={id}/>
                </Popup>
            </div>
        </>
    )
}
