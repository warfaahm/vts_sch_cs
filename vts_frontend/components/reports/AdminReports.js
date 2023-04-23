import AdminReportGenderPat from "@/components/reports/AdminReportGenderPat";
import AdminReportGenderDep from "@/components/reports/AdminReportGenderDep";
import AdminReportVaccination from "@/components/reports/AdminReportVaccination";
import AdminReportVaccine from "@/components/reports/AdminReportVaccine";
import AdminReportVaccineCounty from "@/components/reports/AdminReportVaccineCounty";


export default function AdminReports()
{
    return (
        <div className='grid grid-cols-2'>
            <AdminReportGenderPat/>
            <AdminReportGenderDep/>
            <AdminReportVaccination/>
            <AdminReportVaccine/>
            <AdminReportVaccineCounty/>
        </div>
    )
}
