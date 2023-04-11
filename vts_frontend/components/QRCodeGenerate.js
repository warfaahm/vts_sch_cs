import QRCode from "qrcode.react";


export default function QRCodeGenerate(props){

    const {name, id} = props;

    const qrData = `${name},${id}`;

    return (
        <div>
            <QRCode value={qrData} />
        </div>
    );

}
