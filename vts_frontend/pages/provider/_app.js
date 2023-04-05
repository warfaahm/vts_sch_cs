import { useRouter } from "next/router";
import ProviderLayout from "@/components/ProviderLayout";

export default function AppProvider({ Component, pageProps }) {

    const router = useRouter();
    const isProviderRoute = router.pathname.startsWith('/provider');
    const isLoginPage = router.pathname === '/provider/login';

    if (isProviderRoute && !isLoginPage ) {
        return(
            <ProviderLayout>
                <Component {...pageProps}/>
            </ProviderLayout>
        )
    }
    else
    {
        return <Component {...pageProps}/>;
    }
}