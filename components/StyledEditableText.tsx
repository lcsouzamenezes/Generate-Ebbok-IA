import React, { useState, useRef, useEffect } from 'react';
import { ContentBlock } from '../types';
import { EditingToolbar } from './EditingToolbar';
import { useDraggable } from '../hooks/useDraggable';

interface StyledEditableTextProps {
    block: ContentBlock;
    onUpdate: (block: ContentBlock) => void;
}

const StyledEditableText: React.FC<StyledEditableTextProps> = ({ block, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(block.content);
    const ref = useRef<HTMLDivElement>(null);

    const { position, handleMouseDown } = useDraggable({
        ref,
        initialPos: { x: parseFloat(block.styles.left || '0'), y: parseFloat(block.styles.top || '0') },
        onDragEnd: (newPos) => {
            // FIX: Save position with '%' to enable vertical and horizontal movement correctly.
            const newStyles = { ...block.styles, left: `${newPos.x}%`, top: `${newPos.y}%` };
            onUpdate({ ...block, styles: newStyles });
        }
    });

    useEffect(() => {
        setContent(block.content);
    }, [block.content]);

    const handleFocus = () => setIsEditing(true);
    
    const handleBlur = () => {
        setIsEditing(false);
        const currentContent = ref.current?.innerHTML || content;
        if (currentContent !== block.content) {
            onUpdate({ ...block, content: currentContent });
        }
    };

    const handleStyleChange = (style: Partial<typeof block.styles>) => {
        const newStyles = { ...block.styles, ...style };
        onUpdate({ ...block, styles: newStyles });
    };

    const Tag = block.tag;

    // IMPROVEMENT: Enhanced default typography for a more professional book-like appearance.
    const style: React.CSSProperties = {
        // Default styles applied to all text blocks
        margin: 0, // Reset margin, will be controlled by tag-specific styles

        // Tag-specific base styles for better readability and structure
        ...(block.tag === 'p' && {
            textAlign: 'justify',
            lineHeight: '1.75',
            marginBottom: '1rem',
        }),
        ...(block.tag === 'h3' && {
            fontWeight: 'bold',
            marginTop: '1.5rem',
            marginBottom: '0.5rem',
            lineHeight: 1.4,
        }),
        
        // User-defined styles from the toolbar (these will override the defaults above)
        fontFamily: block.styles.fontFamily || 'serif',
        fontSize: block.styles.fontSize,
        textAlign: block.styles.textAlign, // Allows user to override justify
        color: block.styles.color,
        textShadow: block.styles.textShadow,
    };
    
    if (block.draggable) {
        style.position = 'absolute';
        style.top = `${position.y}%`;
        style.left = `${position.x}%`;
        style.cursor = isEditing ? 'text' : 'move';
        style.width = '80%';
        // Reset margins for draggable items as they are absolutely positioned
        style.marginBottom = 0; 
        style.marginTop = 0;
    }

    return (
        <div className="relative group">
            {isEditing && (
                <EditingToolbar 
                    styles={block.styles} 
                    onStyleChange={handleStyleChange}
                />
            )}
            <Tag
                ref={ref as any}
                style={style}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseDown={block.draggable ? handleMouseDown : undefined}
                className={`editable-content focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 rounded-md p-1 -m-1 transition-colors ${!isEditing ? 'hover:bg-indigo-50/50' : ''}`}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default StyledEditableText;