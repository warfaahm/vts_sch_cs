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
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import Popup from "@/components/Popup";
import HospitalForm from "@/components/hospital/HospitalForm";
import HospitalFormEdit from "@/components/hospital/HospitalFormEdit";
import VaccineForm from "@/components/vaccine/VaccineForm";
import VaccineView from "@/components/vaccine/VaccineView";
import VaccineFormEdit from "@/components/vaccine/VaccineFormEdit";


export default function Vaccines()
{
    const [data, setData] = useState(null);
    const [vaccine, setVaccine] = useState(null);
    const [vaccine1, setVaccine1] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopupView, setOpenPopupView] = useState(false);
    const [openPopupEdit, setOpenPopupEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [token1, setToken1] = useState(null);
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data?.filter(item => {
        return item?.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('adminToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    useEffect(() => {
        const userToken = localStorage.getItem('adminToken');
        setToken1(userToken);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin/vaccine/', {
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

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/vaccine/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token1}`
                }
            });
            console.log(response.data);
            setVaccine(response.data.data);
            setOpenPopupView(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleClick();
    }, [token1]);

    const handleEditClick = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/vaccine/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token1}`
                }
            });
            console.log(response.data);
            setVaccine1(response.data.data);
            setOpenPopupEdit(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className='bg-blue-50 px-4 py-6 rounded-lg mt-4'>
                <Toolbar className='mb-2 flex justify-between'>
                    <TextField
                        variant='outlined'
                        label='Search Vaccine'
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
                        <button className='border border-blue-700 text-blue-900 rounded py-2 px-2 hover:bg-blue-100  flex' onClick={()=>setOpenPopup(true)}><PlusIcon className='w-6 h-6'/> Add Vaccine</button>
                    </div>
                </Toolbar>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-violet-200">
                                    <TableCell className="font-bold text-violet-900">Vaccine Name</TableCell>
                                    <TableCell className="font-bold text-violet-900">Description</TableCell>
                                    <TableCell className="font-bold text-violet-900">Dosage</TableCell>
                                    <TableCell className="font-bold text-violet-900">Disease</TableCell>
                                    <TableCell className="font-bold text-violet-900">Age Range</TableCell>
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
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.manufacturer}</TableCell>
                                            <TableCell>{item.dosage}</TableCell>
                                            <TableCell>{item.disease.map((dis) => (
                                                <div>{dis.disease_name}</div>
                                            ))}</TableCell>
                                            <TableCell>{item.age_range}</TableCell>
                                            <TableCell>
                                                <div className='flex'>
                                                    <button className='text-violet-800 rounded py-1.5 px-1 bg-violet-100 hover:bg-violet-300 flex' onClick={() => handleEditClick(item.id)}>
                                                        <PencilSquareIcon className='w-5 h-5'/>
                                                        <h1>Edit</h1>
                                                    </button>
                                                    <button className='text-green-800 rounded py-1.5 px-1 bg-green-100 hover:bg-green-300 ml-2 flex' onClick={() => handleClick(item.id)}>
                                                        <ArrowsPointingOutIcon className='w-5 h-5'/>
                                                        <h1>Expand</h1>
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
                    title='Vaccine Form'
                >
                    <VaccineForm/>
                </Popup>
                <Popup
                    openPopup={openPopupEdit}
                    setOpenPopup={setOpenPopupEdit}
                    title='Vaccine Edit Form'
                >
                    <VaccineFormEdit data={vaccine1} />
                </Popup>
                <Popup
                    openPopup={openPopupView}
                    setOpenPopup={setOpenPopupView}
                    title='Vaccine View'
                >
                    <VaccineView data={vaccine} />
                </Popup>
            </div>
        </div>
    )
}
