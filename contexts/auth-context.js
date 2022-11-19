import { createContext, useState } from "react";

export const AuthContext = createContext({
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false,
    email: '',
    username: '',
    apiAuthHeaders: '',
    authenticate: (responseData) => {},
    logout: () => {},
});

export default function AuthContextProvider({ children }) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();

    function authenticate(responseData){
        setAccessToken(responseData['tokens']['access']);
        setRefreshToken(responseData['tokens']['refresh']);
        setEmail(responseData['email']);
        setUsername(responseData['username']);
    }

    function validateRegistration(responseData){
        setEmail(responseData['data']['email']);
        setUsername(responseData['data']['username']);
    }

    function logout(){
        setAccessToken(null);
        setRefreshToken(null);
        setEmail(null);
        setUsername(null);
    }

    const value = {
        token: accessToken,
        isAuthenticated: !!accessToken,
        apiAuthHeaders: {
            headers: {"Authorization": `Bearer ${accessToken}`}
        },
        authenticate: authenticate,
        validateRegistration: validateRegistration,
        logout: logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
