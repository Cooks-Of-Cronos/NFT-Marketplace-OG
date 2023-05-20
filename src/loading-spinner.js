import React, { useState } from 'react';
import './loading-spinner.css';
import './styles/home.css';



const LoadingSpinner = ({ isLoading, children }) => {
    return (
        <div className="loading-spinner-container">
            {isLoading && (
                <div className="loading-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            {children}
        </div>
    );
};

export default LoadingSpinner;