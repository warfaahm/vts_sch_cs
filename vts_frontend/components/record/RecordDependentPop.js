import moment from "moment";


export default function RecordDependentPop(props)
{

    const {data} = props;

    return (
        <>
            <div className='max-w-3xl'>
                <div className='p-4 flex justify-between'>
                    <div className='mr-16'>
                        <span className='dialog1'>First Name</span>
                        <h1 className='dialog2'>{data.dependent.first_name}</h1>
                    </div>
                    <div>
                        <span className='dialog1'>Last Name</span>
                        <h1 className='dialog2'>{data.dependent.last_name}</h1>
                    </div>
                </div>
                <div className='p-4 flex justify-between'>
                    <div className='mr-16'>
                        <span className='dialog1'>Vaccine</span>
                        <h1 className='dialog2'>{data.vaccine.vaccine_name}</h1>
                    </div>
                    <div>
                        <span className='dialog1'>Hospital</span>
                        <h1 className='dialog2'>{data.hospital.hospital_name}</h1>
                    </div>
                </div>
                <div className='p-4 flex justify-between'>
                    <div>
                        <span className='dialog1'>Date Administered</span>
                        <h1 className='dialog2'>{moment(data.date).format('DD/MM/YYYY')}</h1>
                    </div>
                    <div>
                        <span className='dialog1'>Next Dose Date</span>
                        <h1 className='dialog2'>{moment(data.next_date).format('DD/MM/YYYY')}</h1>
                    </div>
                </div>
                <div className='p-4 flex justify-between'>
                    <div>
                        <span className='dialog1'>Dose No</span>
                        <h1 className='dialog2'>{data.dose_no}</h1>
                    </div>
                    <div>
                        <span className='dialog1'>Dosages Required</span>
                        <h1 className='dialog2'>{data.vaccine.dosage}</h1>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}
