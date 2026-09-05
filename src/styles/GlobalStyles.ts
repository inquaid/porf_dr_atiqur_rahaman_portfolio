import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.4s ease, color 0.3s ease;
    scroll-behavior: auto;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    overscroll-behavior-y: none;
    scroll-padding-top: 0;
  }

  body {
    line-height: 1.5;
    min-height: 100vh;
    position: relative;
    overflow-y: auto;
    margin: 0 !important;
    padding: 0 !important;
  }

  #root {
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Oswald', sans-serif;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.5px;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    cursor: pointer;
  }
  
  /* Remove default margin and padding from all elements */
  /* This helps prevent unexpected spacing */
  header, nav, main, footer, section, article, div {
    margin: 0;
    padding: 0;
  }
  
  /* Fix scroll issues */
  html {
    scroll-padding-top: 0;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 1400px) {
      font-size: 15.5px;
    }
    
    @media (max-width: 1200px) {
      font-size: 15px;
    }
    
    @media (max-width: 992px) {
      font-size: 14px;
    }
    
    @media (max-width: 768px) {
      font-size: 13px;
    }
    
    @media (max-width: 576px) {
      font-size: 12px;
    }
  }

  ul, ol {
    list-style: none;
  }

  button, input, textarea {
    outline: none;
    border: none;
  }

  h1 {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
  }
  
  h2 {
    font-size: clamp(1.5rem, 4vw, 2rem);
  }
  
  h3 {
    font-size: clamp(1.3rem, 3vw, 1.75rem);
  }
  
  h4 {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
  }
  
  img, svg {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
  
  /* Improve scrollbar appearance */
  ::-webkit-scrollbar {
    width: clamp(5px, 0.5vw, 8px);
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => `${theme.secondaryBackground}40`};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 4px;
  }
  
  /* Ensure all elements can be tabbed to */
  a:focus, button:focus, input:focus, select:focus, textarea:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
  
  /* Smooth transitions scoped strictly to interactive elements */
  a, button, input, textarea, select, [role="button"] {
    transition-property: background-color, border-color, color, box-shadow, opacity, transform;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }
  
  /* Performance: GPU acceleration for animated elements */
  [data-animate="true"],
  .animate-on-scroll,
  .gpu-accelerated {
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  
  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  /* Better text rendering */
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  /* Selection styling */
  ::selection {
    background: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

export default GlobalStyles;
