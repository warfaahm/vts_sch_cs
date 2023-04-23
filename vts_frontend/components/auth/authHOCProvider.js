import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isLoggedIn } from '@/utils/authProvider'; // Utility function to check authentication status

const AuthHOCProvider
    = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();

        useEffect(() => {
            // Check authentication status on component mount
            const checkAuth = async () => {
                const isAuthenticated = await isLoggedIn(); // Make API call to check if user is logged in
                if (!isAuthenticated) {
                    // Redirect to login page if not authenticated
                    router.push('/provider/login'); // Replace with your login page URL
                }
            };
            checkAuth();
        }, []);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default AuthHOCProvider;
