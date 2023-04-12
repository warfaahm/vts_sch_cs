import {
    Autocomplete, Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem, Radio,
    RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


export default function VaccineForm()
{
    const [diseasesid, setDiseasesid] = useState([]);
    const [vname, setVname] = useState('');
    const [price, setPrice] = useState('');
    const [validity, setValidity] = useState(null);
    const [contains, setContains] = useState(null);
    const [dosage, setDosage] = useState(null);
    const [age, setAge] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [duration1, setDuration1] = useState(null);
    const [duration2, setDuration2] = useState(null);
    const [duration3, setDuration3] = useState(null);

    const [token1, setToken1] = useState();
    const [data, setData] = useState();

    const [selectedOption, setSelectedOption] = useState('');
    const [showTextField2, setShowTextField2] = useState(false);
    const [showTextField3, setShowTextField3] = useState(false);
    const [showTextField4, setShowTextField4] = useState(false);
    const [diseases, setDiseases] = useState(null);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const handleVNameChange = (event) => {
        setVname(event.target.value);
    };
    const handleDiseaseChange = (event, selectedOptions) => {
        //setDiseasesid([event.target.value]);
        const selectedDiseaseNames = selectedOptions.map((option) => option.id);
        setDiseasesid(selectedDiseaseNames);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleValidityChange = (event) => {
        setValidity(event.target.value);
    };
    const handleContainsChange = (event) => {
        setContains(event.target.value);
    };
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };
    const handleDosageChange = (event) => {
        setDosage(event.target.value);
    };
    const handleDuration1Change = (event) => {
        setDuration1(event.target.value);
    };
    const handleDuration2Change = (event) => {
        setDuration2(event.target.value);
    };
    const handleDuration3Change = (event) => {
        setDuration3(event.target.value);
    };
    const handleManufacturerChange = (event) => {
        setManufacturer(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === '2'){
            setShowTextField2(true);
            setShowTextField3(false);
            setShowTextField4(false);
        }
        else if (event.target.value === '3'){
            setShowTextField2(false);
            setShowTextField3(true);
            setShowTextField4(false);
        }
        else if (event.target.value === '4'){
            setShowTextField2(false);
            setShowTextField3(false);
            setShowTextField4(true);
        }
        else {
            setShowTextField2(false);
            setShowTextField3(false);
            setShowTextField4(false);
        }
    };

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
        const userToken = localStorage.getItem('adminToken');
        setToken1(userToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const diseaseIds = diseasesid.map((disease) => disease);

            const response = await axios.post('http://127.0.0.1:8000/api/admin/vaccine',
                {
                    vaccine_name: vname,
                    manufacturer: manufacturer,
                    contains: contains,
                    dosage: selectedOption,
                    age_range: age,
                    duration1: duration1,
                    duration2: duration2,
                    duration3: duration3,
                    validity_duration: validity,
                    price: price,
                    disease_id: diseaseIds,
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
                        <TextField variant='outlined' label='Vaccine Name' name='name' id='name' onChange={handleVNameChange} required/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Manufacturer' name='manufacturer' id='manufacturer' onChange={handleManufacturerChange} required/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Contains (Allergy)' name='allergy' id='allergy' onChange={handleContainsChange} required/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Age Range' name='age' id='allergy' onChange={handleAgeChange} required/>
                    </div>

                    <div>
                        {diseases && (
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={diseases}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.disease_name}
                                getOptionSelected={(option, value) => option.id === value.id}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.disease_name}
                                    </li>
                                )}
                                style={{ width: 240 }}
                                onChange={handleDiseaseChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Diseases" placeholder="Disease" />
                                )}
                            />
                        )}
                    </div>
                </Grid>
                <Grid item xs={6} className='m-6'>
                    <div className="w-full my-5">
                        <FormControl required>
                            <FormLabel id="dosage" name="dosage">Number of doses</FormLabel>
                            <RadioGroup name="dosage" className="inline" value={selectedOption} onChange={handleOptionChange} required >
                                <FormControlLabel value='1' control={<Radio />} label="1" />
                                <FormControlLabel value='2' control={<Radio />} label="2" />
                                <FormControlLabel value='3' control={<Radio />} label="3" />
                                <FormControlLabel value='4' control={<Radio />} label="4" />
                            </RadioGroup>
                            {showTextField2 && (
                                <div className='m-2'>
                                    <TextField variant='outlined' className='w-full' label='Duration after 1st Dose (Weeks)' type='number' name='duration1' id='duration1' onChange={handleDuration1Change} required/>
                                </div>
                            )}
                            {showTextField3 && (
                                <div>
                                    <div className='m-2'>
                                        <TextField variant='outlined' label='Duration after 1st Dose (Weeks)' type='number' name='duration1' id='duration1' onChange={handleDuration1Change} required/>
                                    </div>
                                    <div className='m-2'>
                                        <TextField variant='outlined' label='Duration after 2nd Dose (Weeks)' type='number' name='duration2' id='duration2' onChange={handleDuration2Change} required/>
                                    </div>
                                </div>
                            )}
                            {showTextField4 && (
                                <div>
                                    <div className='m-2'>
                                        <TextField variant='outlined' label='Duration after 1st Dose (Weeks)' type='number' name='duration1' id='duration1' onChange={handleDuration1Change} required/>
                                    </div>
                                    <div className='m-2'>
                                        <TextField variant='outlined' label='Duration after 2st Dose (Weeks)' type='number' name='duration2' id='duration2' onChange={handleDuration2Change} required/>
                                    </div>
                                    <div className='m-2'>
                                        <TextField variant='outlined' label='Duration after 3rd Dose (Weeks)' type='number' name='duration3' id='duration3' onChange={handleDuration3Change} required/>
                                    </div>
                                </div>
                            )}
                        </FormControl>
                    </div>
                    <div className='m-2'>
                        <TextField variant='outlined' label='Price' name='price' id='price' step={0.01} onChange={handlePriceChange} required/>
                    </div>
                    <div className='m-2'>
                        <TextField variant='outlined' type='number' label='Validity Duration (Months)' name='validity' id='validity' onChange={handleValidityChange}/>
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
