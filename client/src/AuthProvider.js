import React, { createContext, useState, useEffect, useContext } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem("jwtToken");
                    localStorage.removeItem("user");
                    setUser(null);
                } else {
                    const storedUser = JSON.parse(localStorage.getItem("user"));
                    setUser(storedUser);
                }
            } catch {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("user");
                setUser(null);
            }
        }
        setLoading(false); // Set loading to false after checking
    }, []);

    const login = (user, token) => {
        setUser(user);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
