import React, { useState } from 'react';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';
import FormPage from './FormPage';

const HomePage = () => {
	const [isSignIn, setIsSignIn] = useState(true);

	const switchPage = () => {
		setIsSignIn((prev) => !prev);
	};

	return (
		<div>
			{isSignIn ? (
				<SignInPage switchToSignUp={switchPage} />
			) : (
				<FormPage switchToSignIn={switchPage} />
			)}
		</div>
	);
};

export default HomePage;