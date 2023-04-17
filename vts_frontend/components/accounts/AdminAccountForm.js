import {useEffect, useState} from "react";
import axios from "axios";
import {Grid, TextField} from "@mui/material";


export default function AdminAccountForm()
{
    const [token1, setToken1] = useState();
    const [data, setData] = useState();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');




    const handleFNameChange = (event) => {
        setFname(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleLNameChange = (event) => {
        setLname(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    useEffect(() => {
        const userToken = localStorage.getItem('adminToken');
        setToken1(userToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/register',
                {

                    first_name: fname,
                    last_name: lname,
                    email: email,
                    password: password,
                    role: 'admin',
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
        }
    };

    return (
        <form className='m-2' onSubmit={handleSubmit}>
            <Grid container>
                <div className="w-full my-5">
                    <TextField variant='outlined' label='First Name' name='fname' id='fname' onChange={handleFNameChange} required/>
                </div>
                <div className="w-full my-5">
                    <TextField variant='outlined' label='Last Name' name='lname' id='lname' onChange={handleLNameChange} required/>
                </div>
                <div className="w-full my-5">
                    <TextField variant='outlined' label='Email' name='email' id='email' type='email' onChange={handleEmailChange} required/>
                </div>
                <div className="w-full my-5">
                    <TextField variant='outlined' label='Password' type='password' name='password' id='password' onChange={handlePasswordChange} required/>
                </div>
                <div>
                    <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Submit</button>
                    <button type='reset' value='Reset' className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                </div>
            </Grid>
            <div>
                {data != null  && <h1 className="success-msg mt-2">{data.message}</h1>}
            </div>
        </form>
    )
}
