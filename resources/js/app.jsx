import './bootstrap';
import '../css/app.css';

import {createRoot, hydrateRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {StrictMode} from "react";
import {StyleProvider} from '@ant-design/cssinjs';
import AntThemeCustomizationProvider from "@/AntThemeCustomizationProvider.jsx";
import CrmMenuLayout from "@/Layouts/CrmMenuLayout.jsx";
import StoreFrontLayout from "@/Layouts/StoreFrontLayout.jsx";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  // resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')).then((page) =>
  //   page.default.layout = name.startsWith('Crm/') ? <CrmMenuLayout children={page}/> : StoreFrontLayout),
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', {eager: true})
    let page = pages[`./Pages/${name}.jsx`]
    //console.log(page.default.layout)
    page.default.layout = name.startsWith('Crm/') ? page => <CrmMenuLayout children={page}/> : (page) =>
      <StoreFrontLayout children={page}/>
    return page
  },
  setup({el, App, props}) {

    if (import.meta.env.DEV) {
      createRoot(el).render(
        <StrictMode>
          <AntThemeCustomizationProvider>
            <App {...props}/>
          </AntThemeCustomizationProvider>
        </StrictMode>
      );
    } else {
      createRoot(el).render(
        <AntThemeCustomizationProvider>
          <App {...props} />
        </AntThemeCustomizationProvider>);
    }
  },
  progress: {
    color: '#ff8000',
  },
});
