import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
}

const FloatingTextHandler: React.FC = () => {
  const [texts, setTexts] = useState<FloatingText[]>([]);

  const showFloatingText = useCallback((e: MouseEvent) => {
    const newText: FloatingText = {
      id: Date.now(),
      text: '+1',
      x: e.clientX,
      y: e.clientY,
    };
    setTexts(currentTexts => [...currentTexts, newText]);
  }, []);

  useEffect(() => {
    const targetElement = document.getElementById('collection-button');
    if (targetElement) {
      targetElement.addEventListener('click', showFloatingText as EventListener);
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener('click', showFloatingText as EventListener);
      }
    };
  }, [showFloatingText]);
  
  // Limpia los textos del DOM después de que la animación termine
  useEffect(() => {
    const interval = setInterval(() => {
      setTexts(currentTexts => currentTexts.filter(t => (Date.now() - t.id) < 1500)); // 1.5s
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return ReactDOM.createPortal(
    <>
      {texts.map(text => (
        <span 
          key={text.id} 
          className="floating-text"
          style={{ left: text.x, top: text.y }}
        >
          {text.text}
        </span>
      ))}
    </>,
    document.body
  );
};

export default FloatingTextHandler;
