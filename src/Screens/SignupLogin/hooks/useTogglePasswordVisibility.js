import {useState} from 'react';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const hideShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return {
    passwordVisibility,
    hideShowPassword,
  };
};
