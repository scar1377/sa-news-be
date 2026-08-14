# SA News API

SA News API is a RESTful backend API for a news application, built with TypeScript, Express, PostgreSQL and Prisma.

The API provides access to articles, topics, users and comments. It supports filtering and sorting articles, voting on articles, posting comments and deleting comments.

This project was built as the backend for SA News, with a frontend application planned to consume the API.

## Hosted API

The API will be available here once deployed:

> Deployment URL coming soon

API documentation can be accessed via:

```text
GET /api
```

This endpoint provides information about all available endpoints, including example requests and responses.

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

Create a `.env.dev` file in the root of the project containing the connection URL for the development database:

Create a `.env.test` file containing the connection URL for the test database:

For example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

````

Replace `username` and `password` with your local PostgreSQL credentials where required.

Do not commit these environment files or database credentials to Git.

### 5. Generate the Prisma client

```bash
npm run prisma:generate
````

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

## Testing

The API is tested using Vitest and Supertest.

Run the test suite with:

```bash
npm test
```

### 8. Run the API locally

```bash
npm run dev
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

For full endpoint documentation and example requests and responses, use:

```text
GET /api
```

## Project Structure

The application follows a router/controller/model structure.

- **Routers** define the available API routes.
- **Controllers** handle HTTP requests, responses and request validation.
- **Models** communicate with PostgreSQL through Prisma.
- **Error handlers** provide consistent responses for unsuccessful requests.
- **Tests** verify successful and unsuccessful API behaviour.

## Available Scripts

```bash
npm run setup-dbs
```

Creates the local development and test PostgreSQL databases.

```bash
npm run prisma:generate
```

Generates the Prisma client using the development environment configuration.

```bash
npm run prisma:migrate:dev
```

Runs Prisma development migrations against the development database.

```bash
npm run prisma:migrate:test
```

Applies existing Prisma migrations to the test database.

```bash
npm run seed
```

Seeds the development database.

```bash
npm test
```

Runs the Vitest test suite using the test environment.

## Author

Built by scar1377.
