import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock API base URL - replace with actual backend
  const API_BASE = 'https://9yhyi3cpmqpx.manus.space/api';

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // For demo purposes, check demo credentials first
      if (email === 'demo@company.com' && password === 'demo123') {
        const demoUser = {
          id: 1,
          email: 'demo@company.com',
          name: 'Demo User',
          role: 'employee',
          progress: {
            completedCourses: 1,
            totalCourses: 6,
            badges: ['AI Basics', 'GDPR Compliance'],
            currentStreak: 5
          }
        };
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify(demoUser));
        setUser(demoUser);
        return { success: true };
      }

      // Try external API for other credentials
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProgress = (courseId, lessonId) => {
    if (user) {
      const updatedUser = { ...user };
      if (!updatedUser.progress.completedLessons) {
        updatedUser.progress.completedLessons = [];
      }
      if (!updatedUser.progress.completedLessons.includes(`${courseId}-${lessonId}`)) {
        updatedUser.progress.completedLessons.push(`${courseId}-${lessonId}`);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProgress,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

