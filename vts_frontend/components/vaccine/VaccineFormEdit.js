import {useEffect, useState} from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import {
    Autocomplete,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, Radio,
    RadioGroup,
    TextField
} from "@mui/material";


export default function VaccineFormEdit(props)
{
    const {data} = props;

    const [vname, setVname] = useState(data.name);
    const [price, setPrice] = useState(data.price);
    const [validity, setValidity] = useState(data.validity_duration);
    const [contains, setContains] = useState(data.contains);
    const [dosage, setDosage] = useState(data.dosage);
    const [age, setAge] = useState(data.age_range);
    const [manufacturer, setManufacturer] = useState(data.manufacturer);
    const [duration1, setDuration1] = useState(data.duration1);
    const [duration2, setDuration2] = useState(data.duration2);
    const [duration3, setDuration3] = useState(data.duration3);

    const [token1, setToken1] = useState();
    const [data1, setData1] = useState();

    const [selectedOption, setSelectedOption] = useState(data.dosage);
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

            const response = await axios.patch(`http://127.0.0.1:8000/api/admin/vaccine/${data.id}`,
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
                <Grid item xs={6}>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Vaccine Name' name='name' id='name' defaultValue={data?.name} onChange={handleVNameChange} required/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Manufacturer' name='manufacturer' id='manufacturer' defaultValue={data?.manufacturer} onChange={handleManufacturerChange} required/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Contains (Allergy)' name='allergy' id='allergy' defaultValue={data?.contains} onChange={handleContainsChange} required/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Age Range' name='age' id='age' defaultValue={data?.age_range} onChange={handleAgeChange} required/>
                    </div>
                </Grid>
                <Grid item xs={6} className='m-6'>
                    <div className="w-full my-5">
                        <FormControl required>
                            <FormLabel id="dosage" name="dosage">Number of doses</FormLabel>
                            <RadioGroup name="dosage" className="inline"  defaultValue={data?.dosage} onChange={handleOptionChange} required >
                                <FormControlLabel value='1' control={<Radio />} label="1" />
                                <FormControlLabel value='2' control={<Radio />} label="2" />
                                <FormControlLabel value='3' control={<Radio />} label="3" />
                                <FormControlLabel value='4' control={<Radio />} label="4" />
                            </RadioGroup>
                            {showTextField2 && (
                                <div className='m-2'>
                                    <TextField variant='outlined' className='w-full' label='Duration after 1st Dose (Weeks)' type='number' defaultValue={data?.duration1} name='duration1' id='duration1' onChange={handleDuration1Change} required/>
                                </div>
                            )}
                            {showTextField3 && (
                                <div>
                                    <div className='m-2'>
                                        <TextField variant='outlined' label='Duration after 1st Dose (Weeks)' type='number' name='duration1' id='duration1' defaultValue={data?.duration1} onChange={handleDuration1Change} required/>
                                    </div>
                                    <div className='m-2'>
                                        <TextField variant='outlined' label='Duration after 2nd Dose (Weeks)' type='number' name='duration2' id='duration2' defaultValue={data?.duration2} onChange={handleDuration2Change} required/>
                                    </div>
                                </div>
                            )}
                            {showTextField4 && (
                                <div>
                                    <div className='m-2'>
                                        <TextField variant='outlined' label='Duration after 1st Dose (Weeks)' type='number' name='duration1' id='duration1' defaultValue={data?.duration1} onChange={handleDuration1Change} required/>
                                    </div>
                                    <div className='m-2'>
                                        <TextField variant='outlined' label='Duration after 2st Dose (Weeks)' type='number' name='duration2' id='duration2' defaultValue={data?.duration2} onChange={handleDuration2Change} required/>
                                    </div>
                                    <div className='m-2'>
                                        <TextField variant='outlined' label='Duration after 3rd Dose (Weeks)' type='number' name='duration3' id='duration3' defaultValue={data?.duration3} onChange={handleDuration3Change} required/>
                                    </div>
                                </div>
                            )}
                        </FormControl>
                    </div>
                    <div className='m-2'>
                        <TextField variant='outlined' label='Price' name='price' id='price' step={0.01} defaultValue={data?.price} onChange={handlePriceChange} required/>
                    </div>
                    <div className='m-2'>
                        <TextField variant='outlined' type='number' label='Validity Duration (Months)' name='validity' id='validity' defaultValue={data?.validity_duration} onChange={handleValidityChange}/>
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

