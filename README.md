# SA News API

SA News API is a RESTful backend API for a news application, built with TypeScript, Express, PostgreSQL and Prisma.

The API provides access to articles, topics, users and comments. It supports filtering and sorting articles, voting on articles, posting comments and deleting comments.

This project was built as the backend for SA News, with a frontend application planned to consume the API.

## Hosted API

The API is hosted on Render and is available at:

https://sa-news-be.onrender.com

The `/api` endpoint provides documentation for all available endpoints, including example requests and responses.

> **Note:** The API is hosted on Render's free tier. The service may spin down after a period of inactivity, so the first request may take a short while to respond.

## Features

- View all topics
- View all users
- View all articles
- View an individual article
- Sort articles by supported properties
- Order articles in ascending or descending order
- Filter articles by topic
- View comments associated with an article
- Post a new comment to an article
- Update an article's vote count
- Delete a comment
- Validation for invalid requests and query parameters
- Appropriate HTTP status codes and error responses

## Tech Stack

- TypeScript
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Vitest
- Supertest

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/scar1377/sa-news-be.git
cd sa-news-be
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the local databases

This project uses PostgreSQL.

Make sure PostgreSQL is running locally, then create the development and test databases with:

```bash
npm run setup-dbs
```

### 4. Create environment files

Create a `.env.dev` file in the root of the project containing the connection URL for the development database.

Create a `.env.test` file containing the connection URL for the test database.

For example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

Replace `username`, `password` and `database_name` with the appropriate values for your local PostgreSQL databases.

Do not commit environment files or database credentials to Git.

### 5. Generate the Prisma client

```bash
npm run prisma:generate
```

### 6. Apply the database migrations

For the development database:

```bash
npm run prisma:migrate:dev
```

For the test database:

```bash
npm run prisma:migrate:test
```

### 7. Seed the development database

```bash
npm run seed
```

### 8. Run the API locally

```bash
npm run dev
```

By default, the server listens on port `9090`.

## Testing

The API is tested using Vitest and Supertest.

Run the test suite with:

```bash
npm test
```

The test command runs the application in the test environment and uses the test database.

The test suite covers successful requests as well as invalid input, missing resources and other error cases.

## API Endpoints

The API currently provides the following endpoints:

| Method | Endpoint                             | Description                                           |
| ------ | ------------------------------------ | ----------------------------------------------------- |
| GET    | `/api`                               | Returns documentation for the available API endpoints |
| GET    | `/api/topics`                        | Returns all topics                                    |
| GET    | `/api/users`                         | Returns all users                                     |
| GET    | `/api/articles`                      | Returns all articles                                  |
| GET    | `/api/articles/:article_id`          | Returns an article by ID                              |
| PATCH  | `/api/articles/:article_id`          | Updates an article's vote count                       |
| GET    | `/api/articles/:article_id/comments` | Returns comments for an article                       |
| POST   | `/api/articles/:article_id/comments` | Adds a comment to an article                          |
| DELETE | `/api/comments/:comment_id`          | Deletes a comment                                     |

### Article Queries

`GET /api/articles` supports the following query parameters:

- `sort_by` — selects the property used to sort articles
- `order` — sorts results in ascending or descending order
- `topic` — filters articles by topic

If no sorting options are provided, articles are returned by creation date in descending order.

For full endpoint documentation and example requests and responses, visit the hosted `/api` endpoint.

## Project Structure

The application follows a router/controller/model structure.

- **Routers** define the available API routes.
- **Controllers** handle HTTP requests, responses and request validation.
- **Models** communicate with PostgreSQL through Prisma.
- **Error handlers** provide consistent responses for unsuccessful requests.
- **Tests** verify successful and unsuccessful API behaviour.

## Production

The production API uses:

- **Render** to host the Node.js/Express application
- **Supabase** to host the PostgreSQL database
- **Prisma** for database access, schema management and migrations

The TypeScript source is compiled to JavaScript before the production server is started.

## Available Scripts

### Set up local databases

```bash
npm run setup-dbs
```

Creates the local development and test PostgreSQL databases.

### Generate Prisma client

```bash
npm run prisma:generate
```

Generates the Prisma client.

### Run development migrations

```bash
npm run prisma:migrate:dev
```

Runs Prisma development migrations against the development database.

### Apply test migrations

```bash
npm run prisma:migrate:test
```

Applies existing Prisma migrations to the test database.

### Seed development database

```bash
npm run seed
```

Seeds the development database.

### Run tests

```bash
npm test
```

Runs the Vitest test suite using the test environment.

### Run development server

```bash
npm run dev
```

Runs the TypeScript application locally using `tsx`.

### Build for production

```bash
npm run build
```

Compiles the TypeScript source to JavaScript in the `dist` directory.

### Start production build

```bash
npm start
```

Runs the compiled JavaScript application with Node.js.

## Author

Built by scar1377.
