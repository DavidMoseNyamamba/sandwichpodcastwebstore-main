import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { backendUrl, setToken } = useContext(ShopContext);
    const [isVerifying, setIsVerifying] = useState(true);
    const [verificationStatus, setVerificationStatus] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        
        if (token) {
            verifyEmail(token);
        } else {
            setIsVerifying(false);
            setVerificationStatus('error');
            toast.error('Invalid verification link');
        }
    }, [searchParams]);

    const verifyEmail = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/user/verify-email`, { token });
            
            if (response.data.success) {
                setVerificationStatus('success');
                toast.success(response.data.message);
                
                // Set token if provided (auto-login after verification)
                if (response.data.token) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                }
                
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setVerificationStatus('error');
                toast.error(response.data.message);
            }
        } catch {
            setVerificationStatus('error');
            toast.error('Verification failed. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                {isVerifying ? (
                    <div>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Verifying your email...
                        </h2>
                        <p className="text-gray-600">
                            Please wait while we verify your email address.
                        </p>
                    </div>
                ) : verificationStatus === 'success' ? (
                    <div>
                        <div className="text-green-500 text-5xl mb-4">✓</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Email Verified Successfully!
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Your email has been verified. You will be redirected to the homepage shortly.
                        </p>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Go to Homepage
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="text-red-500 text-5xl mb-4">✗</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Verification Failed
                        </h2>
                        <p className="text-gray-600 mb-4">
                            The verification link is invalid or has expired.
                        </p>
                        <button 
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Back to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailVerification;