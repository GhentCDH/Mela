// create a script that creates env.js file with the following content:
// export const env = { VITE_API_URL: ${process.env.VITE_API_URL} };

export const createEnvFile = async () => {
  const fs = require('fs');
  const path = require('path');
  const ENV_CONSTS = [
    'KEYCLOAK_HOST',
    'KEYCLOAK_REALM',
    'KEYCLOAK_CLIENT_ID',
    'env',
  ];

  fs.writeFileSync(
    path.resolve(__dirname, './dist/env.js'),
    `export const env = {
        ${ENV_CONSTS.map((key) => `${key}: ${process.env[key]}`).join(',\n')}
    };`,
  );
};
