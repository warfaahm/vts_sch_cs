import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel, MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment/moment";


export default function HospitalForm()
{
    const [token1, setToken1] = useState();
    const [data, setData] = useState();

    const [hname, setHname] = useState('');
    const [slot, setSlot] = useState(5);
    const [address, setAdress] = useState('');
    const [phone, setPhone] = useState('');

    const [counties, setCounties] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState('');
    const [subcounties, setSubcounties] = useState([]);
    const [selectedSubcounty, setSelectedSubcounty] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');


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

    const handleCountyChange = (event) => {
        setSelectedCounty(event.target.value);
        setSelectedSubcounty('');
        setSelectedWard('');
    };

    const handleSubcountyChange = (event) => {
        setSelectedSubcounty(event.target.value);
        setSelectedWard('');
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
    };

    const handleHNameChange = (event) => {
        setHname(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAdress(event.target.value);
    };

    const handleSlotChange = (event) => {
        setSlot(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    useEffect(() => {
        const userToken = localStorage.getItem('adminToken');
        setToken1(userToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/hospital',
                {

                    ward_id: selectedWard,
                    hospital_name: hname,
                    slots: slot,
                    phone_no: phone,
                    address: address,
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
                <Grid item xs={6}>
                    <div className="w-full my-5">
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
                    <div className="w-full my-5">
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
                    <div className="w-full my-5">
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
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Hospital Name' name='name' id='name' onChange={handleHNameChange} required/>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Address' name='address' id='address' onChange={handleAddressChange} required/>
                    </div>
                    <div>
                        <TextField variant='outlined' label='Phone No' name='phone_no' id='phone_no' onChange={handlePhoneChange} required/>
                    </div>
                    <div>
                        <TextField variant='outlined' type='number' label='Slot no' name='slots' id='slots' onChange={handleSlotChange}/>
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
