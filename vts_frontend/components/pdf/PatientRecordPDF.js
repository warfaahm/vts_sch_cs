import { jsPDF } from 'jspdf';
import moment from "moment";
import autoTable from 'jspdf-autotable'
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";


export default function PatientRecordPDF(props)
{
    const {data, profile} = props;
    const downloadpdf = () => {
        const doc = new jsPDF();
        const headers = [['Vaccine Name', 'Date Administered', 'Dose No', 'Hospital']];
        const body = data.map((item) => [item.vaccine.vaccine_name, moment(item.date).format('DD/MM/YYYY'), item.dose_no, item.hospital.hospital_name]);
        doc.addImage('/images/logo.png', 'PNG', 85, 15, 40, 30)
        doc.text('Vaccination Record', 85, 47);
        doc.line(5,50,195,50);
        doc.line(5,51,195,51);
        doc.setFontSize(12);
        doc.text('Name: '+profile?.first_name+ '  '+profile?.last_name, 10,58);
        doc.text('National ID: '+profile?.patient?.nat_id_no, 85, 58);
        doc.text('Gender: '+profile?.patient?.gender, 10, 64);
        doc.text('Date of Birth: '+moment(profile?.patient?.dob).format('DD/MM/YYYY'), 85,64);
        doc.text('Email: '+profile?.email, 10, 70);
        doc.text('Phone No: '+profile?.patient?.phone_no, 85,70);
        doc.text('Allergy: '+profile?.patient?.allergy, 10,76);
        doc.line(5,80,195,80);
        doc.autoTable({
            head: headers,
            body: body,
            startY: 85,
        });
        const tableHeight = doc.previousAutoTable.finalY + 10;
        doc.save('my-document.pdf');
    }

    return (
        <div>
            <button onClick={downloadpdf} className='border border-green-700 text-green-900 rounded py-2 px-2 hover:bg-green-100  flex'><ArrowDownTrayIcon className='w-6 h-6'/> Download Record</button>
        </div>
    );
}
