import {useState, useEffect} from "react";

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    Select,
    TextField,
    MenuItem, TableRow, TableCell
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import moment from "moment";


const initialValues = {
    dependent_id: null,
    date: '',
    time: '',
    dose_no: '',
    vaccine_id: '',
    hospital_id: '',
    status: 'confirmed',
}

export default function AppointmentForm(){

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    const [values, setValues] =  useState(initialValues);
    const [token1, setToken1] = useState(null);
    const [data, setData] = useState(null);
    const [dependent, setDependent] = useState(null);
    const [date, setDate] = useState(null);
    const [dose, setDose] = useState(null);
    const [time, setTime] = useState(null);
    const [data1, setData1] = useState(null);


    const [counties, setCounties] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState('');
    const [subcounties, setSubcounties] = useState([]);
    const [selectedSubcounty, setSelectedSubcounty] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState('');

    const [diseases, setDiseases] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState('');
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState('');
    const [selectedDependent, setSelectedDependent] = useState(null);

    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');

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

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/hospital/disease')
            .then(response => {
                const data = response.data.data;
                setDiseases(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (selectedDisease) {
            axios.get(`http://127.0.0.1:8000/api/hospital/vaccine/${selectedDisease}`)
                .then(response => {
                    const data = response.data.data;
                    setVaccines(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [selectedDisease]);

    useEffect(() => {
        if (selectedHospital, date) {
            axios.post(`http://127.0.0.1:8000/api/hospital/appointment/`,
                {
                    hospital_id: selectedHospital,
                    date: moment(date).format('YYYY-MM-DD'),
                },
                )
                .then(response => {
                    const data = response.data.data;
                    setSlots(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [selectedHospital, date]);

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

    const handleDiseaseChange = (event) => {
        setSelectedDisease(event.target.value);
        setSelectedVaccine('');
    };

    const handleVaccineChange = (event) => {
        setSelectedVaccine(event.target.value);
    };

    const handleSlotChange = (event) => {
        setSelectedSlot(event.target.value);
    };

    const handleDependentChange = (event) => {
        setSelectedDependent(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleDoseChange = (event) => {
        setDose(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setToken1(userToken);
    }, []);

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('userToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    // for dependent select field
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/dependent/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setDependent(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data2 = {
                date: moment(date).format('YYYY-MM-DD'),
                dose_no: dose,
                hospital_id: selectedHospital,
                vaccine_id: selectedVaccine,
                time: selectedSlot,
                status: 'Pending',
            };

            if (selectedDependent != null) {
                data.dependent_id = selectedDependent;
            }
            const response = await axios.post('http://127.0.0.1:8000/api/user/appointment', data2,
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

    // useEffect(() => {
    //     handleSubmit();
    // }, [token]);

    // for dependent or self
    const [selectedOption, setSelectedOption] = useState('');
    const [showTextField, setShowTextField] = useState(false);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setShowTextField(event.target.value === 'kids');
        if (event.target.value === 'Self')
        {
            setSelectedDependent(null);
        }
    };

    function formatTimeSlot(timeSlot) {
        const hour = parseInt(timeSlot.split('.')[0]);
        const minute = parseInt(timeSlot.split('.')[1]) === 1 ? '00' : '30';
        return `${hour}:${minute}`;
    }

    return (
        <form className='m-2' onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6} className='mr-2'>
                    <div>
                        <FormControl required>
                            <FormLabel id="appointment" name="appointment">Appointment For</FormLabel>
                            <RadioGroup name="appointment" className="inline" value={selectedOption} onChange={handleOptionChange} required >
                                <FormControlLabel value='null' control={<Radio />} label="Self" />
                                <FormControlLabel value='kids' control={<Radio />} label="Dependent" />
                            </RadioGroup>
                            {showTextField && (
                                <FormControl>
                                    <InputLabel>Select Dependent</InputLabel>
                                    <Select label='dependent' value={selectedDependent} onChange={handleDependentChange} >

                                        {(!dependent || !Array.isArray(dependent)) ? (
                                            <MenuItem>No Dependents</MenuItem>
                                        ) : (
                                            dependent.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.first_name+ '  '+item.last_name}
                                                </MenuItem>
                                            ))
                                        )}
                                    </Select>
                                </FormControl>
                            )}
                        </FormControl>
                    </div>
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
                </Grid>
                <Grid item xs={6}>
                    <div className="w-full my-5">
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
                    <div className="w-full my-5">
                        <FormControl className='w-full'>
                            <InputLabel>Select Disease for Vaccination</InputLabel>
                            <Select value={selectedDisease} onChange={handleDiseaseChange}>

                                {(!diseases || !Array.isArray(diseases)) ? (
                                    <MenuItem>No Disease</MenuItem>
                                ) : (
                                    diseases.map((disease) => (
                                        <MenuItem key={disease.id} value={disease.id}>
                                            {disease.disease_name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>

                    </div>
                    <div>
                        <FormControl className='w-full'>
                            <InputLabel>Select Vaccine</InputLabel>
                            <Select value={selectedVaccine} onChange={handleVaccineChange} disabled={!selectedDisease}>

                                {(!vaccines || !Array.isArray(vaccines)) ? (
                                    <MenuItem>No Vaccine</MenuItem>
                                ) : (
                                    vaccines.map((vaccine) => (
                                        <MenuItem key={vaccine.id} value={vaccine.id}>
                                            {vaccine.vaccine_name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="w-full my-5">
                        <TextField label='Dose No' type='number' onChange={handleDoseChange} />
                    </div>
                    <div className="w-full my-5">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TextField type='date' label="Date"  id="dob" name="data" disablePast onChange={handleDateChange} required/>
                        </LocalizationProvider>
                    </div>
                    <div className="w-full my-5">
                        <div className="w-full my-5">
                            <FormControl className='w-full'>
                                <InputLabel>Select Time Slot for Vaccination</InputLabel>
                                <Select value={selectedSlot} onChange={handleSlotChange}>

                                    {(!slots || !Array.isArray(slots)) ? (
                                        <MenuItem>No Slots</MenuItem>
                                    ) : (
                                        slots.map((slot) => (
                                            <MenuItem key={slot.id} value={slot.id}>
                                                {slot.slots > 0 && formatTimeSlot(slot.time_slot) + ' - '}{slot.slots} Slots Remaining
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>

                        </div>
                    </div>
                    <div>
                        <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Submit</button>
                        <button type='reset' value='Reset' className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                    </div>
                </Grid>
            </Grid>
            <div>
                {data1 != null  && <h1 className="success-msg">{data1.status}</h1>}
            </div>
        </form>
    )
}