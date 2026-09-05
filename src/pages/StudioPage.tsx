import React from 'react';
import { Studio } from 'sanity';
import sanityConfig from '../../sanity.config';

const StudioPage: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: '#101112',
      }}
    >
      <Studio config={sanityConfig} />
    </div>
  );
};

export default StudioPage;
