
export interface StyleProperties {
    fontSize?: string;
    fontFamily?: string;
    textAlign?: 'left' | 'center' | 'right';
    top?: string;
    left?: string;
    color?: string;
    textShadow?: string;
}

export interface ContentBlock {
    id: string;
    tag: 'h1' | 'h2' | 'h3' | 'p';
    content: string; // HTML content
    styles: StyleProperties;
    draggable?: boolean;
}

export interface EbookStructure {
  title: string;
  coverImagePrompt: string;
  chapters: ChapterStructure[];
}

export interface ChapterStructure {
  title: string;
  contentPrompt: string;
  imagePrompt: string;
}

// FIX: Re-defined Chapter interface to not extend ChapterStructure, avoiding the 'title' property type conflict.
// All required properties are now explicitly defined.
export interface Chapter {
  title: ContentBlock[];
  contentPrompt: string;
  imagePrompt: string;
  content: ContentBlock[];
  imageUrl: string;
}

export interface Ebook {
  title: ContentBlock[];
  author: ContentBlock[];
  coverImagePrompt: string;
  coverImageUrl: string;
  chapters: Chapter[];
}

export interface PageContent {
    type: 'cover' | 'title-page' | 'toc' | 'chapter-start' | 'content';
    path: 'cover' | `chapters.${number}`;
    
    // Cover
    imageUrl?: string;
    imagePrompt?: string;
    aspectRatio?: '3:4' | '4:3';
    
    // Title, Author, Content
    contentBlocks: ContentBlock[];

    // TOC
    chapters?: Chapter[];
    onUpdate?: (updatedBlock: ContentBlock) => void;
    
    // Chapter Start
    chapterNumber?: number;
}