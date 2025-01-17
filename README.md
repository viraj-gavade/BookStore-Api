<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
# BookStore API

A comprehensive RESTful API for managing a bookstore, built with NestJS and Prisma. This project provides robust user authentication, book management, and user profile features.

## Features

- **User Authentication**
  - Secure signup and login functionality
  - JWT-based authentication
  - Secure session management using HTTP cookies
  
- **Book Management**
  - Complete CRUD operations for books
  - Book categorization and search
  - Link books to authenticated users
  
- **Profile Management**
  - User profile updates
  - Secure password management
  - User preferences storage

## Tech Stack

- **Backend**: Node.js, NestJS, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest

## Live URL 🌐

Access the live API at: [https://bookstore-api](https://bookstore-api-cyzn.onrender.com)

## API Documentation 📚
- [Postman Collection](https://documenter.getpostman.com/view/34879207/2sAYQajqrY)

## Installation and Setup

### Prerequisites

1. Node.js (v16+)
2. PostgreSQL
3. npm or yarn
4. Prisma CLI (`npm install -g prisma`)

### Getting Started

1. **Clone the repository**:
```bash
git clone https://github.com/viraj-gavade/BookStore-Api.git
cd BookStore-Api
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment**:
Create a `.env` file in the root directory:
```env
# Database Configuration
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=24h

# API Configuration
PORT=3000
NODE_ENV=development
```

4. **Run database migrations**:
```bash
npx prisma migrate dev
```

5. **Start the application**:
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## API Endpoints

### Authentication
* **POST** `/auth/signup` - Register a new user
* **POST** `/auth/login` - User login
* **POST** `/auth/logout` - User logout

### User Management
* **GET** `/user/profile` - Get user profile
* **PATCH** `/user/update` - Update user profile
* **PATCH** `/user/changepass` - Change password
* **DELETE** `/user/delete` - Delete user account

### Book Operations
* **POST** `/book` - Create a new book
* **GET** `/book` - Get all books
* **GET** `/book/:id` - Get book by ID
* **PATCH** `/book/:id` - Update book
* **DELETE** `/book/:id` - Delete book
* **GET** `/book/search` - Search books

## Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@vrajagavde17@gmail.com or create an issue in the repository.

---

**Note**: Before deploying, remember to:
- Replace all placeholder URLs and credentials
- Set up proper environment variables
- Configure CORS settings
- Set up proper security measures
- Update contact information
