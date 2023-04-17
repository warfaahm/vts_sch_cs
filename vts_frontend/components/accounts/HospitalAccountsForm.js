import {useEffect, useState} from "react";
import axios from "axios";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";


export default function HospitalAccountsForm()
{
    const [token1, setToken1] = useState();
    const [data, setData] = useState();
    const [data1, setData1] = useState();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [counties, setCounties] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState('');
    const [subcounties, setSubcounties] = useState([]);
    const [selectedSubcounty, setSelectedSubcounty] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/hospital/county')
            .then(response => {
                const data = response.data.data;
                setCounties(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (selectedCounty) {
            axios.get(`http://127.0.0.1:8000/api/hospital/sub_county/${selectedCounty}`)
                .then(response => {
                    const data = response.data.data;
                    setSubcounties(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [selectedCounty]);

    useEffect(() => {
        if (selectedSubcounty) {
            axios.get(`http://127.0.0.1:8000/api/hospital/ward/${selectedSubcounty}`)
                .then(response => {
                    const data = response.data.data;
                    setWards(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [selectedSubcounty]);

    useEffect(() => {
        if (selectedWard) {
            axios.get(`http://127.0.0.1:8000/api/hospital/hospital/${selectedWard}`)
                .then(response => {
                    const data = response.data.data;
                    setHospitals(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [selectedWard]);

    const handleCountyChange = (event) => {
        setSelectedCounty(event.target.value);
        setSelectedSubcounty('');
        setSelectedWard('');
        setSelectedHospital('');
    };

    const handleSubcountyChange = (event) => {
        setSelectedSubcounty(event.target.value);
        setSelectedWard('');
        setSelectedHospital('');
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
        setSelectedHospital('');
    };

    const handleHospitalChange = (event) => {
        setSelectedHospital(event.target.value);
    };



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
            const response = await axios.post('http://127.0.0.1:8000/api/admin/provider',
                {

                    first_name: fname,
                    last_name: lname,
                    email: email,
                    password: password,
                    role: 'staff_admin',
                    hospital_id: selectedHospital,
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
                <div className="w-1/2 my-5">
                    <FormControl className='w-full'>
                        <InputLabel>Select County</InputLabel>
                        <Select value={selectedCounty} onChange={handleCountyChange}>

                            {(!counties || !Array.isArray(counties)) ? (
                                <MenuItem>No County</MenuItem>
                            ) : (
                                counties.map((county) => (
                                    <MenuItem key={county.id} value={county.id}>
                                        {county.county_name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>

                </div>
                <div className="w-1/2 my-5">
                    <FormControl className='w-full'>
                        <InputLabel>Select Sub County</InputLabel>
                        <Select value={selectedSubcounty} onChange={handleSubcountyChange} disabled={!selectedCounty}>

                            {(!subcounties || !Array.isArray(subcounties)) ? (
                                <MenuItem>No Sub County</MenuItem>
                            ) : (
                                subcounties.map((subcounty) => (
                                    <MenuItem key={subcounty.id} value={subcounty.id}>
                                        {subcounty.subCounty_name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>

                </div>
                <div className="w-1/2 my-5">
                    <FormControl className='w-full'>
                        <InputLabel>Select Ward</InputLabel>
                        <Select value={selectedWard} onChange={handleWardChange} disabled={!selectedSubcounty}>

                            {(!wards || !Array.isArray(wards)) ? (
                                <MenuItem>No Ward</MenuItem>
                            ) : (
                                wards.map((ward) => (
                                    <MenuItem key={ward.id} value={ward.id}>
                                        {ward.ward_name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div className="w-1/2 my-5">
                    <FormControl className='w-full'>
                        <InputLabel>Select Hospital</InputLabel>
                        <Select value={selectedHospital} onChange={handleHospitalChange} disabled={!selectedWard}>

                            {(!hospitals || !Array.isArray(hospitals)) ? (
                                <MenuItem>No Hospitals</MenuItem>
                            ) : (
                                hospitals.map((hospital) => (
                                    <MenuItem key={hospital.id} value={hospital.id}>
                                        {hospital.hospital_name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Submit</button>
                    <button type='reset' value='Reset' className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                </div>
            </Grid>
            <div>
                {data1 != null  && <h1 className="success-msg mt-2">{data1.data.message}</h1>}
            </div>
        </form>
    )
}
