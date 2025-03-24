/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import * as fs from 'node:fs';
import * as fs from 'node:fs';
import * as path from 'node:path';

// Custom plugin to copy Prisma files
function copyPrismaFiles(): any {
  return {
    name: 'copy-prisma-files',
    writeBundle: {
      sequential: true,
      order: 'post',
      async handler({ dir }) {
        const prismaDestDir = path.join(dir, 'prisma');
        await fs.ensureDir(prismaDestDir);

        // Copy prisma dir
        await fs.copy(
          /// I guess the default is node modules prisma client, i had a custom path so use what fits your needs.
          'path/to/your/prisma/generated/files',
          prismaDestDir,
          { overwrite: true },
        );

        console.log('✓ Copied Prisma files to build output');
      },
    },
  };
}

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/frontend',
  server: {
    port: 4200,
    host: '0.0.0.0',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [vue(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
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
