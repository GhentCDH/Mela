Everything in this directory is generated code. Do not edit these files directly.
Instead, make changes to the source files and regenerate the code.

To generate this directory use

```bash
 pnpm run generate:prisma
```

## If this directory is empty

Before this directory can be generated, the following files must be generated:

```bash
nx g @nx/js:library --directory=generated/dtos --importPath=@generated/dtos --linter=eslint --name=generated-dtos --unitTestRunner=vitest --no-interactive
nx g @nx/js:library --directory=generated/forms --importPath=@generated/forms --linter=eslint --name=generated-forms --unitTestRunner=vitest --no-interactive
nx g @nx/js:library --directory=generated/types --importPath=@generated/types --linter=eslint --name=generated-dto --unitTestRunner=vitest --no-interactive
nx g @nx/js:library --directory=generated/prisma-client --importPath=@generated/prisma-client --linter=eslint --name=generated-prisma-client --unitTestRunner=vitest --no-interactive
```

Then generate the files
```bash
 pnpm run generate:prisma  
```