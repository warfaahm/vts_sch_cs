import {FormControl, Grid, InputLabel, TextField, Select, MenuItem} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useEffect, useState} from "react";
import axios from "axios";


export default function StatusUpdate(props)
{
    const {id} = props;
    const [data, setData] = useState(null);
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const [token1, setToken1] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem('staffToken');
        setToken1(userToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/staff/appointment/${id}`,
                {
                    status: status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token1}`,

                    },
                }
            );
            console.log(response.data);
            setData(response.data);
            console.log(date);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid>
                    <div className='mt-2'>
                        <FormControl className='w-full'>
                            <InputLabel>Select Status</InputLabel>
                            <Select label='status' value={status} onChange={handleStatusChange} >
                                <MenuItem value='Completed'>Completed</MenuItem>
                                <MenuItem value='Please_Reschedule'>Please Reschedule</MenuItem>
                                <MenuItem value='No_Show'>No Show</MenuItem>
                                <MenuItem value='Confirmed'>Confirmed</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mt-2'>
                        <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Update</button>
                    </div>
                </Grid>
                <div className='mt-2'>
                    {data != null  && <h1 className="success-msg">{data.status}</h1>}
                </div>
            </form>
        </div>
    )
}
