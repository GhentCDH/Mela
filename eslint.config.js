const nx = require('@nx/eslint-plugin');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: require('jsonc-eslint-parser'),
    },
  },

  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  importPlugin.flatConfigs['recommended'],
  {
    ignores: ['**/dist', 'generated/prisma-client'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'scope:shared',
              bannedExternalImports: [
                '@vue/*',
                '@nestjs/*',
                '@anatine/zod-nestjs',
              ],
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'scope:tool',
              bannedExternalImports: [],
              onlyDependOnLibsWithTags: ['scope:tool', 'scope:shared'],
            },
            {
              sourceTag: 'scope:feature',
              bannedExternalImports: [],
              onlyDependOnLibsWithTags: ['scope:tool', 'scope:shared'],
            },
            {
              sourceTag: 'scope:api',
              bannedExternalImports: ['@vue/*'],
              onlyDependOnLibsWithTags: [
                'scope:api',
                'scope:shared',
                'scope:tool',
              ],
            },
            {
              sourceTag: 'scope:ui',
              bannedExternalImports: [
                '@nestjs/*',
                '@anatine/zod-nestjs',
                '@anatine/zod-openapi',
              ],
              onlyDependOnLibsWithTags: [
                'scope:ui',
                'scope:shared',
                'scope:tool',
              ],
            },
            {
              sourceTag: 'app:api',
              bannedExternalImports: ['@vue/*'],
              onlyDependOnLibsWithTags: [
                'scope:api',
                'scope:shared',
                'scope:tool',
                'scope:feature',
              ],
            },
            {
              sourceTag: 'app:ui',
              bannedExternalImports: [
                '@nestjs/*',
                '@anatine/zod-nestjs',
                '@anatine/zod-openapi',
              ],
              onlyDependOnLibsWithTags: [
                'scope:ui',
                'scope:shared',
                'scope:tool',
                'scope:feature',
              ],
            },
          ],
        },
      ],
      'import/named': 'off',
      'import/no-unresolved': 'off',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/order': [
        'error',
        {
          named: true,
          // sortTypesAmongThemselves: true,
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@ghentcdh/**',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          groups: ['external', 'internal', 'index', 'object'],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
