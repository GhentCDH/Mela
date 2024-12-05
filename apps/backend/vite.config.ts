/// <reference types='vitest' />
import {defineConfig} from 'vite';
import {VitePluginNode} from "vite-plugin-node";
import {nxViteTsPaths} from "@nx/vite/plugins/nx-tsconfig-paths.plugin";


export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/backend',
    server: {
        port: 3000,
        host: '0.0.0.0',
        watcher: {
            ignored: ['*/**/vite.config.ts']
        }
    },
    plugins: [...VitePluginNode({
        adapter: 'nest',
        appPath: './src/main.ts',
        // exportName: 'backend',
        tsCompiler: "esbuild",
        initAppOnBoot: false,
        swcOptions: {}
    }), nxViteTsPaths(),],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        outDir: '../../dist/apps/backend',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    optimizeDeps: {
        exclude: [
            '@nestjs/microservices',
            '@nestjs/websockets',
            'cache-manager',
            'class-transformer',
            'class-validator',
            'fastify-swagger',
        ]
    }
});
