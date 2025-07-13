// Mock API
export const login = async ({ email, password }) => {
    console.log('Logging in with:', { email, password });
  
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Mock logic: check credentials
    if (email === 'unverified@example.com' && password === 'password') {
        const error: any = new Error('Account not verified');
        error.code = 'ACCOUNT_NOT_VERIFIED';
        throw error;
    } else if (email === 'cliente@example.com' && password === 'password') {
      return {
        token: 'fake-auth-token-cliente',
        userType: 'cliente',
        user: {
          id: 'user-1',
          name: 'Juan Cliente',
          email: 'cliente@example.com',
        },
      };
    } else if (email === 'profesional@example.com' && password === 'password') {
      return {
        token: 'fake-auth-token-profesional',
        userType: 'profesional',
        user: {
          id: 'prof-1',
          name: 'Dra. Ana Profesional',
          email: 'profesional@example.com',
        },
      };
    } else {
      throw new Error('Invalid credentials');
    }
  };
  
  export const register = async (userData) => {
    console.log('Registering user with data:', userData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate a successful registration
    return {
      token: 'new-fake-auth-token',
      user: {
        id: 'user-new',
        ...userData,
      },
    };
  };
  
  export const requestPasswordReset = async (email: string) => {
    console.log('Password reset requested for:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate success, always return a success message
    return { message: 'If an account with this email exists, a password reset link has been sent.' };
  };

  export const resendVerificationEmail = async (email: string) => {
    console.log('Resending verification email to:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate success
    return { message: 'Verification email resent successfully.' };
    };
  
  export const checkAuth = async (token) => {
    console.log('Checking auth status for token:', token);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (token && token.startsWith('fake-auth-token')) {
      const userType = token.includes('cliente') ? 'cliente' : 'profesional';
      return {
        isAuthenticated: true,
        userType,
        user: {
          id: userType === 'cliente' ? 'user-1' : 'prof-1',
          name: userType === 'cliente' ? 'Juan Cliente' : 'Dra. Ana Profesional',
        },
      };
    }
    return { isAuthenticated: false };
  };
  
  export const logout = async () => {
    console.log('Logging out');
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simulate clearing session
    return { message: 'Logged out successfully.' };
  };
  
  export const verifyEmailToken = async (token: string) => {
    console.log('Verifying email with token:', token);
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    if (token === 'valid-token') {
      return { message: 'Email verified successfully.' };
    } else {
      throw new Error('Invalid or expired token.');
    }
  };

  export const googleLogin = async (response) => {
    console.log('Google login response:', response);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Here you would send the response.credential to your backend
    // The backend would verify the token with Google and create/login the user
    // For now, we'll simulate a successful login
    return {
      token: 'fake-google-auth-token',
      userType: 'cliente', // or 'profesional', you might need a step to ask the user for this
      user: {
        id: 'google-user-1',
        name: 'Google User',
        email: 'googleuser@example.com',
      },
    };
  };
  