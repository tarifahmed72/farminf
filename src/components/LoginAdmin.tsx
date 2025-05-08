import { useState} from "react";
import AuthService from "../services/authService";
import { useNavigate } from 'react-router-dom';

const LoginAdmin = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleLogin = async (e:any) => {
        e.preventDefault()
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            console.log("Login successful", response);
            if (response) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Login failed", error);
            // Handle login error, e.g., display error message
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    
                    <input type="hidden" name="remember" value="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <input type="text" placeholder="Username"  onChange={(e) => setUsername(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                    </div>
                    <div>
                       <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sign in
                       </button>
                     </div>
                </form>
                
            </div>
            </div>
    );
      }

export default LoginAdmin;
