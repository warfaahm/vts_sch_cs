const isLoggedIn = async () => {
    try {
        // Make API call to Laravel server to check authentication status
        const response = await fetch('http://127.0.0.1:8000/api/user/auth/check', {
            // Replace with your Laravel API endpoint for checking authentication
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}` // Send token in Authorization header
            },
        });

        if (response.ok) {
            // If response is successful (200 status code), return true
            return true;
        } else {
            // If response is unsuccessful (non-200 status code), return false
            return false;
        }
    } catch (error) {
        console.error('Error checking authentication status:', error);
        return false;
    }
};

export { isLoggedIn };
