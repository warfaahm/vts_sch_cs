import React from "react";
import {Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import {XMarkIcon} from "@heroicons/react/24/solid";

export default function Popup(props){

    const {title, children, openPopup, setOpenPopup} = props;

    return(
        <Dialog open={openPopup} maxWidth='md'>
            <DialogTitle>
                <div className='flex justify-between'>
                    <Typography variant='h6' component='div'>
                        {title}
                    </Typography>
                    <button className='text-red-700 bg-red-100 hover:bg-red-200 rounded px-1 py-2' onClick={()=>{setOpenPopup(false)}}>
                        <XMarkIcon className='w-6 h-6'/>
                    </button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
}
