import {useEffect, useState} from "react";
import axios from "axios";
import {Grid, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


export default function RescheduleForm(props)
{
    const {id} = props;
    const [date, setDate] = useState(null);
    const [token1, setToken1] = useState(null);
    const [data1, setData1] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setToken1(userToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/user/appointment/${id}`,
                {
                    status: 'Pending',
                    date: date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token1}`,

                    },
                }
            );
            console.log(response.data);
            setData1(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Grid container>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TextField label="Date"  id="date" type='date' name="date"  onChange={handleDateChange}/>
                        </LocalizationProvider>
                    </Grid>
                </div>
                <div className='mt-2'>
                    <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Reschedule</button>
                </div>
            </form>
        </div>
    )
}
