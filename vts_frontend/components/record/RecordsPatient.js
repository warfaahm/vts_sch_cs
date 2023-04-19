import {useState, useEffect} from "react";
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
import moment from "moment/moment";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import axios from "axios";
import DependentForm from "@/components/dependents/DependentForm";
import Popup from "@/components/Popup";
import RecordPatientPop from "@/components/record/RecordPatientPop";
import PatientRecordPDF from "@/components/pdf/PatientRecordPDF";


export default function RecordsPatient()
{

    const [data, setData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [report, setReport] = useState(null);
    const [profile, setProfile] = useState(null);

    const [token1, setToken1] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data?.filter(item => {
        return item?.vaccine?.vaccine_name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setToken1(userToken);
    }, []);

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('userToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user/record/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token1}`
                }
            });
            console.log(response.data);
            setReport(response.data.data);
            setOpenPopup(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleClick();
    }, [token1]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/record/', {
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

    const fetchData1 = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setProfile(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData1();
    }, [token]);

    return (
        <>
            <div className='bg-blue-50 px-4 py-6 rounded-lg mt-4'>
                <div><PatientRecordPDF data={data} profile={profile}/></div>
                <Toolbar className='mb-2 flex justify-between'>
                    <TextField
                        variant='outlined'
                        label='Search by vaccine name'
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
                </Toolbar>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-violet-200">
                                    <TableCell className="font-bold text-violet-900">Vaccine Name</TableCell>
                                    <TableCell className="font-bold text-violet-900">Date Administered</TableCell>
                                    <TableCell className="font-bold text-violet-900">Dose No</TableCell>
                                    <TableCell className="font-bold text-violet-900">Next Dose Date</TableCell>
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
                                            <TableCell>{item.vaccine.vaccine_name}</TableCell>
                                            <TableCell>{moment(item.date).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{item.dose_no}</TableCell>
                                            <TableCell>{item.next_date}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <button className='text-green-800 rounded py-1.5 px-1 bg-green-100 hover:bg-green-300 ml-4' onClick={() => handleClick(item.id)} >
                                                        <ArrowsPointingOutIcon className='w-5 h-5'/>
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
                    title='Record Info'
                >
                    <RecordPatientPop data={report}/>
                </Popup>
            </div>
        </>
    )
}

