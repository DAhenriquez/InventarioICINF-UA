import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Al cargar la app, verificamos si ya hay un token guardado
    useEffect(() => {
        if (token) {
            // Opcional: Podrías hacer una petición a /api/user para validar el token
            // Por ahora, asumimos que si hay token, está logueado
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await fetch('https://better-missy-universidad-autonoma-de-chile-3f410c93.koyeb.app/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en el login');
            }

            // GUARDAMOS EL TOKEN Y EL USUARIO
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            setToken(data.accessToken);
            setUser(data.user);
            
            return true; // Login exitoso
        } catch (error) {
            console.error(error);
            alert(error.message); // Muestra el error al usuario
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar esto fácil en cualquier componente
export const useAuth = () => useContext(AuthContext);