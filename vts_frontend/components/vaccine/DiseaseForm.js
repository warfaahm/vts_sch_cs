import {useEffect, useState} from "react";
import axios from "axios";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";


export default function DiseaseForm()
{
    const [token1, setToken1] = useState();
    const [data, setData] = useState();

    const [dname, setDname] = useState('');
    const [description, setDescription] = useState('');




    const handleDNameChange = (event) => {
        setDname(event.target.value);
    };

    const handleDescritionChange = (event) => {
        setDescription(event.target.value);
    };


    useEffect(() => {
        const userToken = localStorage.getItem('adminToken');
        setToken1(userToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/disease',
                {

                    disease_name: dname,
                    description: description,
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
                <div className="w-full my-5">
                    <TextField variant='outlined' label='Disease Name' name='name' id='name' onChange={handleDNameChange} required/>
                </div>
                <div className="w-full my-5">
                    <TextField variant='outlined' label='Description' name='description' id='description' onChange={handleDescritionChange} required/>
                </div>
                <div>
                    <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Submit</button>
                    <button type='reset' value='Reset' className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                </div>
            </Grid>
            <div>
                {data != null  && <h1 className="success-msg mt-2">{data.message}</h1>}
            </div>
        </form>
    )
}
