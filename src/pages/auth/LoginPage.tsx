import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CircleDollarSign, Building2, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Dummy OTP countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      // Dummy login
      await login(email, password, role);
      setStep('otp');
      setIsLoading(false);
      setOtpTimer(60);
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } else {
      setError('Invalid OTP');
    }
  };

  const fillDemoCredentials = (userRole: UserRole) => {
    if (userRole === 'entrepreneur') {
      setEmail('sarah@techwave.io');
      setPassword('password123');
    } else {
      setEmail('michael@vcinnovate.com');
      setPassword('password123');
    }
    setRole(userRole);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-xl p-8">
      

          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
            {step === 'login' ? 'Sign in to Business Nexus' : 'Verify OTP'}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {step === 'login' ? 'Connect with investors and entrepreneurs' : 'Enter the OTP sent to your email'}
          </p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-md flex items-start">
              <AlertCircle size={18} className="mr-2 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {step === 'login' && (
            <>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Role Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-lg flex items-center justify-center font-medium transition transform hover:scale-105 ${
                      role === 'entrepreneur'
                        ? 'bg-primary-50 border border-primary-500 text-primary-700'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setRole('entrepreneur')}
                  >
                    <Building2 size={18} className="mr-2" /> Entrepreneur
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-lg flex items-center justify-center font-medium transition transform hover:scale-105 ${
                      role === 'investor'
                        ? 'bg-primary-50 border border-primary-500 text-primary-700'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setRole('investor')}
                  >
                    <CircleDollarSign size={18} className="mr-2" /> Investor
                  </button>
                </div>

                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth startAdornment={<User size={18} />} />
                <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />

                <Button type="submit" fullWidth isLoading={isLoading} leftIcon={<LogIn size={18} />}>
                  Sign In
                </Button>
              </form>

              {/* Demo accounts */}
              <div className="mt-6 text-center">
                <span className="text-sm text-gray-500">Demo Accounts</span>
                <div className="mt-2 flex gap-2 justify-center">
                  <Button variant="outline" onClick={() => fillDemoCredentials('entrepreneur')} leftIcon={<Building2 size={16} />}>
                    Entrepreneur Demo
                  </Button>
                  <Button variant="outline" onClick={() => fillDemoCredentials('investor')} leftIcon={<CircleDollarSign size={16} />}>
                    Investor Demo
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === 'otp' && (
            <form className="space-y-4" onSubmit={handleOtpSubmit}>
              <Input label="OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} fullWidth />
              <Button type="submit" fullWidth>
                Verify OTP
              </Button>
              <div className="text-center text-gray-500 text-sm">
                Demo OTP: <strong>123456</strong> | Expires in {otpTimer}s
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
