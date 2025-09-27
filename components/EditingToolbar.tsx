import React from 'react';
import { StyleProperties } from '../types';

interface EditingToolbarProps {
    styles: StyleProperties;
    onStyleChange: (style: Partial<StyleProperties>) => void;
}

const FONT_FACES = ['serif', 'sans-serif', 'monospace'];
const FONT_SIZES = ['1rem', '1.2rem', '1.5rem', '2rem', '2.5rem', '3rem'];
const ALIGNMENTS: Array<StyleProperties['textAlign']> = ['left', 'center', 'right'];

const ToolbarButton = ({ children, onMouseDown, title }: { children: React.ReactNode; onMouseDown: (e: React.MouseEvent) => void; title: string }) => (
    <button
        title={title}
        onMouseDown={onMouseDown}
        className="px-2 py-1 rounded hover:bg-gray-200"
    >
        {children}
    </button>
);

export const EditingToolbar: React.FC<EditingToolbarProps> = ({ styles, onStyleChange }) => {
    
    const handleFormat = (e: React.MouseEvent, command: string, value: string | null = null) => {
        e.preventDefault();
        document.execCommand(command, false, value);
    };

    const handleLink = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = prompt('Digite a URL do link:');
        if (url) {
            document.execCommand('createLink', false, url);
        }
    }

    return (
        <div 
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md p-1 flex items-center gap-2 z-10"
            onMouseDown={(e) => e.preventDefault()} // Prevent editor from losing focus
        >
            {/* Inline Formatting */}
            <ToolbarButton onMouseDown={(e) => handleFormat(e, 'bold')} title="Negrito"><b>B</b></ToolbarButton>
            <ToolbarButton onMouseDown={(e) => handleFormat(e, 'underline')} title="Sublinhado"><u>U</u></ToolbarButton>
            <ToolbarButton onMouseDown={handleLink} title="Link">🔗</ToolbarButton>
            
            <div className="h-6 border-l border-gray-300" />
            
            {/* Block Formatting */}
            <select
                value={styles.fontFamily || 'serif'}
                onChange={(e) => onStyleChange({ fontFamily: e.target.value })}
                className="p-1 border-none bg-transparent"
            >
                {FONT_FACES.map(font => <option key={font} value={font}>{font}</option>)}
            </select>
            
            <select
                value={styles.fontSize || '1rem'}
                onChange={(e) => onStyleChange({ fontSize: e.target.value })}
                className="p-1 border-none bg-transparent"
            >
                {FONT_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
            </select>
            
             <div className="h-6 border-l border-gray-300" />
            
            <div className="flex">
                {ALIGNMENTS.map(align => (
                    <ToolbarButton
                        key={align}
                        onMouseDown={() => onStyleChange({ textAlign: align })}
                        title={`Alinhar à ${align === 'left' ? 'Esquerda' : align === 'center' ? 'Centro' : 'Direita'}`}
                    >
                        {align === 'left' ? '⇇' : align === 'center' ? '⇊' : '⇉'}
                    </ToolbarButton>
                ))}
            </div>

        </div>
    );
};
