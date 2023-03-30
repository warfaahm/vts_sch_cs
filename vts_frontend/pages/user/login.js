import Head from "next/head";
import Image from "next/image";
import {TextField} from "@mui/material";
import Link from "next/link";
import {useState} from "react";


export default function PatientLogin(){

    return(
        <>
            <Head>
                <title>Patient Login | VTS</title>
            </Head>
            <main className="bg-white">
                <div className="h-screen flex items-center justify-center">
                    <div className="w-full max-w-md md:max-w-lg ">
                        <div className="flex justify-between">
                            <div className="relative flex items-center">
                                <Image src="/images/logo.png" width="150" height="150" alt="logo" draggable="false"/>
                            </div>
                            <div className="relative flex items-center">
                                <Link href="/user/register" className="bg-blue-600 hover:bg-blue-800 py-2 px-3 rounded-lg text-white">Create account</Link>
                            </div>
                        </div>
                        <div className="my-8 py-8 px-16 w-full shadow-2xl rounded-2xl">
                            <h1 className="font-bold text-2xl my-2">Patient Account</h1>
                            <h2 className="font-light text-2xl my-2">Login to your account</h2>
                            <form method="POST">
                                <div className="w-full my-5">
                                    <TextField label="Email" type="email" id="email" name="email"  className="w-full" required/>
                                </div>
                                <div className="w-full my-5">
                                    <TextField label="Password" type="password" id="password" name="password" className="w-full" required/>
                                </div>
                                <div>
                                    <button className="login-btn" type="submit">Login</button>
                                </div>
                            </form>
                            <div className="flex justify-end my-4">
                                <Link href="/user/reset" className="font-semibold underline underline-offset-2">Forgot your password?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}