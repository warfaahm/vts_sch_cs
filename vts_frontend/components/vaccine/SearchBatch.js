import moment from "moment/moment";
import {
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Toolbar
} from "@mui/material";
import {MagnifyingGlassIcon, PlusIcon} from "@heroicons/react/24/solid";
import Popup from "@/components/Popup";
import AddPatientRecord from "@/components/record/AddPatientRecord";
import {useState} from "react";
import BatchForm from "@/components/vaccine/BatchForm";


export default function SearchBatch(props)
{
    const {data, id} = props;
    const [openPopup, setOpenPopup] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data?.filter(item => {
        return item?.lot_number.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <div className='bg-blue-50 px-4 py-6 rounded-lg mt-4'>
                <Toolbar className='mb-2 flex justify-between'>
                    <TextField
                        variant='outlined'
                        label='Search by Lot Number'
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
                        <button className='border border-blue-700 text-blue-900 rounded py-2 px-2 hover:bg-blue-100  flex' onClick={()=>setOpenPopup(true)}><PlusIcon className='w-6 h-6'/> Add Batch</button>
                    </div>
                </Toolbar>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-violet-200">
                                    <TableCell className="font-bold text-violet-900">Lot Number</TableCell>
                                    <TableCell className="font-bold text-violet-900">Batch Size</TableCell>
                                    <TableCell className="font-bold text-violet-900">Expiry Date</TableCell>
                                    <TableCell className="font-bold text-violet-900">Notes</TableCell>
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
                                            <TableCell>{item.lot_number}</TableCell>
                                            <TableCell>{item.size}</TableCell>
                                            <TableCell>{moment(item.expiry_date).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{item.notes}</TableCell>
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
                    title='Add Batch'
                >
                    <BatchForm id = {id} />
                </Popup>
            </div>
        </div>
    )
}
