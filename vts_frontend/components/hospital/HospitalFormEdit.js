import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";


export default function HospitalFormEdit(props)
{
    const {data} = props;

    const [token1, setToken1] = useState();
    const [data1, setData1] = useState();


    const [hname, setHname] = useState();
    const [slot, setSlot] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();

    const handleHNameChange = (event) => {
        setHname(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
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
            const response = await axios.patch(`http://127.0.0.1:8000/api/admin/hospital/${data.id}`,
                {
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
                        <TextField variant='outlined' label='Hospital Name' name='name' id='name' defaultValue={data?.name} onChange={handleHNameChange} required/>
                    </div>
                    <div className="w-full my-5">
                        <TextField variant='outlined' label='Address' name='address' id='address' defaultValue={data?.address} onChange={handleAddressChange} required/>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <TextField variant='outlined' label='Phone No' name='phone_no' id='phone_no' defaultValue={data?.phone_no} onChange={handlePhoneChange} required/>
                    </div>
                    <div>
                        <TextField variant='outlined' label='Slot no' type='number' name='slots' id='slots' defaultValue={data?.slots} onChange={handleSlotChange}/>
                    </div>
                    <div>
                        <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3' >Submit</button>
                        <button type='reset' value='Reset' className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                    </div>
                </Grid>
            </Grid>
            <div>
                {data1 != null  && <h1 className="success-msg">{data.status}</h1>}
            </div>
        </form>
    )
}
