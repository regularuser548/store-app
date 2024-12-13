import './bootstrap';
import '../css/app.css';

import {createRoot, hydrateRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {StrictMode} from "react";
import {StyleProvider} from '@ant-design/cssinjs';
import AntThemeCustomizationProvider from "@/AntThemeCustomizationProvider.jsx";
import {ConfigProvider} from "antd";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({el, App, props}) {

    if (import.meta.env.DEV) {
      createRoot(el).render(
        <StrictMode>
          <AntThemeCustomizationProvider>
            <App {...props} />
          </AntThemeCustomizationProvider>
        </StrictMode>);
    } else {
      createRoot(el).render(
        <AntThemeCustomizationProvider>
          <App {...props} />
        </AntThemeCustomizationProvider>);
    }
  },
  progress: {
    color: '#4B5563',
  },
});
