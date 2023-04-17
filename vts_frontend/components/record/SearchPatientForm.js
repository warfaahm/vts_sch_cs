import {Grid, TextField} from "@mui/material";
import {useState} from "react";


export default function SearchPatientForm({onDataReceived, onClose})
{
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [showDialog, setShowDialog] = useState(true);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    const handleSearch = () => {
        event.preventDefault();
        const data = `${name},${number}`;
        console.log('dialog closed');
        onDataReceived(data);
        setShowDialog(false); // close the dialog after the QR code is scanned
        onClose(); // call the onClose function, if provided
    };

    return (
        <form className='m-2' onSubmit={handleSearch}>
            <Grid container>
                <Grid item xs={6} className='mr-2'>
                    <div className='mb-2'>
                        <TextField label='Last Name'  onChange={handleNameChange} />
                    </div>
                    <div className='mb-2'>
                        <TextField label='National/Birth ID'  onChange={handleNumberChange} />
                    </div>
                    <div className='mb-2'>
                        <button type='submit' className='text-white bg-blue-500 rounded-md py-3 px-5 hover:bg-blue-700 mr-3 mb-2' >Search</button>
                        <button type='reset' value='Reset' className='text-black bg-gray-400 rounded-md py-3 px-5 hover:bg-gray-600 hover:text-white'>Reset</button>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}
