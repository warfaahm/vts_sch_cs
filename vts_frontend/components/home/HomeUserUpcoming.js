import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import moment from "moment/moment";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import axios from "axios";


export default function HomeUserUpcoming()
{
    const [data, setData] = useState(null);

    let token;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('userToken');

            console.log(token);
            console.log("token");
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/record1/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);


    return (
        <div className='mt-6 mb-16'>
            <h1 className='ml-2 font-bold text-xl'>Upcoming Vaccinations</h1>
            <div className='bg-blue-50 px-4 py-6 rounded-lg mt-4'>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-violet-200">
                                    <TableCell className="font-bold text-violet-900">Name</TableCell>
                                    <TableCell className="font-bold text-violet-900">Vaccine</TableCell>
                                    <TableCell className="font-bold text-violet-900">Dose No</TableCell>
                                    <TableCell className="font-bold text-violet-900">Date</TableCell>
                                    <TableCell className="font-bold text-violet-900">Status</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {(!data || !Array.isArray(data)) ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">Loading...</TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((item) => {
                                        const currentDate = moment().startOf('day');
                                        const nextDate = moment(item.next_date).startOf('day');
                                        const status = nextDate.isAfter(currentDate) ? 'Upcoming' : 'Not Vaccinated';
                                        const statusColorClass = (status === 'Upcoming') ? 'text-green-600 bg-green-200 hover:bg-green-300' : 'text-red-600 bg-red-200 hover:bg-red-300';
                                        return(
                                            <TableRow key={item.id} className={statusColorClass}>
                                                <TableCell>{item.dependent === null ? item.info.first_name + " " + item.info.last_name : item.dependent.first_name + " " + item.dependent.last_name}</TableCell>
                                                <TableCell>{item.vaccine.vaccine_name}</TableCell>
                                                <TableCell>{item.dose_no + 1}</TableCell>
                                                <TableCell>{moment(item.next_date).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{status}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>

                    </TableContainer>
                    {/*<TablePagination count={data.length} page={1} rowsPerPage={5} />*/}
                </Paper>
            </div>
        </div>
    )
}
