import {useEffect, useState} from "react";
import axios from "axios";
import {VictoryLabel, VictoryPie} from "victory";


export default function ProviderReportGenderPat()
{
    const [data, setData] = useState();


    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('staffToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/staff/report/gender', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [token]);

    return (
        <div className='bg-blue-100 rounded-lg m-2 p-2 max-w-xl'>
            <div><h1 className='p-2 flex justify-center font-bold'>Patient Vaccinations by Gender</h1></div>
            <VictoryPie
                colorScale={["tomato", "orange" ]}
                data={data}
                x="gender"
                y="count"
                labels={({ datum }) => `${datum.gender === 'M' ? 'Male' : 'Female'}: ${datum.count}`}
                labelPosition={({ index }) => index
                    ? "centroid"
                    : "startAngle"
                }
                labelPlacement={({ index }) => index
                    ? "parallel"
                    : "vertical"
                }
            />
        </div>
    )
}
