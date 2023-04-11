import moment from "moment/moment";


export default function VaccineView(props)
{
    const {data} = props;

    return (
        <>
            <div className='max-w-3xl'>
                <div className='p-4 flex justify-between'>
                    <div className='mr-16'>
                        <span className='dialog1'>Vaccine Name</span>
                        <h1 className='dialog2'>{data.name}</h1>
                    </div>
                    <div>
                        <span className='dialog1'>Manufacturer</span>
                        <h1 className='dialog2'>{data.manufacturer}</h1>
                    </div>
                </div>
                <div className='p-4 flex justify-between'>
                    <div>
                        <span className='dialog1'>Contains</span>
                        <h1 className='dialog2'>{data.contains}</h1>
                    </div>
                    <div>
                        <span className='dialog1'>Dosage</span>
                        <h1 className='dialog2'>{data.dosage}</h1>
                    </div>
                </div>
                <div className='p-4 flex justify-between'>
                    <div>
                        <span className='dialog1'>Age Range</span>
                        <h1 className='dialog2'>{data.age_range}</h1>
                    </div>
                    <div>
                        <span className='dialog1'>Duration 1</span>
                        <h1 className='dialog2'>{data.duration1}</h1>
                    </div>
                </div>
                <div className='p-4 flex justify-between'>
                    <div>
                        <span className='dialog1'>Duration 2</span>
                        <h1 className='dialog2'>{data.duration2}</h1>
                    </div>
                    <div>
                        <span className='dialog1'>Duration 1</span>
                        <h1 className='dialog2'>{data.duration3}</h1>
                    </div>
                </div>
                <div>
                    <div>
                        <span className='dialog1'>Duration 2</span>
                        <h1 className='dialog2'>{item.disease.map((dis) => (
                            <div>{dis.disease_name}</div>
                        ))}</h1>
                    </div>
                    <div>
                        <span className='dialog1'>Price</span>
                        <h1 className='dialog2'>{data.price}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
