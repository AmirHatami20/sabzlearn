import {createContext, useState, useEffect, useCallback} from "react";
import axiosInstance from "../utils/axiosInstance.js";
import {API_PATHS} from "../utils/apiPaths.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoginIn, setIsLoginIn] = useState(false)
    const [token, setToken] = useState(null)
    const [userInfos, setUserInfos] = useState([])
    const [userCourses, setUserCourses] = useState([])
    const [loading, setLoading] = useState(true);

    const login = useCallback((user, userToken) => {
        setIsLoginIn(true);
        setToken(userToken);
        setUserInfos(user);
        localStorage.setItem("user", JSON.stringify({userToken}));
    }, []);

    const logout = useCallback(() => {
        setIsLoginIn(false);
        setToken(null);
        setUserInfos([]);
        localStorage.removeItem("user");
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("user");

        if (!saved) {
            setLoading(false);
            return;
        }

        const {userToken} = JSON.parse(saved);

        setToken(userToken);

        axiosInstance.defaults.headers.Authorization = `Bearer ${userToken}`;

        axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
            .then(({data}) => {
                setUserInfos(data.user || []);
                setUserCourses(data.courses || []);
                setIsLoginIn(true);
            })
            .catch(() => {
                logout();
            })
            .finally(() => {
                setLoading(false);
            });
    }, [logout]);

    return (
        <AuthContext.Provider value={{isLoginIn, token, userInfos, userCourses, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}