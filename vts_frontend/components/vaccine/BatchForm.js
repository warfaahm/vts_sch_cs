import {useEffect, useState} from "react";
import axios from "axios";
import {Grid, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


export default function BatchForm(props)
{
    const {id} = props;
    const [token1, setToken1] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState();

    const [lot_no, setLot] = useState('');
    const [size, setSize] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState(null);

    const handleLotChange = (event) => {
        setLot(event.target.value);
    };
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };
    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };
    const handleDateChange = (event) => {
        setDate(event?.target.value);
    };


    useEffect(() => {
        const userToken = localStorage.getItem('adminToken');
        setToken1(userToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setData(null);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/batch',
                {

                    lot_number: lot_no,
                    size: size,
                    expiry_date: date,
                    notes: notes,
                    vaccine_id: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token1}`,

                    },
                }
            );
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };

    return (
        <div>
            <form className='m-2' onSubmit={handleSubmit}>
                <Grid container className='flex'>
                    <Grid item xs={6} className='mr-2'>
                        <div className='mb-2'>
                            <TextField label='Lot No'  onChange={handleLotChange} required/>
                        </div>
                        <div className='mb-2'>
                            <TextField label='Batch Size' type='number' onChange={handleSizeChange} required/>
                        </div>
                        <div className='mb-2'>
                            <TextField label='Notes'  onChange={handleNotesChange}/>
                        </div>
                        <div className="w-full my-5">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TextField type='date' label="Expiry Date"  id="date" name="date" disableFuture error={error?.errors?.expiry_date !== undefined} helperText={error?.errors?.expiry_date} onChange={handleDateChange} required/>
                            </LocalizationProvider>
                        </div>
                        <div className='mb-2'>
                            <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3 mb-2' >Submit</button>
                            <button type='reset' value='Reset' className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                        </div>
                    </Grid>
                </Grid>
            </form>
            <div>
                {data != null  && <h1 className="success-msg mt-2">{data.message}</h1>}
            </div>
            <div>
                {error != null  && <h1 className="error-msg mt-2">{error.response.data.message}</h1>}
            </div>
        </div>
    )
}
