import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, HelpCircle, Timer, Phone } from 'lucide-react';
import BackgroundImage from './Home/BackgroundImage';
import Navbar from './Home/Navbar';

const SignInPage = ({ switchToSignUp }) => {
    const [mode, setMode] = useState('phone'); // 'phone' or 'otp'
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const MAX_ATTEMPTS = 3;
    const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
    const [timeLeft, setTimeLeft] = useState(300);
    const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

    useEffect(() => {
        if (mode === 'otp' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [mode, timeLeft]);

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

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d+$/.test(paste)) {
            const newOTP = [...paste.split(''), ...Array(6 - paste.length).fill('')];
            setOtp(newOTP);
            inputRefs.current[Math.min(paste.length, 5)].current.focus();
        }
    };

    const handleOTPChange = (index, value) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOtp(newOTP);

        if (value && index < 5) {
            inputRefs.current[index + 1].current.focus();
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
                {/* <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                </label> */}
                <div className="relative bg-white rounded-lg shadow-xl p-5 w-96">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold">Get Started</h2>
                        <HelpCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-3">
                        Enter a mobile number or restaurant ID to continue
                    </p>
                    <input
                        type="tel"
                        placeholder="Enter Restaurant ID / Mobile number"
                        className="w-full p-3 border rounded-md mb-4"
                        id="phone"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        maxLength="10"
                    />
                    {/* <button className="w-full bg-orange-500 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors">
                        Continue
                        <ArrowRight className="h-4 w-4" />
                    </button> */}
                    <p className="text-sm text-gray-500 mt-1">
                        By logging in, I agree to the terms & conditions
                    </p>
                </div>
                {/* <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 9876-765-567"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        maxLength="10"
                    />
                </div> */}
                {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                // className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading
                //     ? 'bg-blue-400 cursor-not-allowed'
                //     : 'bg-blue-600 hover:bg-blue-700'
                //     }`}
                className='w-full bg-orange-500 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors'
            >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
                <ArrowRight className="h-4 w-4" />
            </button>

            {/* <div className="mt-4 text-center">
                <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-500"
                    onClick={switchToSignUp}
                >
                    Create an account
                </button>
            </div> */}
        </form>
    );

    const renderOTPView = () => (
        <form onSubmit={handleOTPVerification} className="space-y-4">
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Enter 6-Digit OTP</span>
                    <div className="flex items-center text-orange-600">
                        <Timer className="w-4 h-4 mr-1" />
                        <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-orange-50 p-3 rounded-lg mb-4">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <span className="text-sm">Sent to +91 {phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1••••$3')}</span>
                </div>

                <div className="flex justify-between gap-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={inputRefs.current[index]}
                            type="text"
                            maxLength="1"
                            className="w-14 h-14 text-center text-xl border-2 rounded-lg transition-all
                                focus:border-orange-500 focus:ring-2 focus:ring-orange-200
                                invalid:border-red-500 invalid:ring-red-200"
                            value={digit}
                            onChange={(e) => handleOTPChange(index, e.target.value.replace(/\D/g, ''))}
                            onKeyDown={(e) => e.key === 'Backspace' && !digit && index > 0 && inputRefs.current[index - 1].current.focus()}
                            onPaste={handlePaste}
                        />
                    ))}
                </div>

                {attempts < MAX_ATTEMPTS && (
                    <p className="text-orange-600 text-sm text-center">
                        {attempts} attempts remaining
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading || timeLeft === 0}
                className="w-full py-4 text-white bg-orange-500 rounded-lg 
             hover:bg-orange-600 transition-all transform hover:scale-[1.02]
             disabled:bg-gray-400 disabled:cursor-not-allowed
             flex items-center justify-center gap-2">
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                    </span>
                ) : 'Verify OTP'}
            </button>

            <div className="mt-4 text-center space-y-2">
                <button
                    type="button"
                    className="text-sm text-orange hover:text-orange-900 transition-colors"
                    onClick={resendOTP}
                    disabled={isLoading}
                >
                    Resend OTP
                </button>
                <button
                    type="button"
                    // className="text-sm text-gray-500 hover:text-gray-700 block mx-auto"
                    className="text-sm text-orange hover:text-orange-900 block mx-auto transition-colors"
                    onClick={() => setMode('phone')}
                >
                    Change Phone Number
                </button>
            </div>
        </form>
    );

    return (
        <>
            <Navbar />
            <BackgroundImage />
            <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl w-full max-w-md p-8">
                    <div className="flex flex-col items-center mb-6">
                        {/* <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                            <Phone className="w-6 h-6 text-white" />
                        </div> */}
                        {/* <h1 className="text-2xl font-bold text-center">
                            {mode === 'phone' ? 'Sign In with Phone' : 'Verify OTP'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {mode === 'phone'
                                ? 'Enter your phone number'
                                : `OTP sent to ${phoneNumber}`}
                        </p> */}
                    </div>

                    {errors.submit && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                            {errors.submit}
                        </div>
                    )}

                    {mode === 'phone' ? renderPhoneNumberView() : renderOTPView()}
                </div>
            </div>
        </>
    );
};

export default SignInPage;