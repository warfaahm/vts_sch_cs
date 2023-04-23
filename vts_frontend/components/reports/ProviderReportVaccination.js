import {useEffect, useState} from "react";
import axios from "axios";
import {VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip} from "victory";


export default function ProviderReportVaccination()
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
            const response = await axios.post(
                "http://127.0.0.1:8000/api/staff/report/record",
                {
                    year: "2023"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            setData(response.data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);


    return (
        <div className='bg-blue-100 rounded-lg m-2 p-2 max-w-xl'>
            <div><h1 className='p-2 flex justify-center font-bold'>Vaccinations Year: 2023</h1></div>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryAxis
                    tickValues={[2, 3, 4, 5, 6]} // Set x-axis tick values to months
                    tickFormat={['Feb', 'March', 'April', 'May', 'June']} // Set x-axis tick labels
                />
                <VictoryAxis
                    dependentAxis // Set y-axis as dependent axis
                    tickFormat={tick => (tick === Math.floor(tick) ? tick : "")} // Set y-axis tick labels
                />
                <VictoryBar
                    data={data}
                    x="month"
                    y="count"
                    labels={({ datum }) => `vaccinations: ${datum.count}`}
                    labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} />}
                />
            </VictoryChart>
        </div>
    )
}
