import {StyleProvider} from '@ant-design/cssinjs';
import {ConfigProvider, theme} from 'antd';
import React from 'react';

const {useToken} = theme;

function AntThemeCustomizationProvider({children}) {
  const {token} = useToken();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm, // Enables dark mode
        token: {
          // Seed Token
          colorPrimary: "#ff8000", // Primary color in dark mode
          colorInfo: "#ff8000",
          colorBgBas: "#0f0f0f",

          fontFamily: 'Montserrat, serif',
          fontStyle: 'normal',
          fontWeight: 400,

        },
      }}
    >
      {/* Wrap in StyleProvider, so it doesn't conflict with Tailwind CSS */}
      <StyleProvider layer>
        {children}
      </StyleProvider>
    </ConfigProvider>
  );
}

export default AntThemeCustomizationProvider;
