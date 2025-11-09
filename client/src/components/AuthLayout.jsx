import React from 'react';
import vinitamartLogo from '../assets/images/vinitamart_logo.png';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-green p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img 
              src={vinitamartLogo} 
              alt="VinitaMart" 
              className="h-16 w-auto mx-auto"
            />
          </Link>
        </div>
        <div className="bg-surface p-8 rounded-xl shadow-md border border-border">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;