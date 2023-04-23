import {useEffect, useState} from "react";
import axios from "axios";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip} from "victory";


export default function AdminReportVaccineCounty()
{
    const [data1, setData1] = useState([]);
    const [token1, setToken1] = useState(null);

    const [diseases, setDiseases] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState('');
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccine, setSelectedVaccine] = useState('');
    const [counties, setCounties] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState('');

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
        axios.get('http://127.0.0.1:8000/api/hospital/county')
            .then(response => {
                const data = response.data.data;
                setCounties(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDiseaseChange = (event) => {
        setSelectedDisease(event.target.value);
        setSelectedVaccine('');
    };

    const handleVaccineChange = (event) => {
        setSelectedVaccine(event.target.value);
    };

    const handleCountyChange = (event) => {
        setSelectedCounty(event.target.value);
    };

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('staffToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    useEffect(() => {
        const userToken = localStorage.getItem('adminToken');
        setToken1(userToken);
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/report/record3',
                {
                    year: "2023",
                    vaccine_id: selectedVaccine,
                    county_id: selectedCounty,
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
        <div className='bg-blue-100 rounded-lg m-2 p-2 max-w-xl'>
            <div><h1 className='p-2 flex justify-center font-bold'>Vaccine (County) Year: 2023</h1></div>
            <form className='flex' onSubmit={handleSubmit}>
                <div className="w-1/3 mx-1">
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
                <div className='mt-1'>
                    <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Submit</button>
                </div>
            </form>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryAxis
                    tickValues={[2, 3, 4, 5, 6]} // Set x-axis tick values to months
                    tickFormat={['Feb', 'March', 'April', 'May', 'June']} // Set x-axis tick labels
                />
                <VictoryAxis
                    dependentAxis // Set y-axis as dependent axis
                    tickFormat={tick => (tick === Math.floor(tick) ? tick : "")} // Set y-axis tick labels
                />
                <VictoryBar
                    data={data1}
                    x="month"
                    y="count"
                    labels={({ datum }) => `vaccinations: ${datum.count}`}
                    labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} />}
                />
            </VictoryChart>
        </div>
    )
}
