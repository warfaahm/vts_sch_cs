import {useState, useEffect} from "react";

import Head from "next/head";
import {FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {Button as MuiButton} from "@mui/material";

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

    const [values, setValues] =  useState(initialValues);

    return (
        <form className='m-2 max-w-xl '>
            <Grid container>
                <Grid item xs={6}>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='First name' name='first_name' id='first_name' value={values.first_name}/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Birth Cert no' name='birth_cert_no' id='birth_cert_no' value={values.birth_cert_no}/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Allergy' name='allergy' id='allergy' value={values.allergy}/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Relationship' name='relationship' id='relationship' value={values.relationship}/>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Last name' name='last_name' id='last_name' value={values.last_name}/>
                    </div>
                    <div>
                        <FormControl required>
                            <FormLabel id="gender" name="gender">Gender</FormLabel>
                            <RadioGroup name="gender" className="inline" >
                                <FormControlLabel value="M" control={<Radio />} label="Male" />
                                <FormControlLabel value="F" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="w-full my-5">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Date of Birth"  id="dob" name="dob" format="YYYY-MM-DD"  required/>
                        </LocalizationProvider>
                    </div>
                    <div>
                        <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3'>Submit</button>
                        <button className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}