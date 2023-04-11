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
import {MagnifyingGlassIcon, PlusIcon} from "@heroicons/react/24/solid";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import Popup from "@/components/Popup";
import HospitalForm from "@/components/hospital/HospitalForm";
import HospitalFormEdit from "@/components/hospital/HospitalFormEdit";
import {useEffect, useState} from "react";
import axios from "axios";
import DiseaseForm from "@/components/vaccine/DiseaseForm";
import DiseaseFormEdit from "@/components/vaccine/DiseaseFormEdit";


export default function Disease()
{
    const [data, setData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopupEdit, setOpenPopupEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [token1, setToken1] = useState(null);
    const [disease, setDisease] = useState(null);
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data?.filter(item => {
        return item?.disease_name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('adminToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin/disease/', {
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

    useEffect(() => {
        const userToken = localStorage.getItem('adminToken');
        setToken1(userToken);
    }, []);

    const handleEditClick = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/disease/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token1}`
                }
            });
            console.log(response.data);
            setDisease(response.data.data);
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
                        label='Search Disease'
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
                        <button className='border border-blue-700 text-blue-900 rounded py-2 px-2 hover:bg-blue-100  flex' onClick={()=>setOpenPopup(true)}><PlusIcon className='w-6 h-6'/> Add Disease</button>
                    </div>
                </Toolbar>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-violet-200">
                                    <TableCell className="font-bold text-violet-900">Disease Name</TableCell>
                                    <TableCell className="font-bold text-violet-900">Description</TableCell>
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
                                            <TableCell>{item.disease_name}</TableCell>
                                            <TableCell>{item.description}</TableCell>
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
                    title='Disease Form'
                >
                    <DiseaseForm/>
                </Popup>
                <Popup
                    openPopup={openPopupEdit}
                    setOpenPopup={setOpenPopupEdit}
                    title='Disease Edit Form'
                >
                    <DiseaseFormEdit data = {disease} />
                </Popup>
            </div>
        </div>
    )
}
