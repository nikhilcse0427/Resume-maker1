import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './Inputs';
import { validateEmail } from '../utils/helper';
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';
import { UserContext } from '../context/userContext';
import { UserPlus, ArrowRight, Loader2 } from 'lucide-react';

const SignUp = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!fullName) {
      setError('Please enter full name.');
      setIsLoading(false);
      return;
    }
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
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });
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
    <div className="w-100  pl-10 pr-10 pt-5 pb-5 bg-white rounded-xl shadow-md border border-blue-100">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
          <UserPlus className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-blue-900 mb-1">Create Account</h3>
        <p className="text-sm text-blue-700/80">Join thousands of professionals today</p>
      </div>
      
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-3">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />
          
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="email@example.com"
            type="email"
          />
          
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />
        </div>

        {error && (
          <div className="text-xs text-red-500 bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-md transition-all duration-200 text-sm ${
            isLoading ? 'opacity-90 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <div className="text-center text-xs text-blue-700/80">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentPage('login')}
            className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;