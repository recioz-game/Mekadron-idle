// src/hooks/useDragToScroll.ts
import { useRef, useEffect } from 'react';

export const useDragToScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDragging = false;
    let startX: number, scrollLeft: number, startY: number, scrollTop: number;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      // Captura de posición inicial para X e Y
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      startY = e.pageY - el.offsetTop;
      scrollTop = el.scrollTop;
      document.body.classList.add('grabbing');
    };

    const onMouseLeaveOrUp = () => {
      isDragging = false;
      document.body.classList.remove('grabbing'); // Limpia la clase
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      // Scroll Horizontal
      const x = e.pageX - el.offsetLeft;
      const walkX = (x - startX) * 2; // El *2 es para que el scroll sea más rápido
      el.scrollLeft = scrollLeft - walkX;

      // Scroll Vertical
      const y = e.pageY - el.offsetTop;
      const walkY = (y - startY) * 2;
      el.scrollTop = scrollTop - walkY;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeaveOrUp);
    el.addEventListener('mouseup', onMouseLeaveOrUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeaveOrUp);
      el.removeEventListener('mouseup', onMouseLeaveOrUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return ref;
};
