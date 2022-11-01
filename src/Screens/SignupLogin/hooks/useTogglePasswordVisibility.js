import {useState} from 'react';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const hideShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return {
    passwordVisibility,
    hideShowPassword,
  };
};
