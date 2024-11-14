import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const AvatarContext = createContext();

export const useAvatar = () => {
  return useContext(AvatarContext);
};

export const AvatarProvider = ({ children }) => {
  const [avatarId, setAvatarId] = useState(null);

  const login = (id) => {
    setAvatarId(id);
  };

  const logout = () => {
    setAvatarId(null);
  };

  return (
    <AvatarContext.Provider value={{ avatarId, login, logout }}>
      {children}
    </AvatarContext.Provider>
  );
};

// PropTypes validation
AvatarProvider.propTypes = {
  children: PropTypes.node.isRequired, // This will validate that children are passed as valid React nodes
};
