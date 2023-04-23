import {useState, useEffect} from "react";

import {FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import moment from "moment";

const initialValues = {
    first_name: '',
    last_name: '',
    birth_cert_no: '',
    gender: 'M',
    allergy: 'N/A',
    dob: '',
    relationship: '',
}

export default function DependentForm(){

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    const [values, setValues] =  useState(initialValues);
    const [token, setToken] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setToken(userToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/dependent',
                {
                    dob: moment(values.dob).format('YYYY-MM-DD'),
                    first_name: values.first_name,
                    last_name: values.last_name,
                    birth_cert_no: values.birth_cert_no,
                    gender: values.gender,
                    allergy: values.allergy,
                    relationship: values.relationship
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                }
            );
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log(error);
            setError(error.response.data)
        }
    };


    // useEffect(() => {
    //     handleSubmit();
    // }, [token]);

    return (
        <form className='m-2' onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='First name' name='first_name' id='first_name' error={error?.errors?.first_name !== undefined} helperText={error?.errors?.first_name} onChange={(e) => setValues({...values, first_name: e.target.value})} required/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Birth Cert no' name='birth_cert_no' id='birth_cert_no' error={error?.errors?.birth_cert_no !== undefined} helperText={error?.errors?.birth_cert_no} onChange={(e) => setValues({...values, birth_cert_no: e.target.value})} required/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Allergy' name='allergy' id='allergy' error={error?.errors?.allergy !== undefined} helperText={error?.errors?.allergy} onChange={(e) => setValues({...values, allergy: e.target.value})} />
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Relationship' name='relationship' id='relationship' error={error?.errors?.relationship !== undefined} helperText={error?.errors?.relationship} onChange={(e) => setValues({...values, relationship: e.target.value})} required/>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Last name' name='last_name' id='last_name' error={error?.errors?.last_name !== undefined} helperText={error?.errors?.last_name} onChange={(e) => setValues({...values, last_name: e.target.value})} required/>
                    </div>
                    <div>
                        <FormControl required>
                            <FormLabel id="gender" name="gender">Gender</FormLabel>
                            <RadioGroup name="gender" className="inline" onChange={(e) => setValues({...values, gender: e.target.value})} required >
                                <FormControlLabel value="M" control={<Radio />} label="Male" />
                                <FormControlLabel value="F" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="w-full my-5">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TextField type='date' label="Date of Birth"  id="dob" name="dob" disableFuture error={error?.errors?.dob !== undefined} helperText={error?.errors?.dob} onChange={(e) => setValues({...values, dob: e.target.value})} required/>
                        </LocalizationProvider>
                    </div>
                    <div>
                        <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Submit</button>
                        <button type='reset' value='Reset' className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                    </div>
                </Grid>
            </Grid>
            <div>
                {data != null  && <h1 className="success-msg">{data.status}</h1>}
            </div>
        </form>
    )
}
