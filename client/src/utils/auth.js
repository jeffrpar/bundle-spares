// Import Decode Token
import decode from 'jwt-decode';

// Create a new class to instantiate a new Auth object
class AuthService {

    // Get user data
    getProfile() {
        return decode(this.getToken());
    };

    // Check if user is logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        // use type coersion to check if token is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    };

    // Check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    };

    // Get token from local storage
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    };

    // Set token to local storage and reload page to homepage on login
    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    };

    // Clear token from local storage and force logout with reload
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    };
};


// Export the AuthService class on a new instance.
export default new AuthService();