import '@/styles/globals.css'
import AppUser from "@/pages/user/_app";
import AppAdmin from "@/pages/admin/_app";
import {useRouter} from "next/router";
import AppProvider from "@/pages/provider/_app";

export default function App({ Component, pageProps }) {

    const router = useRouter();
    const isUserRoute = router.pathname.startsWith('/user');
    const isAdminRoute = router.pathname.startsWith('/admin');
    const isProviderRoute = router.pathname.startsWith('/provider');

    if (isUserRoute) {
        return <AppUser Component={Component} pageProps={pageProps} />;
    } else if (isAdminRoute) {
        return <AppAdmin Component={Component} pageProps={pageProps} />;
    } else if (isProviderRoute) {
        return <AppProvider Component={Component} pageProps={pageProps} />;
    } else {
        return <Component {...pageProps}/>;
    }


}
