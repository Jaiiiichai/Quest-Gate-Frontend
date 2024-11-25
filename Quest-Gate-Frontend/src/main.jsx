//index.js or main.jsx
import { createRoot } from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AvatarProvider } from './hooks/AvatarContext'; // Import AvatarProvider
// import './index.css'
const container = document.getElementById('root');
const root = createRoot(container); // Create root from container

root.render(
  <BrowserRouter>
    {/* Wrap the App with AvatarProvider */}
    <AvatarProvider>
      <App />
    </AvatarProvider>
  </BrowserRouter>
);
