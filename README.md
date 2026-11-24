# Inkwell API

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-REST%20API-6DB33F)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

A blog platform REST API built from scratch with Java and Spring Boot, then taken all the way to production.

**Project #001** in a series of builds at [anovid.com](https://anovid.com). Follow along at [inkwell.anovid.com](https://inkwell.anovid.com).

## Tech stack

| Area | Tools |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot (Spring Web) |
| Build | Maven |
| Planned | PostgreSQL, Flyway, Spring Security, JWT, Testcontainers, Docker, GitHub Actions |

## Getting started

**Requirements:** JDK 21 and Git. Maven is included through the project's wrapper.

```bash
git clone https://github.com/pratik20gb/inkwell-api.git
cd inkwell-api
```

Run the app:

```bash
# Windows
mvnw.cmd spring-boot:run
 
# macOS / Linux
./mvnw spring-boot:run
```

The server starts on `http://localhost:8080`.

## API endpoints

| Method | Endpoint | Description | Responses |
|---|---|---|---|
| GET | `/hello` | Simple test endpoint | `200` |
| GET | `/api/posts` | List all posts | `200` |
| GET | `/api/posts/{id}` | Get one post by ID | `200`, `404`, `400` for a non-numeric ID |

### Example

```bash
curl http://localhost:8080/api/posts/1
```

```json
{
  "id": 1,
  "title": "My first post",
  "content": "Hello, this is my first blog post."
}
```

On Windows PowerShell, use `curl.exe` instead of `curl`.

## Project structure

```
src/main/java/com/example/inkwell
├── InkwellApplication.java   # application entry point
├── HelloController.java      # test endpoint
├── Post.java                 # blog post model
└── PostController.java       # posts endpoints
```

The structure will grow into separate packages for controllers, services, repositories, and security as the project does.

## Security

This is a learning project built alongside AppSec study. Security gets its own milestones: authentication, authorization checks to prevent insecure direct object reference (IDOR) bugs, input validation, and keeping secrets out of the repo.

## Follow the build

- Updates on X: [x.com/pratik20gb](https://x.com/pratik20gb)
- Portfolio: [anovid.com](https://anovid.com)
- Project page: [inkwell.anovid.com](https://inkwell.anovid.com)
## Author

**Pratik Raj**, backend developer focused on Java and application security. [GitHub](https://github.com/pratik20gb)
 