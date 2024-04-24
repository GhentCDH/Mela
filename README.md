# MELA. The meaning of language

A text tagging and translation platform developed for the research project [MELA: The MEning of Language - A digital grammar of the Greek taught at schools in late Constantinople](https://research.flw.ugent.be/en/projects/mela-meaning-language-digital-grammar-greek-taught-schools-late-constantinople).

## Components

The platform consists of a bunch of Docker containers which each have some functionality:

* Front-end: A Nuxt front-end with an SSR component for server side rendering and authentication callbacks. 
* Back-end: a Python back-end based on litestar.
* Database: A PostgreSQL dababase to store the application data.
* Authentication service: Keycloak provides user authentication and management. It also integrates with the several identity providers such as the Ghent University identity provider.
* Elasticsearch service: provides a way to quickly do full-text or faceted search.

## Running and development

Check the configuration in the `.env` variables file and run Docker compose:

```sh
docker compose -f compose.dev.yaml up
```

Make sure the following is added to your hosts file

echo "127.0.0.1 mela.keycloak\n127.0.0.1 mela.frontend\n" | sudo tee -a /etc/hosts

# credits

Pieterjan De Potter, Joren Six @ GhentCDH, Ghent University.

Development partly funded by the MELA project. MELA has received funding from the European Research Council (ERC) under the European Union’s Horizon 2020 research and innovation programme (grant agreement No 101001328)