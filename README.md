# dk-api

## Inital setup
1. Install `node` and Docker
2. Run `npm install -g yarn` to install `yarn`
3. Run `yarn` in the working directory to install required packages
4. Use the linter files provided to ensure consistent code style across the repository

## Development
1. Create a copy of `.env.example` and rename it to `.env`. This will contain the environment variables for the app.
2. Run `docker-compose up -d` in the project directory to start the services (eg. database) that the backend needs to run.
3. Run `yarn dev` to start the development server

## Testing
1. Run `NODE_ENV=test yarn sequelize-cli db:create` to create test database after postgres is up

### Debugging in tests
1. Add breakpoints to the files
2. Run `yarn test:debug {test_file_name}` in VSCode's integrated terminal, it should be waiting for a debugging client to connect to its process
3. Attach the VSCode debugger to the node process by opening the command palette and searching for "Attach to Node process"

## API Docs
To generate API docs,
1. `cd` into `docs` directory
2. Run `docgen build -i dk-api.postman_collection.json -m -o api-docs.md` with updated postman collection

