import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './FloatingTextHandler.css';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  type: 'click' | 'scrap' | 'metal' | 'steel'; // Tipos más específicos
}

const FloatingTextHandler: React.FC = () => {
  const [texts, setTexts] = useState<FloatingText[]>([]);

  const showFloatingText = useCallback((e: MouseEvent, textToShow: string, type: FloatingText['type'] = 'click') => {
    const newText: FloatingText = {
      id: Date.now(),
      text: textToShow,
      x: e.clientX,
      y: e.clientY,
      type: type,
    };
    setTexts(currentTexts => [...currentTexts, newText]);
  }, []);

  useEffect(() => {
    const handleCustomTextEvent = ((e: CustomEvent) => {
      showFloatingText(e.detail.originalEvent, e.detail.text, e.detail.type);
    }) as EventListener;
    
    document.addEventListener('showFloatingText', handleCustomTextEvent);

    return () => {
      document.removeEventListener('showFloatingText', handleCustomTextEvent);
    };
  }, [showFloatingText]);
  
  // Limpia los textos del DOM después de que la animación termine (3 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      setTexts(currentTexts => currentTexts.filter(t => (Date.now() - t.id) < 3000));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return ReactDOM.createPortal(
    <>
      {texts.map(text => (
        <span 
          key={text.id} 
          className={`floating-text auto ${text.type !== 'click' ? text.type : ''}`} // Aplicar clases scrap, metal, steel
          style={{ 
            left: text.x, 
            top: text.y, 
          }}
        >
          {text.text}
        </span>
      ))}
    </>,
    document.body
  );
};
export default FloatingTextHandler;