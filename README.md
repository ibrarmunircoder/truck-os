# TruckOS Applications

## How to get started from scratch

### Before cloning out the code (Pre-requisites)

#### Git

- Setup a private key and add the public one to your profile in github (eventually gitlab) so you can clone easily
- Make sure you have line-endings for linux setup (yes - even in windows...) - otherwise things won't work
  - ```shell
    git config --global core.autocrlf input
    ```

#### Docker

- Download and install Docker Desktop

### Running the app after cloning

You can do the backend and front-end in parallel - but here they're separated. The order doesn't matter.
The settings for staging will connect to the ROQ Staging environment and the Walbing staging environment, but will use a local
database for storage (which you can play with).

#### Launching the backend

Starting in the root directory where you cloned:

```shell
#This creates a PostgresDB locally in a container. Be careful that you don't have one running locally or it may conflict
docker-compose up -d
```

Then:

```shell Windows
cd backend
npm install
copy .env.staging .env
npm run migration:local:config
npm run schema:local:sync
npm run start:dev
```

```shell Unix
cd backend
npm install
cp .env.staging .env
npm run migration:local:config
npm run schema:local:sync
npm run start:dev
```

#### Launching the front-end

Starting in the root directory where you cloned:

```shell Windows
cd frontend
npm install
copy .env.staging .env
npm run dev
```

```shell Unix
cd frontend
npm install
cp .env.staging .env
npm run dev
```

#### Exploring the app

You should have now 3 containers (1 database, 1 front end, 1 backend) running. You should be able to go to
http://localhost:3000 to explore the app. It may take a while to load due to compilation - but should work.

## Just in case - ROQ-One Documentation

TruckOS is based on ROQ-One's codebase. If something in this readme is missing/you're not sure
then please take a peek at the documentation below. If you find something that solves the issue,
please update this README so that we don't have to go back there for it but can really just use this one.

- Technical documentation and installation guide: [docs.roq.tech](https://docs.roq.tech/)
