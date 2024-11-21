import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import React from 'react';

function AntThemeCustomizationProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
       // algorithm: theme.darkAlgorithm, // Enables dark mode
        token: {
          // Seed Token
          // Customize dark mode colors
          colorPrimary: '#ff8000', // Primary color in dark mode

        },
      }}
    >
      {/* Wrap in StyleProvider, so it doesn't conflict with Tailwind CSS */}
      <StyleProvider layer> {children} </StyleProvider>
    </ConfigProvider>
  );
}

export default AntThemeCustomizationProvider;
