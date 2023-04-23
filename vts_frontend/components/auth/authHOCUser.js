import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isLoggedIn } from '@/utils/authPatient'; // Utility function to check authentication status

const AuthHOCUser = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();

        useEffect(() => {
            // Check authentication status on component mount
            const checkAuth = async () => {
                const isAuthenticated = await isLoggedIn(); // Make API call to check if user is logged in
                if (!isAuthenticated) {
                    // Redirect to login page if not authenticated
                    router.push('/user/login'); // Replace with your login page URL
                }
            };
            checkAuth();
        }, []);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default AuthHOCUser;
