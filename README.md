# MELA. The meaning of language

A text tagging and translation platform developed for the research
project [MELA: The MEning of Language - A digital grammar of the Greek taught at schools in late Constantinople](https://research.flw.ugent.be/en/projects/mela-meaning-language-digital-grammar-greek-taught-schools-late-constantinople).

## Components

The platform is a monorepo created with nx, and some docker containers to run the services. The main components are:

* Frontend: a VUEjs frontend.
* Backend: a node backend based on NestJs.
* Database: A PostgreSQL dababase to store the application data.
* Authentication service: Keycloak provides user authentication and management. It also integrates with the several
  identity providers such as the Ghent University identity provider.
* nginx: To ensure the por

* (TODO) Elasticsearch service: provides a way to quickly do full-text or faceted search.

## Running and development

Check the configuration in the `.env` variables file and run Docker compose:

```sh
docker compose -f docker-compose.dev.yml up --build 
```

The app is served on: [http://localhost:4000](http://localhost:4000)

Make sure the following is added to your hosts file

```sh
echo "127.0.0.1 authentication\n" | sudo tee -a /etc/hosts
```

# credits

Pieterjan De Potter, Joren Six @ GhentCDH, Bo Vandersteene, Ghent University.

Development partly funded by the MELA project. MELA has received funding from the European Research Council (ERC) under
the European Union’s Horizon 2020 research and innovation programme (grant agreement No 101001328)
