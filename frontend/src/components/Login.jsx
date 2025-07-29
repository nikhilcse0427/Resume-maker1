import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './Inputs';
import { validateEmail } from '../utils/helper';
import { UserContext } from '../context/userContext';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { Lock, Mail, Loader2 } from 'lucide-react'; // Added Loader2 for spinner

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError('Please enter the password');
      setIsLoading(false);
      return;
    }
    setError('');
    
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-blue-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-blue-900 mb-2">Welcome Back</h3>
        <p className="text-blue-700/80">Sign in to continue building amazing resumes</p>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="your@email.com"
            type="email"
            icon={<Mail className="w-5 h-5 text-blue-500" />}
          />
          
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
            icon={<Lock className="w-5 h-5 text-blue-500" />}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 ${
            isLoading ? 'opacity-90 cursor-not-allowed' : 'hover:shadow-blue-200/50'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="text-center text-sm text-blue-700/80">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentPage('signup')}
            className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;