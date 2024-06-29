import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();


    const login = async (data) => {

        try {

            const response = await axios.post('https://localhost:7106/api/bdtbusuario/login', data);

            setUser(response.data);
            setIsAuth(true);

            localStorage.setItem('user', JSON.stringify(response.data));

            return response.data;

        } catch (error) {

            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }

            setErrors([error.response.data.message]);
        }

    };

    const logout = () => {
        setUser(null);
        setIsAuth(false);
        navigate('/');
    };

    // Valida si existe el usuario en el localStorage
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));
 
        if (user) {
            setUser(user);
            setIsAuth(true);
        }

    }, []);
    
    useEffect(() => {
        const clean = setTimeout(() => {
            setErrors(null);
        }, 3000);

        return () => clearTimeout(clean);
    }, [errors]);
    

    return (
        <AuthContext.Provider
            value={{ user, isAuth, errors, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )

}
