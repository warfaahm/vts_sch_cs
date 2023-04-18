import {useState} from "react";
import VaccineForm from "@/components/vaccine/VaccineForm";
import Popup from "@/components/Popup";
import QRCodeScanner from "@/components/qrcode/QRCodeScanner";
import SearchResultPatient from "@/components/record/SearchResultPatient";
import SearchPatientForm from "@/components/record/SearchPatientForm";


export default function SearchPatientRecord()
{
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [qrCodeData, setQrCodeData] = useState(null);
    const [userInfo, setUserInfo] = useState({ name: null, number: null });


    const handleQRCodeData = data => {
        setQrCodeData(data);
        const [name, number] = data.split(",");
        setUserInfo({ name, number });
    };
    const handleClose = () => {
        console.log('dialog closed');
        setOpenPopup(false)
        // perform any additional actions after the QR code is scanned and the dialog is closed
    };
    const handleClose1 = () => {
        console.log('dialog closed');
        setOpenPopup1(false)
    };
    function handleClearClick() {
        setUserInfo(null);
    }

    return (
        <div>
            <div>
                <div>
                    <h1 className='font-bold'>Search Records</h1>
                </div>
                <div>
                    <button className='border border-blue-700 rounded px-2 py-1 text-blue-800 hover:bg-blue-100 my-1 mx-2' onClick={()=>setOpenPopup1(true)}>Use Form</button>
                </div>
                <div>
                    <button className='border border-green-700 rounded px-2 py-1 text-green-800 hover:bg-green-100 my- mx-2' onClick={()=>setOpenPopup(true)}>Use QR Code Scanner</button>
                </div>
                <div>
                    <button className='border border-red-700 rounded px-2 py-1 text-red-800 hover:bg-red-100 my-1 mx-2' onClick={handleClearClick}>Clear</button>
                </div>
                <div>
                    {userInfo?.name && userInfo?.number &&(
                        <SearchResultPatient name={userInfo?.name} number={userInfo?.number}/>
                    )}
                </div>
            </div>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title='QR Code Scanner'
            >
                <QRCodeScanner onDataReceived={handleQRCodeData} onClose={handleClose}/>
            </Popup>
            <Popup
                openPopup={openPopup1}
                setOpenPopup={setOpenPopup1}
                title='Search Record'
            >
                <SearchPatientForm onDataReceived={handleQRCodeData} onClose={handleClose1}/>
            </Popup>
        </div>
    )
}
