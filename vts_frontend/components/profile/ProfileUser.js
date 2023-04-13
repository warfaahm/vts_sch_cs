import {useEffect, useState} from "react";
import axios from "axios";
import {Grid, TextField} from "@mui/material";


export default function ProfileUser(props)
{
    const {data} = props;

    const [token1, setToken1] = useState();
    const [data1, setData1] = useState();

    const [allergy, setAllergy] = useState();
    const [phone, setPhone] = useState();




    const handleAllergyChange = (event) => {
        setAllergy(event.target.value);
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
            const response = await axios.patch(`http://127.0.0.1:8000/api/user/profile/update`,
                {

                    allergy: allergy,
                    phone_no: phone,
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
                    <TextField variant='outlined' label='Phone no' name='phone' id='phone' defaultValue={data?.patient?.phone_no} onChange={handlePhoneChange} required/>
                </div>
                <div className="w-full my-5">
                    <TextField variant='outlined' label='Allergy' name='allergy' id='allergy' defaultValue={data?.patient?.allergy} onChange={handleAllergyChange} required/>
                </div>
                <div>
                    <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Submit</button>
                    <button type='reset' value='Reset' className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                </div>
            </Grid>
            <div>
                {data1 != null  && <h1 className="success-msg mt-2">{data1.status}</h1>}
            </div>
        </form>
    )
}
