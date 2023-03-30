import Head from "next/head";
import Image from "next/image";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import Link from "next/link";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useState} from "react";
import axios from "axios";
import moment from "moment";

export default function Register(){

    const [first_name, setFName] = useState('');
    const [last_name, setLName] = useState('');
    const [id_no, setId] = useState('');
    const [phone_no, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('2000/08/08');
    const [allergy, setAllergy] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setCPassword] = useState('');

    const dob1 = new Date(dob);
    const formattedDob = dob1.toLocaleDateString('en-US');
    const formattedDate = moment(formattedDob, 'M/D/YYYY').format('YYYY-MM-DD');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/register', {
                first_name,
                last_name,
                nat_id_no: id_no,
                phone_no,
                gender,
                dob: formattedDate,
                allergy,
                email,
                password,
                password_confirmation,
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const handleFNameChange = (event) => {
        setFName(event.target.value);
    };

    const handleLNameChange = (event) => {
        setLName(event.target.value);
    };

    const handleIDChange = (event) => {
        setId(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleDobChange = (date) => {
        setDob(date);
    };

    const handleAllergyChange = (event) => {
        setAllergy(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCPasswordChange = (event) => {
        setCPassword(event.target.value);
    };

    return(
        <>
            <Head>
                <title>Patient Register | VTS</title>
            </Head>
            <main className="bg-white">
                <div className=" flex items-center justify-center">
                    <div className="w-full max-w-md md:max-w-lg ">
                        <div className="flex justify-between">
                            <div className="relative flex items-center">
                                <Image src="/images/logo.png" width="150" height="150" alt="logo" draggable="false"/>
                            </div>
                            <div className="relative flex items-center">
                                <Link href="/user/login" className="bg-blue-600 hover:bg-blue-800 py-2 px-3 rounded-lg text-white">Already have an account? Login</Link>
                            </div>
                        </div>
                        <div className="my-8 py-8 px-16 w-full shadow-2xl rounded-2xl">
                            <h1 className="font-bold text-2xl my-2">Register Patient</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="w-full my-2">
                                        <TextField label="First name" type="text" id="first_name" name="first_name"  className="w-full" onChange={handleFNameChange} required/>
                                    </div>

                                    <div className="w-full my-2">
                                        <TextField label="Last name" type="text" id="last_name" name="last_name" className="w-full" onChange={handleLNameChange} required/>
                                    </div>

                                    <div className="w-full my-2">
                                        <TextField label="ID Number" type="text" id="id_no" name="id_no"  className="w-full" onChange={handleIDChange} required/>
                                    </div>

                                    <div className="w-full my-2">
                                        <TextField label="Phone number" type="text" id="phone_no" name="phone_no" className="w-full" onChange={handlePhoneChange} required/>
                                    </div>
                                </div>
                                <div>
                                    <FormControl required>
                                        <FormLabel id="gender">Gender</FormLabel>
                                        <RadioGroup name="gender" className="inline" onChange={handleGenderChange}>
                                            <FormControlLabel value="M" control={<Radio />} label="Male" />
                                            <FormControlLabel value="F" control={<Radio />} label="Female" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <div className="w-full my-5">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Date of Birth"  id="dob" name="dob" format="YYYY-MM-DD" className="w-full" onChange={handleDobChange} required/>
                                    </LocalizationProvider>
                                </div>

                                <div className="w-full my-5">
                                    <TextField label="Allergy" type="text" id="password" name="password" className="w-full" onChange={handleAllergyChange}/>
                                </div>

                                <div className="w-full my-5">
                                    <TextField label="Email" type="email" id="email" name="email"  className="w-full" onChange={handleEmailChange} required/>
                                </div>

                                <div className="w-full my-5">
                                    <TextField label="Password" type="password" id="password" name="password" className="w-full" onChange={handlePasswordChange} required/>
                                </div>

                                <div className="w-full my-5">
                                    <TextField label="Confirm Password" type="password" id="password_confirmation" name="password_confirmation" className="w-full" onChange={handleCPasswordChange} required/>
                                </div>

                                <div>
                                    <button className="login-btn" type="submit">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}