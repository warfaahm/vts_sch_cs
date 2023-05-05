import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import SearchResultPatient from "@/components/record/SearchResultPatient";
import SearchBatch from "@/components/vaccine/SearchBatch";


export default function Batch()
{
    const [diseases, setDiseases] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState('');
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState('');

    const [data, setData] = useState(null);
    const [token1, setToken1] = useState(null);

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
    function handleClearClick() {
        setData(null);
        setSelectedVaccine(null)
    }

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('adminToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    useEffect(() => {
        const userToken = localStorage.getItem('adminToken');
        setToken1(userToken);
    }, []);


    const handleSubmit = async () => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/batch/${selectedVaccine}`, {
                headers: {
                    'Authorization': `Bearer ${token1}`
                }
            });
            console.log(response.data);
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form className='flex' onSubmit={handleSubmit}>
                <div className="w-1/3 mx-1">
                    <FormControl className='w-full'>
                        <InputLabel>Select Disease for Batch</InputLabel>
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
                <div className="w-1/3 mx-1">
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
                <div className='mt-1'>
                    <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Submit</button>
                    <button className='border border-red-700 rounded px-2 py-1 text-red-800 hover:bg-red-100 my-1 mx-2' onClick={handleClearClick}>Clear</button>
                </div>
            </form>
            <div>
                {data &&(
                    <SearchBatch data={data} id={selectedVaccine}/>
                )}
            </div>
        </div>
    )
}
