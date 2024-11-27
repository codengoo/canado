import { StoreProvider } from '@/store';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import HomeScreen from './screens/home';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HomeScreen />
    </StoreProvider>
  </React.StrictMode>,
);
