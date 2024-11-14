import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const AvatarContext = createContext();

export const useAvatar = () => {
  return useContext(AvatarContext);
};

export const AvatarProvider = ({ children }) => {
  const [avatarId, setAvatarId] = useState(null);

  // Load avatarId from local storage when the component mounts
  useEffect(() => {
    const storedAvatarId = localStorage.getItem('avatarId');
    if (storedAvatarId) {
      setAvatarId(JSON.parse(storedAvatarId));
    }
  }, []);

  const login = (id) => {
    setAvatarId(id);
    localStorage.setItem('avatarId', JSON.stringify(id)); // Store avatarId in local storage
  };

  const logout = () => {
    setAvatarId(null);
    localStorage.removeItem('avatarId'); // Remove avatarId from local storage on logout
  };

  return (
    <AvatarContext.Provider value={{ avatarId, login, logout }}>
      {children}
    </AvatarContext.Provider>
  );
};

// PropTypes validation
AvatarProvider.propTypes = {
  children: PropTypes.node.isRequired, // This validates that children are passed as valid React nodes
};
