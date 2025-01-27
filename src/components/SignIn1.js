import React, { useState } from 'react';
import { Phone, Lock } from 'lucide-react';

const SignInPage = ({ switchToSignUp }) => {
  const [mode, setMode] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = () => {
    const newErrors = {};
    
    // Basic phone number validation (adjust regex as needed)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!validatePhoneNumber()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMode('otp');
    } catch (error) {
      setErrors({ submit: 'Failed to send OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    
    // Validate OTP (all fields filled)
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setErrors({ otp: 'Please enter the complete 6-digit OTP' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Signed in successfully with OTP');
    } catch (error) {
      setErrors({ submit: 'Invalid OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Reset OTP fields
      setOtp(['', '', '', '', '', '']);
    } catch (error) {
      setErrors({ submit: 'Failed to resend OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderPhoneNumberView = () => (
    <form onSubmit={handleSendOTP} className="space-y-4">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            maxLength="10"
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isLoading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Sending OTP...' : 'Send OTP'}
      </button>

      <div className="mt-4 text-center">
        <button 
          type="button"
          className="text-sm text-blue-600 hover:text-blue-500"
          onClick={switchToSignUp}
        >
          Create an account
        </button>
      </div>
    </form>
  );

  const renderOTPView = () => (
    <form onSubmit={handleOTPVerification} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter 6-Digit OTP
        </label>
        <div className="flex justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              className="w-10 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
            />
          ))}
        </div>
        {errors.otp && (
          <p className="text-sm text-red-500 mt-1 text-center">{errors.otp}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isLoading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>

      <div className="mt-4 text-center space-y-2">
        <button 
          type="button"
          className="text-sm text-blue-600 hover:text-blue-500"
          onClick={resendOTP}
          disabled={isLoading}
        >
          Resend OTP
        </button>
        <button 
          type="button"
          className="text-sm text-gray-500 hover:text-gray-700 block mx-auto"
          onClick={() => setMode('phone')}
        >
          Change Phone Number
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-center">
            {mode === 'phone' ? 'Sign In with Phone' : 'Verify OTP'}
          </h1>
          <p className="text-sm text-gray-500">
            {mode === 'phone' 
              ? 'Enter your phone number' 
              : `OTP sent to ${phoneNumber}`}
          </p>
        </div>

        {errors.submit && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {errors.submit}
          </div>
        )}

        {mode === 'phone' ? renderPhoneNumberView() : renderOTPView()}
      </div>
    </div>
  );
};

export default SignInPage;