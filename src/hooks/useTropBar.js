import { useEffect } from 'react';

export default function useTopBar(topBarRef) {
  useEffect(() => {
    const topBar = topBarRef.current;

    if (topBar) {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          topBar.classList.add('transparent');
        } else {
          topBar.classList.remove('transparent');
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Calcula la altura del topBar y ajusta el padding-top del main-content
      const topbarHeight = topBar.offsetHeight;
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.paddingTop = `${topbarHeight + 20}px`;
      }

      // Limpieza del evento al desmontar el componente
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [topBarRef]);
}
