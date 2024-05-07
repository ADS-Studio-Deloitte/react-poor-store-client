import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { getUser, resetUser, userPool } from './cognitoConfig';

// Create a new context for the AuthProvider
const AuthContext = createContext<any>({});

// Define the AuthProvider component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [newPasswordRequired, setNewPasswordRequired] = useState<false | {user: CognitoUser, userAttributes: any}>(false);
	const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false);

	useEffect(() => {
		const user = getUser();
		if (user) {
			user.getSession((err: any, session: any) => {
				if (err) {
					console.error('Error getting user session:', err);
					setIsAuthentificated(false);
				} else {
					setIsAuthentificated(true);
				}
			});
		}
	}, []);

	const login = (username: any, password: any) => {
		const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
		const authenticationDetails = new AuthenticationDetails({ Username: username, Password: password });

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: (session) => {
				setIsAuthentificated(true);
			},
			onFailure: (err: TypeError) => {
				console.error('Error logging in:', err);
			},
			newPasswordRequired: (userAttributes, requiredAttributes) => {
				setNewPasswordRequired({ user: cognitoUser, userAttributes });
			}
		});
	};

	const setNewPassword = (newPassword: string) => {
		if (newPasswordRequired) {
			const user = newPasswordRequired.user;
			user.completeNewPasswordChallenge(newPassword, newPasswordRequired.userAttributes, {
				onSuccess: (session) => {
					setIsAuthentificated(true);
					setNewPasswordRequired(false);
				},
				onFailure: (err: TypeError) => {
					console.error('Error setting new password:', err);
				},
			});
		}
	}

	// Function to handle user logout
	const logout = () => {
		const cognitoUser = getUser();
		if (cognitoUser) {
			cognitoUser.signOut();
			setIsAuthentificated(false);
			resetUser();
		}
	};

	// Provide the user and login/logout functions to the child components
	return (
		<AuthContext.Provider value={{ isAuthentificated, newPasswordRequired, setNewPassword, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
