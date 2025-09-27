import React from 'react';
import { PageContent, ContentBlock } from '../types';
import StyledEditableText from './StyledEditableText';
import EditableImage from './EditableImage';

interface EbookPageProps {
    pageNumber: number;
    totalPages: number;
    pageContent: PageContent;
    onUpdate: (block: ContentBlock) => void;
    onRegenerateImage: (path: 'cover' | `chapters.${number}`) => void;
}

const EbookPage: React.FC<EbookPageProps> = ({ pageNumber, totalPages, pageContent, onUpdate, onRegenerateImage }) => {
    
    const renderPageContent = () => {
        const { type, contentBlocks } = pageContent;

        const renderBlocks = (blocks: ContentBlock[]) => 
            blocks.map(block => (
                <StyledEditableText key={block.id} block={block} onUpdate={onUpdate} />
        ));

        switch(type) {
            case 'cover':
                return (
                    <div className="relative w-full h-full text-white">
                        {pageContent.imageUrl && (
                            <EditableImage
                                src={pageContent.imageUrl}
                                alt="Capa do E-book"
                                onRegenerate={() => onRegenerateImage(pageContent.path as 'cover')}
                                aspectRatio={pageContent.aspectRatio}
                                className="!absolute !inset-0 !w-full !h-full !rounded-none object-cover"
                            />
                        )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                         <div className="absolute inset-0">
                            {renderBlocks(contentBlocks)}
                        </div>
                    </div>
                );

            case 'title-page':
                const authorBlocks = contentBlocks.filter(b => b.id.includes('author'));
                const titleBlocks = contentBlocks.filter(b => b.id.includes('title'));
                return (
                    <div className="flex flex-col h-full justify-center items-center text-center p-12 font-serif">
                        <div className="mb-24">{renderBlocks(authorBlocks)}</div>
                        <div>{renderBlocks(titleBlocks)}</div>
                    </div>
                );

            case 'toc':
                return (
                     <div className="h-full p-12 font-serif">
                        <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-2 pb-2">Sumário</h2>
                        <ol className="space-y-4">
                            {pageContent.chapters?.map((chapter, index) => (
                                <li key={index} className="flex flex-col text-xl">
                                    <div className="flex items-baseline">
                                        <span className="font-semibold mr-2">Capítulo {index + 1}:</span>
                                        {renderBlocks(chapter.title)}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                );

            case 'chapter-start':
                return (
                     <div className="flex flex-col h-full p-12 font-serif">
                        {pageContent.imageUrl && (
                            <div className="mb-6">
                                <EditableImage
                                    src={pageContent.imageUrl}
                                    alt={`Ilustração para o capítulo`}
                                    onRegenerate={() => onRegenerateImage(pageContent.path as `chapters.${number}`)}
                                    aspectRatio={pageContent.aspectRatio}
                                />
                            </div>
                        )}
                        <div className="flex items-baseline gap-3 mb-4">
                             <h2 className="text-4xl font-bold text-gray-800">Capítulo {pageContent.chapterNumber}:</h2>
                             {renderBlocks(contentBlocks)}
                        </div>
                         <div className="text-lg text-gray-700 leading-relaxed">
                            {/* Content for chapter start can be added here if needed */}
                        </div>
                    </div>
                );

            case 'content':
                return (
                    <div className="h-full p-12 font-serif text-lg">
                        {/* IMPROVEMENT: Removed spacing/typography classes to allow StyledEditableText to control margins for better consistency. */}
                        <div>
                           {renderBlocks(contentBlocks)}
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="ebook-page-container w-[210mm] h-[297mm] bg-white shadow-lg my-8 mx-auto flex flex-col relative">
            <div className="flex-grow overflow-hidden">
                {renderPageContent()}
            </div>
            <footer className="text-center text-sm text-gray-400 p-4 font-sans">
                <p>{pageNumber}</p>
            </footer>
        </div>
    );
};

export default EbookPage;