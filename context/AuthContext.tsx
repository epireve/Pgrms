import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types';
import { mockStudent, allMockUsers } from '../services/mockData';

interface AuthContextType {
  user: User;
  switchUser: (userId: string) => void;
  updateUser: (updatedUser: User) => void;
  allUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(mockStudent);

  const switchUser = (userId: string) => {
    const newUser = allMockUsers.find(u => u.id === userId);
    if (newUser) {
      setUser(newUser);
    }
  };

  const updateUser = (updatedUser: User) => {
    if (user.id === updatedUser.id) {
        setUser(updatedUser);
    }
    // In a real app, you'd also update the allUsers list
  }


  return (
    <AuthContext.Provider value={{ user, switchUser, updateUser, allUsers: allMockUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};