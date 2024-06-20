# Bookstore

Bookstore application.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)


## Features

- **Hexagonal Architecture**: Clean separation of concerns between business logic and infrastructure.
- **Node.js**: JavaScript runtime for server-side development.
- **TypeScript**: Statically typed superset of JavaScript.
- **MongoDB**: NoSQL database for storing book data.
- **Jest**: JavaScript library for creating, running, and structuring tests.

## Installation


2. **Install dependencies:**

	```bash
	npm install

3. **Set up MongoDB:**

    You can use a local MongoDB instance or use Docker to run MongoDB. To run MongoDB using Docker,       use the following command:

	```bash
	docker run -d --name mongodb_bookstore_project -p 27017:27017 -e MONGO_INITDB_DATABASE=bookstore mongo

4. **Configure environment variables:**

    Create a .env file in the root directory and add your MongoDB connection string:

    ```bash
    # .env file
    BOOKSTORE_URL=http://localhost:3000/v1   # use http://fakebookstore.local/v1 if won't use local bookstore api
    MONGO_URI=mongodb://localhost:27017/bookstore

5. **Compile TypeScript:**

    ```bash
    npm run build

## Usage

1. **Test the code:**

    ```bash
    npm run test

2. **Test the code with coverage:**

    ```bash
    npm run test:cov

3. **Start the server:**

    ```bash
    npm run start
    ````
NOTE: **npm run start** will execute the **./src/index.ts** file emiting two events, once to get all books from api, and the other to get and specified book by code, this one sould be selected from the list of existing books. once we get the book(s), then this info should be store in a mongodb.


## Folder Structure
```arduino
src/
├── application/
│   ├── services/
│   │   └── EventHandler.ts
│   │   └── EventHandler.test.ts
├── domain/
│   ├── entities/
│   │   └── book.ts
│   │   └── InputEvent.ts
│   ├── repositories/
│   │   └── ReadBookRepository.ts
│   │   └── StoreBookRepository.ts
├── infrastructure/
│   ├── adater/
│   │   └── eventAdapter.ts
│   │   └── eventAdapter.test.ts
│   ├── database/
│   │   ├── mongoose.ts
│   │   └── mongoose.test.ts
│   │   └── mongooseBookRepository.ts
│   │   └── mongooseBookRepository.test.ts
│   └── http/
│       └── HttpBookRepository.ts
│       └── HttpBookRepository.test.ts
├── index.ts
└── index.test.ts

```

## Technologies Used
- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- Swagger

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License.