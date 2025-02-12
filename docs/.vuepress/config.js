import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';
import componentsSideBar from '../components/typedoc_sidebar.json';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@ghentcdh/ui': fileURLToPath(
            new URL('../../libs/ui/src/index.ts', import.meta.url),
          ),
          '@ghentcdh/tools/form': fileURLToPath(
            new URL('../../libs/tools/form/src/index.ts', import.meta.url),
          ),
          '@ghentcdh/tools/logging/frontend': fileURLToPath(
            new URL(
              '../../libs/tools/logging/frontend/src/index.ts',
              import.meta.url,
            ),
          ),
          '@ghentcdh/authentication/frontend': fileURLToPath(
            new URL(
              '../../libs/authentication/frontend/src/index.ts',
              import.meta.url,
            ),
          ),
        },
      },
    },
    vuePluginOptions: {},
  }),
  // postcss: {
  //   plugins: [require('@tailwindcss/postcss'), require('autoprefixer')],
  // },
  title: 'GhentCDH',
  theme: defaultTheme({
    docsRepo: 'https://github.com/GhentCDH/Mela',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/tree/:branch/:path',
    lastUpdated: true,
    colorMode: 'light',
    // colorModeSwitch: false,
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    sidebar: [
      {
        text: 'components',
        children: componentsSideBar,
      },
      // {
      //   text: 'api',
      //   children: apiSideBar1,
      // },
    ],
  }),
});
