import { useState, useEffect, useCallback, RefObject } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DraggableOptions {
  ref: RefObject<HTMLElement>;
  initialPos: Position;
  onDragEnd: (pos: Position) => void;
}

export const useDraggable = ({ ref, initialPos, onDragEnd }: DraggableOptions) => {
  const [position, setPosition] = useState(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition(initialPos);
  }, [initialPos.x, initialPos.y]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);

    const parentRect = ref.current.offsetParent?.getBoundingClientRect();
    if (!parentRect) return;

    // Calculate mouse position relative to the element's parent in percentage
    const initialMouseX = ((e.clientX - parentRect.left) / parentRect.width) * 100;
    const initialMouseY = ((e.clientY - parentRect.top) / parentRect.height) * 100;
    
    setOffset({
      x: initialMouseX - position.x,
      y: initialMouseY - position.y,
    });

  }, [ref, position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !ref.current) return;
    
    e.preventDefault();

    const parentRect = ref.current.offsetParent?.getBoundingClientRect();
    if (!parentRect) return;
    
    const newX = ((e.clientX - parentRect.left) / parentRect.width) * 100 - offset.x;
    const newY = ((e.clientY - parentRect.top) / parentRect.height) * 100 - offset.y;

    setPosition({ x: newX, y: newY });
  }, [isDragging, ref, offset]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
        onDragEnd(position);
    }
    setIsDragging(false);
  }, [isDragging, onDragEnd, position]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return { position, handleMouseDown };
};
