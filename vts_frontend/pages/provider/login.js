import Head from "next/head";
import Image from "next/image";
import {TextField} from "@mui/material";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";


export default function AdminLogin(){

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/staff/login', {
                email,
                password,
            });
            console.log(response.data);
            setData(response.data);
            const token = response.data.data.token;
            localStorage.setItem('staffToken', token);
            console.log(token);
            router.push('/provider/');
        } catch (error) {
            setError(error.response.data)
            console.error(error);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return(
        <>
            <Head>
                <title>Provider Login | VTS</title>
            </Head>
            <main className="bg-white">
                <div className="h-screen flex items-center justify-center">
                    <div className="w-full max-w-md md:max-w-lg ">
                        <div className="flex justify-center">
                            <div className="relative flex items-center">
                                <Image src="/images/logo.png" width="150" height="150" alt="logo" draggable="false"/>
                            </div>
                        </div>
                        <div className="my-8 py-8 px-16 w-full shadow-2xl rounded-2xl">
                            <h1 className="font-bold text-2xl my-2">Provider Account</h1>
                            <h2 className="font-light text-2xl my-2">Login to your account</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="w-full my-5">
                                    <TextField label="Email" type="email" id="email" name="email" error={error?.errors?.email !== undefined} helperText={error?.errors?.email} className="w-full" onChange={handleEmailChange} required/>
                                </div>
                                <div className="w-full my-5">
                                    <TextField label="Password" type="password" id="password" name="password" error={error?.errors?.password !== undefined} helperText={error?.errors?.password} className="w-full" onChange={handlePasswordChange} required/>
                                </div>
                                <div>
                                    {error != null  && <h1 className="error-msg">Error: {error.message}</h1>}
                                </div>
                                <div>
                                    <button className="login-btn">Login</button>
                                </div>
                            </form>
                            {/*<div className="flex justify-end my-4">*/}
                            {/*    <Link href="/provider/reset" className="font-semibold underline underline-offset-2">Forgot your password?</Link>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}