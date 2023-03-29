import React from 'react';
import logo from "../assets/img/logo.png";

function ProviderLogin() {
    document.title = "Provider Login | VTS";
    return (
        <div>
            <div className="h-full flex justify-center items-center">
                <div className="w-full max-w-md md:max-w-lg">
                    <div className="flex justify-center">
                        <div className="relative flex items-center">
                            <img src={logo} alt="logo" width="175" draggable="false"/>
                        </div>
                    </div>
                    <div className="my-8 py-8 px-16 w-full shadow-2xl rounded-2xl">
                        <h1 className="font-bold text-2xl my-2">Sign in to your account</h1>
                        <form method="POST">
                            <div className="my-4 w-full">
                                <label htmlFor="email" className="label_1">Email</label>
                                <input type="email" id="email" name="email" className="input_1" required/>
                            </div>
                            <div>
                                <label  htmlFor="password" className="label_1">Password</label>
                                <input type="password" id="password" name="password" className="input_1" required/>
                            </div>
                            <div>
                                <button type="submit" className="login-btn">Login</button>
                            </div>
                        </form>
                        <div className="flex justify-end my-4">
                            <a href="/forgot_password" className="font-semibold underline underline-offset-2">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProviderLogin;