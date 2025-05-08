import { useState } from "react";
import AuthService from "../services/authService";
import { useNavigate } from 'react-router-dom';

const LoginAdmin = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('accessToken', response.access_token);
            localStorage.setItem('refreshToken', response.refresh_token);
            console.log("Login successful", response);
            // Handle successful login, e.g., redirect or store token
            if (response) {
                navigate('/');
            }
        } catch (error) {
            console.error("Login failed", error);
            // Handle login error, e.g., display error message
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Welcome to FarmInfinity
                </h1>
                <div className="space-y-6">
                    <div className="rounded-md shadow-sm">
                        <input type="text" placeholder="Username"
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                            onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password"
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button onClick={handleLogin}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>

                </div>
            </div>
        </div>
    );
      }

export default LoginAdmin;
