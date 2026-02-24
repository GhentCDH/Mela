/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/frontend',
  server: {
    port: 4200,
    host: '0.0.0.0',
    // TODO when json forms is fixed just remove this
    allowedHosts: ['tst.mela.ugent.be', 'qas.mela.ugent.be', 'mela.ugent.be'],

    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  resolve: {
    alias: {
      // Stub out @prisma/client for frontend builds
      '@prisma/client': path.resolve(__dirname, 'src/stubs/prisma-client.ts'),
    },
    dedupe: [
      'vue',
      '@vueuse/core',
      'vue-router',
      'axios',
      'uuid',
      'lodash-es',
      '@heroicons/vue',
      '@jsonforms/core',
      '@jsonforms/vue',
      '@jsonforms/vue-vanilla',
      '@toast-ui/editor',
      '@anatine/zod-openapi',
      '@ghentcdh/tools-vue',
      '@ghentcdh/annotated-text',
      '@ghentcdh/ui',
      '@ghentcdh/json-forms-core',
    ],
  },
  plugins: [vue(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md', 'assets/**'])],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/frontend',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/frontend',
      provider: 'v8',
    },
  },
});
