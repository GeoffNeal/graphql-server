# graphql-server

A graphql server that uses a Postgres database which has been seeded from some csv files.

## Prerequisites

Ensure you have Postgres installed on your machine. This app uses version 13.

See the downloads page for Postgres [here](https://www.postgresql.org/download/) for instructions.

Make sure you have node and yarn installed on your machine, this app uses:

- Node - `v18.17.1`
- Yarn - `3.5.0`

## Setup

#### Environment

Create a .env file and add the following:

For the Postgres library I'm using, these env variables are required

```
PGDATABASE="rockar"
PGUSER="postgres"
PGPASSWORD="postgres"
```

To set which data source you want to use, set the `DATASOURCE_FORMAT` variable

```
# Values can be either `csv` or `postgres`
DATASOURCE_FORMAT="csv"
```

- `csv` - Reads from and writes to the .csv files stored in the `data` directory
- `postgres` - Reads from and writes to the Postgres instance running on your machine

> For an example of what an env file should look like, take a look at `.env.example`

#### Install dependencies

```sh
yarn install
```

#### Run database

Once you have Postgres installed you need to run it. You can do this by issuing the following command:

```sh
postgres -D /opt/homebrew/var/postgresql@13
```

This assumes that you installed Postgres via homebrew and are using version 13.

#### Seed database

```sh
yarn seed
```

I have included a `seed` script to take care of setting up the tables in the database.
Once the tables are created, it will populate them with the data from the csv files.

What this means is that you can reset the database by running `yarn seed` when you want to start again, but only if you haven't edited your .csv files.

## Running the app

Once the database is running and dependencies are installed you should be able to run:

```sh
yarn start
```

#### The front end

This app is built using React Router. I was going to use NextJS but it felt like that would be cheating, and also the amount of boilerplate that comes with it would mean that you'd be sifting through it trying to find what I actually wrote. Either way I hope you like it.

Visit `http://localhost:8080` where the front end should be served.

From there you can navigate where you like. If you go to `Create`, you should be able to enter new customers and products to your desired data source.

_Things I didn't have time to implement_

- Unfortunately I didn't have time to implement any form validation, so at the moment you can enter empty values.
- Error handling could be better

#### The back end

The server uses `@apollo/server` for its graphql endpoints

This means you can visit `http://localhost:4000` to use the graphiql interface and test out requests without the frontend app.
