import React from 'react';

interface IdeaFormProps {
    idea: string;
    setIdea: (idea: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    onLoadDemo: () => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ idea, setIdea, onGenerate, isLoading, onLoadDemo }) => {
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-2 text-gray-700">Qual é a sua ideia para um e-book?</h2>
            <p className="text-center text-gray-500 mb-6">Descreva o tema, o público ou qualquer detalhe que você tenha em mente. A IA cuidará do resto.</p>
            <textarea 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Ex: 'Um guia de jardinagem para iniciantes que moram em apartamentos' ou 'Uma história de ficção científica sobre robôs com sentimentos'"
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none bg-white text-gray-900"
                disabled={isLoading}
            />
            <button
                onClick={onGenerate}
                disabled={!idea.trim() || isLoading}
                className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300"
            >
                {isLoading ? 'Gerando...' : 'Criar Meu E-book'}
            </button>
            <div className="text-center mt-4 text-gray-500">
                ou
            </div>
            <button
                onClick={onLoadDemo}
                disabled={isLoading}
                className="w-full mt-4 py-3 px-4 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300"
            >
                Carregar Demo
            </button>
        </div>
    );
};

export default IdeaForm;