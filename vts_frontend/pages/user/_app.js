import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function AppUser({ Component, pageProps }) {

    const router = useRouter();
    const isUserRoute = router.pathname.startsWith('/user');
    const isLoginPage = router.pathname === '/user/login';
    const isRegisterPage = router.pathname === '/user/register';

    return (
        <div>
            {isUserRoute && !isLoginPage && !isRegisterPage && <Layout />}
            <Component {...pageProps} role='user' />
        </div>
    )
}