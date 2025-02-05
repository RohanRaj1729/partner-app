import React, { useState } from 'react';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';

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
				<SignUpPage switchToSignIn={switchPage} />
			)}
		</div>
	);
};

export default HomePage;