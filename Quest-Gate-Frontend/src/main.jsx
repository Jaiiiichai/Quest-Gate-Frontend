// index.js or main.jsx
import { createRoot } from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Create root from container

root.render(
  <BrowserRouter future={{
    v7_relativeSplatPath: true,
  }}>
    <App />
  </BrowserRouter>
);
