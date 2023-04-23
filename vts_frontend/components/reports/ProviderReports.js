import ProviderReportAppointment from "@/components/reports/ProviderReportAppointment";
import ProviderReportVaccination from "@/components/reports/ProviderReportVaccination";
import ProviderReportVaccine from "@/components/reports/ProviderReportVaccine";
import ProviderReportGenderPat from "@/components/reports/ProviderReportGenderPat";
import ProviderReportGenderDep from "@/components/reports/ProviderReportGenderDep";


export default function ProviderReports()
{
    return (
        <div className='grid grid-cols-2'>
            <ProviderReportAppointment/>
            <ProviderReportVaccination/>
            <ProviderReportVaccine/>
            <ProviderReportGenderPat/>
            <ProviderReportGenderDep/>
        </div>
    )
}
