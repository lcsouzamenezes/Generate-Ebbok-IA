import React, { useMemo } from 'react';
import { Ebook, PageContent, ContentBlock } from '../types';
import EbookPage from './EbookPage';

interface EbookViewerProps {
    ebook: Ebook;
    onUpdate: (block: ContentBlock) => void;
    onRegenerateImage: (path: 'cover' | `chapters.${number}`) => void;
}

const BLOCKS_PER_PAGE = 5;

const EbookViewer: React.FC<EbookViewerProps> = ({ ebook, onUpdate, onRegenerateImage }) => {

    const paginatedContent = useMemo((): PageContent[] => {
        const pages: PageContent[] = [];

        pages.push({
            type: 'cover',
            contentBlocks: ebook.title,
            imageUrl: ebook.coverImageUrl,
            imagePrompt: ebook.coverImagePrompt,
            aspectRatio: '3:4',
            path: 'cover',
        });
        
        pages.push({
            type: 'title-page',
            contentBlocks: [...ebook.author, ...ebook.title],
            path: 'cover', 
        });
        
        // FIX: Removed the 'title' property as it does not exist in the 'PageContent' type. The title for the Table of Contents page is hardcoded in EbookPage.tsx.
        pages.push({
            type: 'toc',
            chapters: ebook.chapters,
            path: 'cover',
            onUpdate,
            contentBlocks: [],
        });


        ebook.chapters.forEach((chapter, index) => {
            const path = `chapters.${index}` as const;

            pages.push({
                type: 'chapter-start',
                contentBlocks: chapter.title,
                chapterNumber: index + 1,
                imageUrl: chapter.imageUrl,
                imagePrompt: chapter.imagePrompt,
                aspectRatio: '4:3',
                path: path,
            });

            if (chapter.content.length > 0) {
                for (let i = 0; i < chapter.content.length; i += BLOCKS_PER_PAGE) {
                    const chunk = chapter.content.slice(i, i + BLOCKS_PER_PAGE);
                    pages.push({
                        type: 'content',
                        contentBlocks: chunk,
                        path: path,
                    });
                }
            }
        });

        return pages;
    }, [ebook, onUpdate]);

    return (
        <div className="flex flex-col items-center">
            {paginatedContent.map((page, i) => (
                <EbookPage
                    key={i}
                    pageNumber={i + 1}
                    totalPages={paginatedContent.length}
                    pageContent={page}
                    onUpdate={onUpdate}
                    onRegenerateImage={onRegenerateImage}
                />
            ))}
        </div>
    );
};

export default EbookViewer;