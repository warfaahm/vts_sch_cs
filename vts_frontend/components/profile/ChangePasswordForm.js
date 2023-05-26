import {useEffect, useState} from "react";
import axios from "axios";
import {Grid, TextField} from "@mui/material";


export default function ChangePasswordForm()
{
    const [token1, setToken1] = useState();
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [password, setPassword] = useState('');
    const [password_confirmation, setCPassword] = useState('');
    const [curPassword, setCurPassword] = useState('');


    useEffect(() => {
        const userToken = localStorage.getItem('adminToken');
        setToken1(userToken);
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setData(null);
        setError(null);
        try {
            const response = await axios.patch('http://127.0.0.1:8000/api/admin/auth/password',
                {
                    current_password: curPassword,
                    password: password,
                    password_confirmation: password_confirmation,
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
            setError(error.response.data)
            console.error(error);
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCPasswordChange = (event) => {
        setCPassword(event.target.value);
    };
    const handleCurPasswordChange = (event) => {
        setCurPassword(event.target.value);
    };

    return(
        <form onSubmit={handleSubmit}>
            <Grid container>
                <div className="w-full my-5">
                    <TextField label="Current Password" type="password" id="password" name="password" error={error?.errors?.current_password !== undefined} helperText={error?.errors?.current_password} className="w-full" onChange={(event) => handleCurPasswordChange(event)} required/>
                </div>

                <div className="w-full my-5">
                    <TextField label="New Password" type="password" id="password" name="password" error={error?.errors?.password !== undefined} helperText={error?.errors?.password} className="w-full" onChange={handlePasswordChange} required/>
                </div>

                <div className="w-full my-5">
                    <TextField label="Confirm new Password" type="password" id="password_confirmation" name="password_confirmation" error={error?.errors?.password_confirmation !== undefined} helperText={error?.errors?.password_confirmation} className="w-full" onChange={handleCPasswordChange} required/>
                </div>

                <div>
                    {error != null  && <h1 className="error-msg w-full">Error: {error.message}</h1>}
                </div>
                <br/>
                <div>
                    {data != null  && <h1 className="success-msg w-full">{data.message}</h1>}
                </div>
                <div>
                    <button className="login-btn" type="submit">Change</button>
                </div>
            </Grid>
        </form>
    )
}
