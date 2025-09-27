import React, { useState } from 'react';

interface EditableImageProps {
    src: string;
    alt: string;
    onRegenerate: () => void;
    aspectRatio?: '3:4' | '4:3';
    className?: string;
}

const RegenerateIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 10M20 20l-1.5-1.5A9 9 0 003.5 14" />
    </svg>
);


const EditableImage: React.FC<EditableImageProps> = ({ src, alt, onRegenerate, aspectRatio = '4:3', className }) => {
    const isLoading = src === 'loading';
    const aspectRatioClass = aspectRatio === '3:4' ? 'aspect-[3/4]' : 'aspect-[4/3]';

    return (
        <div 
            className={`relative w-full bg-gray-200 rounded-lg overflow-hidden group ${aspectRatioClass} ${className}`}
        >
            {isLoading ? (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            )}

            {!isLoading && (
                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex justify-center items-center">
                    <button 
                        onClick={onRegenerate}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 font-semibold rounded-full shadow-md opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300"
                    >
                        <RegenerateIcon className="w-5 h-5" />
                        Gerar outra imagem
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditableImage;