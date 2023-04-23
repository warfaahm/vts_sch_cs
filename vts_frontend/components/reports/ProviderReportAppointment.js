import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';
import {useEffect, useState} from "react";
import axios from "axios";
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryLegend,
    VictoryStack,
    VictoryTheme,
    VictoryTooltip
} from "victory";


export default function ProviderReportAppointment()
{
    const [token1, setToken1] = useState();
    const [year, setYear] = useState();
    const [appointments, setAppointments] = useState([]);
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
                "http://127.0.0.1:8000/api/staff/report/appointment",
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

    const allStatusKeys = Array.from(
        new Set(data?.flatMap(d => Object.keys(d).filter(key => key !== "month")))
    );


    return (
        <div className='bg-blue-100 rounded-lg m-2 p-2 max-w-xl h-auto'>
            <div><h1 className='p-2 flex justify-center font-bold'>Appointment Status for Year: 2023</h1></div>
            <VictoryChart domain={{x: [0, 6],}} theme={VictoryTheme.material}>
                <VictoryAxis
                    tickValues={[2, 3, 4, 5, 6]} // Set x-axis tick values to months
                    tickFormat={['Feb', 'March', 'April', 'May', 'June']} // Set x-axis tick labels
                />
                <VictoryAxis
                    dependentAxis // Set y-axis as dependent axis
                    tickFormat={tick => (tick === Math.floor(tick) ? tick : "")} // Set y-axis tick labels
                />

                <VictoryStack // Use VictoryStack to stack bars
                    colorScale='warm' // Set colors for each status
                >
                    {allStatusKeys.map(status => // Loop through all unique status keys
                            status !== "month" && (
                                <VictoryBar // Create a VictoryBar for each status
                                    key={status}
                                    alignment="start"
                                    data={data.map(d => ({
                                        x: d.month,
                                        y: d[status] || 0 // Set y-value to 0 if status key is not present in data point
                                    }))}
                                    labels={({ datum }) => `${status}: ${datum.y}`}
                                    labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }}
                                    />}
                                />
                            )
                    )}
                </VictoryStack>
            </VictoryChart>
        </div>
    );
}
