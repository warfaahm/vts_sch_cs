import Head from "next/head";
import DependentForm from "@/components/dependents/DependentForm";
import {MagnifyingGlassIcon, PlusIcon, QrCodeIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, TextField,
    Toolbar,
    InputAdornment
} from "@mui/material";
import PageHeader from "@/components/PageHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "@/components/Popup";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import moment from "moment";
import DependentFormEdit from "@/components/dependents/DependentFormEdit";
import QRCode from "qrcode.react";
import QRCodeGenerate from "@/components/qrcode/QRCodeGenerate";


export default function PatientDependent() {
    const [data, setData] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [openPopupEdit, setOpenPopupEdit] = useState(false);
    const [dependent, setDependent] = useState(null);
    const [name1, setName] = useState(null);
    const [birthID, setBirthID] = useState(null);

    const [token1, setToken1] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data?.filter(item => {
        return item?.first_name.toLowerCase().includes(searchTerm.toLowerCase());
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

    const handleEditClick = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user/dependent/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token1}`
                }
            });
            console.log(response.data);
            setDependent(response.data.data);
            setOpenPopupEdit(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleEditClick();
    }, [token]);

    const handleQR = (name2, id2) => {
        setName(name2);
        setBirthID(id2);
        setOpenPopup1(true);
    }

    // api for dependents
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/dependent/', {
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

    return (
        <>
            <Head>
                <title>Dashboard - Dependent | VTS</title>
            </Head>
            <main>
                <PageHeader
                    icon={<UserPlusIcon className='page-header' />}
                    title="Dependent"
                    description="Add and edit dependents"
                />
                <div className='bg-blue-50 px-4 py-6 rounded-lg mt-4'>
                    <Toolbar className='mb-2 flex justify-between'>
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
                            <button className='border border-blue-700 text-blue-900 rounded py-2 px-2 hover:bg-blue-100  flex' onClick={()=>setOpenPopup(true)}><PlusIcon className='w-6 h-6'/> Add Dependent</button>
                        </div>
                    </Toolbar>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow className="bg-violet-200">
                                        <TableCell className="font-bold text-violet-900">Name</TableCell>
                                        <TableCell className="font-bold text-violet-900">DOB</TableCell>
                                        <TableCell className="font-bold text-violet-900">Gender</TableCell>
                                        <TableCell className="font-bold text-violet-900">Birth Cert No</TableCell>
                                        <TableCell className="font-bold text-violet-900">Allergy</TableCell>
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
                                                <TableCell>{item.first_name+ '  '+item.last_name}</TableCell>
                                                <TableCell>{moment(item.dob).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{item.gender === 'M' ? 'Male' : 'Female'}</TableCell>
                                                <TableCell>{item.birth_cert_no}</TableCell>
                                                <TableCell>{item.allergy}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <button className='text-violet-800 rounded py-1.5 px-1 bg-violet-100 hover:bg-violet-300' onClick={() => handleEditClick(item.id)}>
                                                            <PencilSquareIcon className='w-5 h-5'/>
                                                        </button>
                                                        <button className='text-green-800 rounded py-1.5 px-1 bg-green-100 hover:bg-green-300 ml-4' onClick={() => handleQR(item.last_name, item.birth_cert_no)}>
                                                            <QrCodeIcon className='w-5 h-5'/>
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
                        title='Dependent Form'
                    >
                        <DependentForm/>
                    </Popup>
                    <Popup
                        openPopup={openPopupEdit}
                        setOpenPopup={setOpenPopupEdit}
                        title='Dependent Edit Form'
                    >
                        <DependentFormEdit data={dependent}/>
                    </Popup>
                    <Popup
                        openPopup={openPopup1}
                        setOpenPopup={setOpenPopup1}
                        title='QR Code'
                    >
                        <QRCodeGenerate name={name1} id={birthID}/>
                    </Popup>
                </div>
            </main>
        </>
    )
}
