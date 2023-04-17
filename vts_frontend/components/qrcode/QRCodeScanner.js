import { useState, useEffect, useRef } from "react";
import QrScanner from 'qr-scanner';

export default function QRCodeScanner({onDataReceived, onClose}) {
    const videoRef = useRef(null);
    const [data, setData] = useState(null);
    const [showDialog, setShowDialog] = useState(true);

    useEffect(() => {
        let qrScanner;

        const handleScan = (result) => {
            console.log('decoded qr code:', result);
            setData(result);
            onDataReceived(result.data);
            qrScanner.stop();
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
            setShowDialog(false); // close the dialog after the QR code is scanned
            onClose(); // call the onClose function, if provided
        };

        if (videoRef.current) {
            qrScanner = new QrScanner(
                videoRef.current,
                handleScan,
                { highlightScanRegion: true /* your options or returnDetailedScanResult: true if you're not specifying any other options */ },
            );
            qrScanner.start();

            return () => {
                qrScanner.stop();
                if (videoRef.current && videoRef.current.srcObject) {
                    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                }
            };
        }
    }, [onDataReceived, onClose]);

    return (
        <div style={{ display: showDialog ? "block" : "none" }}>
            <div>
                <video ref={videoRef} style={{ width: '90%', height: '90%' }} />
            </div>
            <div>{JSON.stringify(data?.data)}</div>
        </div>
    );
}
