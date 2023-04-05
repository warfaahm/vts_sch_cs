import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";

export default function AppAdmin({ Component, pageProps }) {

    const router = useRouter();
    const isAdminRoute = router.pathname.startsWith('/admin');
    const isLoginPage = router.pathname === '/admin/login';

    if (isAdminRoute && !isLoginPage) {
        return(
            <AdminLayout>
                <Component {...pageProps} />
            </AdminLayout>
        )
    }
    else
    {
        return <Component {...pageProps}/>;
    }
}