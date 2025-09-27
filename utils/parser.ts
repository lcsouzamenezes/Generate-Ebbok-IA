import { ContentBlock } from '../types';

export function parseMarkdownToContentBlocks(markdown: string): ContentBlock[] {
    if (!markdown) return [];

    const blocks = markdown.split('\n\n').filter(p => p.trim() !== '');

    return blocks.map((block, index) => {
        let tag: 'h3' | 'p' = 'p';
        let content = block;

        if (content.startsWith('### ')) {
            tag = 'h3';
            content = content.substring(4);
        }

        // Convert *italic* to <em>italic</em>
        content = content.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        
        return {
            id: `block-${Date.now()}-${index}-${Math.random()}`,
            tag,
            content: content,
            styles: {},
        };
    });
}
