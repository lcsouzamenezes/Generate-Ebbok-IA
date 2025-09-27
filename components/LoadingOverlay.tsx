import React from 'react';

interface LoadingOverlayProps {
    messages: string[];
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ messages }) => {
    const currentMessage = messages[messages.length - 1] || 'Iniciando a criação...';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50 text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-400 mb-6"></div>
            <h2 className="text-2xl font-bold mb-2">Criando seu e-book...</h2>
            <p className="text-lg text-gray-300 transition-opacity duration-500">{currentMessage}</p>
        </div>
    );
};

export default LoadingOverlay;
