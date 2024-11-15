import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import React from 'react';

function AntThemeCustomizationProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#ff8000',
        },
      }}
    >
      {/* Wrap in StyleProvider, so it doesn't conflict with Tailwind CSS */}
      <StyleProvider layer>{children}</StyleProvider>
    </ConfigProvider>
  );
}

export default AntThemeCustomizationProvider;
