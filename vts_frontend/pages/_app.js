import '@/styles/globals.css'
import AppUser from "@/pages/user/_app";
import AppAdmin from "@/pages/admin/_app";
import {useRouter} from "next/router";

export default function App({ Component, pageProps }) {

    const router = useRouter();
    const isUserRoute = router.pathname.startsWith('/user');
    const isAdminRoute = router.pathname.startsWith('/admin');

    if (isUserRoute) {
        return <AppUser Component={Component} pageProps={pageProps} />;
    } else if (isAdminRoute) {
        return <AppAdmin Component={Component} pageProps={pageProps} />;
    }


}
