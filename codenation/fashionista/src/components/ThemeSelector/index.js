import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdColorLens } from 'react-icons/md';

import { setTheme } from '../../store/reducers/theme/actions';

const themes = {
  light: {
    'header-footer-color': '#fff',
    'primary-background': '#FBFBF2',
    'alternate-background': '#CACFD6',
    'discount-text-color': '#b11024',
    'text-color': '#2B2D42',
    'placeholder-color': '#8D99AE',
    'alternate-text-color': '#297373',
  },
  dark: {
    'header-footer-color': '#131313',
    'primary-background': '#212221',
    'alternate-background': '#3e4147',
    'discount-text-color': '#f8961e',
    'text-color': '#f7f9fb',
    'placeholder-color': ' #cccccc90',
    'alternate-text-color': '#ddedf4',
  },
};

export default ({ currentTheme }) => {
  const [theme, setNewTheme] = useState(currentTheme);

  const dispatch = useDispatch();

  const applyTheme = useCallback(() => {
    const selectedThemeColors = themes[theme];
    Object.keys(selectedThemeColors).forEach(key => {
      const cssKey = `--${key}`;
      const cssValue = selectedThemeColors[key];
      document.body.style.setProperty(cssKey, cssValue);
    });
  }, [theme]);

  const toogleThemeColor = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    setNewTheme(newTheme);
  };

  useEffect(() => applyTheme(), [applyTheme]);
  return (
    <button
      onClick={toogleThemeColor}
      className="actions__button"
      aria-label="Toogle theme color"
    >
      <MdColorLens />
    </button>
  );
};
