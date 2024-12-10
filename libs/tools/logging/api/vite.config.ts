/// <reference types='vitest' />
import {defineConfig} from 'vite';
import {VitePluginNode} from "vite-plugin-node";
import {nxViteTsPaths} from "@nx/vite/plugins/nx-tsconfig-paths.plugin";


export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/libs/tools/logging/backend',
    plugins: [...VitePluginNode({
        adapter: 'nest',
        appPath: './src/index.ts',
        // exportName: 'backend',
        tsCompiler: "swc",
        initAppOnBoot: false,
        swcOptions: {}
    }), nxViteTsPaths(),],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        outDir: '../../../../dist/libs/tools/logging/backend',
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
