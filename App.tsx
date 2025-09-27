import React, { useState, useCallback } from 'react';
import { Ebook, ContentBlock } from './types';
import { generateStructure, generateText, generateImage } from './services/geminiService';
import { parseMarkdownToContentBlocks } from './utils/parser';
import IdeaForm from './components/IdeaForm';
import LoadingOverlay from './components/LoadingOverlay';
import EbookViewer from './components/EbookViewer';
import { demoEbook } from './utils/demoData';

declare const jspdf: any;
declare const html2canvas: any;

const App: React.FC = () => {
    const [idea, setIdea] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessages, setLoadingMessages] = useState<string[]>([]);
    const [ebook, setEbook] = useState<Ebook | null>(null);
    const [error, setError] = useState<string | null>(null);

    const addLoadingMessage = (message: string) => {
        setLoadingMessages(prev => [...prev, message]);
    };

    const handleGenerateEbook = useCallback(async () => {
        if (!idea.trim()) return;

        setIsLoading(true);
        setEbook(null);
        setError(null);
        setLoadingMessages([]);

        try {
            addLoadingMessage('Analisando sua ideia...');
            const structure = await generateStructure(idea);
            
            addLoadingMessage('Criando um título criativo...');
            let ebookData: Ebook = {
                title: [{ id: 'title-1', tag: 'h1', content: structure.title, styles: { fontSize: '4rem', textAlign: 'left', top: '75%', left: '10%' }, draggable: true }],
                author: [{ id: 'author-1', tag: 'p', content: 'Gerado por IA', styles: { fontSize: '1.5rem', textAlign: 'center' } }],
                coverImagePrompt: structure.coverImagePrompt,
                coverImageUrl: '',
                chapters: structure.chapters.map((c, i) => ({ 
                    ...c,
                    title: [{ id: `ch-title-${i}`, tag: 'h2', content: c.title, styles: { fontSize: '2.5rem', textAlign: 'left' } }],
                    content: [], 
                    imageUrl: '' 
                }))
            };

            addLoadingMessage('Gerando imagem da capa...');
            const coverImage = await generateImage(structure.coverImagePrompt, '3:4');
            ebookData.coverImageUrl = coverImage;
            setEbook({ ...ebookData });

            for (let i = 0; i < ebookData.chapters.length; i++) {
                const chapter = ebookData.chapters[i];
                addLoadingMessage(`Escrevendo capítulo ${i + 1}: ${chapter.title[0].content}...`);
                const contentText = await generateText(chapter.contentPrompt);
                chapter.content = parseMarkdownToContentBlocks(contentText);
                setEbook({ ...ebookData });

                addLoadingMessage(`Criando imagem para o capítulo ${i + 1}...`);
                const chapterImage = await generateImage(chapter.imagePrompt, '4:3');
                chapter.imageUrl = chapterImage;
                setEbook({ ...ebookData });
            }

        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao gerar o e-book. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    }, [idea]);

    const handleLoadDemo = () => {
        setEbook(demoEbook);
    };
    
    const handleEbookUpdate = useCallback((updatedBlock: ContentBlock) => {
        setEbook(currentEbook => {
            if (!currentEbook) return null;

            const updateBlocks = (blocks: ContentBlock[]) => {
                let found = false;
                const newBlocks = blocks.map(b => {
                    if (b.id === updatedBlock.id) {
                        found = true;
                        return updatedBlock;
                    }
                    return b;
                });
                return found ? newBlocks : blocks;
            };

            let newEbook = { ...currentEbook };
            
            newEbook.title = updateBlocks(newEbook.title);
            newEbook.author = updateBlocks(newEbook.author);
            newEbook.chapters = newEbook.chapters.map(chapter => {
                const newTitle = updateBlocks(chapter.title);
                const newContent = updateBlocks(chapter.content);
                if (newTitle !== chapter.title || newContent !== chapter.content) {
                    return { ...chapter, title: newTitle, content: newContent };
                }
                return chapter;
            });

            return newEbook;
        });
    }, []);

    const handleRegenerateImage = async (path: 'cover' | `chapters.${number}`) => {
        if (!ebook) return;

        const newEbook = JSON.parse(JSON.stringify(ebook));
        let prompt: string = '';
        let aspectRatio: '3:4' | '4:3' = '4:3';

        if (path === 'cover') {
            prompt = newEbook.coverImagePrompt;
            aspectRatio = '3:4';
            newEbook.coverImageUrl = 'loading';
        } else {
            const index = parseInt(path.split('.')[1]);
            prompt = newEbook.chapters[index].imagePrompt;
            newEbook.chapters[index].imageUrl = 'loading';
        }
        
        setEbook(newEbook);

        try {
            const newImage = await generateImage(prompt, aspectRatio);
            const finalEbook = JSON.parse(JSON.stringify(newEbook));
            if (path === 'cover') {
                finalEbook.coverImageUrl = newImage;
            } else {
                const index = parseInt(path.split('.')[1]);
                finalEbook.chapters[index].imageUrl = newImage;
            }
            setEbook(finalEbook);
        } catch (err) {
            console.error(err);
            setError('Falha ao gerar nova imagem.');
            setEbook(ebook);
        }
    };

    const handleDownloadPdf = async () => {
        const pages = document.querySelectorAll('.ebook-page-container');
        if (pages.length === 0) return;

        const { jsPDF } = jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            await html2canvas(page, { scale: 3, useCORS: true }).then(canvas => {
                if (i > 0) {
                    pdf.addPage();
                }
                const imgData = canvas.toDataURL('image/jpeg', 0.98);
                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            });
        }
        pdf.save('seu-ebook-ia.pdf');
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
            {isLoading && <LoadingOverlay messages={loadingMessages} />}
            <header className="bg-white shadow-md p-4">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold text-center text-indigo-600">
                        Gerador de E-books com IA
                    </h1>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                {!ebook && (
                    <IdeaForm 
                        idea={idea}
                        setIdea={setIdea}
                        onGenerate={handleGenerateEbook}
                        isLoading={isLoading}
                        onLoadDemo={handleLoadDemo}
                    />
                )}

                {error && (
                    <div className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                        <strong>Erro:</strong> {error}
                    </div>
                )}

                {ebook && (
                    <div className="w-full">
                         <div className="flex justify-center items-center gap-4 my-6">
                            <button
                                onClick={() => setEbook(null)}
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300"
                            >
                                Criar Novo E-book
                            </button>
                            <button
                                onClick={handleDownloadPdf}
                                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300"
                            >
                                Baixar como PDF
                            </button>
                        </div>
                        <EbookViewer 
                            ebook={ebook} 
                            onUpdate={handleEbookUpdate}
                            onRegenerateImage={handleRegenerateImage}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
