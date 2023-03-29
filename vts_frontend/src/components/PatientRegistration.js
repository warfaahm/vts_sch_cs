import React from 'react';
import logo from "../assets/img/logo.png";

function PatientRegistration() {
    return (
        <div className="bg-white h-screen">
            <div className=" flex justify-center items-center">
                <div className="w-full max-w-md md:max-w-lg">
                    <div className="flex justify-between">
                        <div className="relative flex items-center">
                            <img src={logo} alt="logo" width="175" draggable="false"/>
                        </div>
                        <div className="relative flex items-center">
                            <a href="/login" className="create-btn">Already have an account? Login</a>
                        </div>
                    </div>
                    <div className="my-8 py-8 px-16 w-full shadow-2xl rounded-2xl">
                        <h1 className="font-bold text-2xl my-2">Patient Registration</h1>
                        <form method="POST">
                            <div class="grid gap-4 mb-2 md:grid-cols-2">
                                <div className="mb-2 w-full">
                                    <label htmlFor="first_name" className="label_1">First name</label>
                                    <input type="text" id="first_name" name="first_name" className="input_1"/>
                                </div>
                                <div className="mb-2 w-full">
                                    <label  htmlFor="last_name" className="label_1">Last name</label>
                                    <input type="text" id="last_name" name="last_name" className="input_1"/>
                                </div>
                                <div className="mb-2 w-full">
                                    <label htmlFor="id_no" className="label_1">ID Number</label>
                                    <input type="text" id="id_no" name="id_no" className="input_1"/>
                                </div>
                                <div className="mb-2 w-full">
                                    <label  htmlFor="phone_no" className="label_1">Phone No</label>
                                    <input type="text" id="phone_no" name="phone_no" className="input_1"/>
                                </div>
                            </div>
                            <div>
                                <h3 className="label_1">Gender</h3>
                                <div className="inline">
                                    <input type="radio" name="gender" id="gender" value="M" className="radio-form"/>
                                    <label className="mx-2">Male</label>
                                </div>
                                <div className="inline m-4">
                                    <input type="radio" name="gender" id="gender" value="F" className="radio-form"/>
                                    <label className="mx-2">Female</label>
                                </div>
                            </div>
                            <div className="my-4 w-full">
                                <label htmlFor="dob" className="label_1">Date of birth</label>
                                <input type="date" id="dob" name="dob" className="input_1"/>
                            </div>
                            <div>
                                <label  htmlFor="allergy" className="label_1">Allergy</label>
                                <input type="text" id="allergy" name="allergy" className="input_1"/>
                            </div>
                            <div className="my-4 w-full">
                                <label htmlFor="email" className="label_1">Email</label>
                                <input type="email" id="email" name="email" className="input_1"/>
                            </div>
                            <div>
                                <label  htmlFor="password" className="label_1">Password</label>
                                <input type="password" id="password" name="password" className="input_1"/>
                            </div>
                            <div>
                                <label  htmlFor="password_confirmation" className="label_1">Confirm Password</label>
                                <input type="password" id="password_confirmation" name="password_confirmation" className="input_1"/>
                            </div>
                            <div className="my-2">
                                <div className="inline">
                                    <input type="checkbox" id="remember" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required/>
                                </div>
                                <label htmlFor="remember" className="mx-2 text-xs inline">Creating your account and you accepting <a href="#" className="text-blue-800">Terms & Condition</a></label>
                            </div>
                            <div>
                                <button type="submit" className="login-btn">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientRegistration;