import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment/moment";


export default function AddPatientRecord(props)
{
    const {id} = props;

    const [diseases, setDiseases] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState('');
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState('');
    const [dose, setDose] = useState(null);
    const currentDate = new Date();

    const [token1, setToken1] = useState();
    const [data, setData] = useState();

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

    const handleDiseaseChange = (event) => {
        setSelectedDisease(event.target.value);
        setSelectedVaccine('');
    };

    const handleVaccineChange = (event) => {
        setSelectedVaccine(event.target.value);
    };
    const handleDoseChange = (event) => {
        setDose(event.target.value);
    };

    useEffect(() => {
        const userToken = localStorage.getItem('staffToken');
        setToken1(userToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/staff/record',
                {

                    date: moment(currentDate.toLocaleDateString()).format('YYYY/MM/DD'),
                    vaccine_id: selectedVaccine,
                    dose_no: dose,
                    patient_id: id,
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
            <Grid container className='flex'>
                <Grid item xs={6} className='mr-2'>
                    <div className="w-full my-5">
                        <FormControl className='w-full'>
                            <InputLabel>Select Disease for Vaccination</InputLabel>
                            <Select value={selectedDisease} onChange={handleDiseaseChange} className='w-full'>

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
                    <div className='mb-2'>
                        <FormControl className='w-full'>
                            <InputLabel>Select Vaccine</InputLabel>
                            <Select value={selectedVaccine} onChange={handleVaccineChange} disabled={!selectedDisease} className='w-full'>

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
                    <div className='mb-2'>
                        <TextField label='Dose No' type='number' onChange={handleDoseChange} />
                    </div>
                    <div className='mb-2'>
                        <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3 mb-2' >Submit</button>
                        <button type='reset' value='Reset' className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                    </div>
                </Grid>
            </Grid>
            <div>
                {data != null  && <h1 className="success-msg mt-2">{data.message}</h1>}
            </div>
        </form>
    )
}
