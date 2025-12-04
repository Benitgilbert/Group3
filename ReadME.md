#  MyDiary API

# Group 3
## Reg Numbers : 22247/2023, 22773/2023
             
 
                 


## 🛠️ Technologies Used

| Category  | Technology   | Purpose                                        |
| --------- | ------------ | ---------------------------------------------- |
| Runtime   | Node.js      | JavaScript runtime built on Chrome's V8 engine |
| Framework | Express.js   | Fast and lightweight web framework             |
| Database  | MongoDB      | NoSQL database for user data and diary entries |
| ODM       | Mongoose     | Schema-based modeling for MongoDB              |
| Security  | Bcryptjs     | Safely hashes user passwords                   |
| Auth      | JSONWebToken | Provides stateless authentication              |

---





## 📡 API Endpoints

### 1. Authentication (`/api/v1/auth`)

| Method | Endpoint  | Description          | Request Body (JSON)                                                            |
| ------ | --------- | -------------------- | ------------------------------------------------------------------------------ |
| POST   | `/signup` | Create a new account | `{ "firstName": "...", "lastName": "...", "email": "...", "password": "..." }` |
| POST   | `/signin` | Login a user         | `{ "email": "...", "password": "..." }`                                        |

---

### 2. Diary Entries (`/api/v1/entries`)

**Requires:** `Authorization: Bearer <token>`

| Method | Endpoint | Description                         | Request Body (JSON)                        |
| ------ | -------- | ----------------------------------- | ------------------------------------------ |
| POST   | `/`      | Add a new entry                     | `{ "title": "...", "description": "..." }` |
| GET    | `/`      | Retrieve all entries (latest first) | N/A                                        |
| GET    | `/:id`   | Retrieve one entry                  | N/A                                        |
| PATCH  | `/:id`   | Modify an entry                     | `{ "title": "...", "description": "..." }` |
| DELETE | `/:id`   | Remove an entry                     | N/A                                        |

---

##  Status Codes

| Code    | Meaning      | Occurs When                          |
| ------- | ------------ | ------------------------------------ |
| **200** | OK           | Successful login, fetch, or update   |
| **201** | Created      | Signup or entry creation succeeded   |
| **204** | No Content   | Entry deleted successfully           |
| **400** | Bad Request  | Invalid data sent                    |
| **401** | Unauthorized | Invalid token or wrong login details |
| **404** | Not Found    | User or entry not found              |
| **409** | Conflict     | Email already registered             |
| **500** | Server Error | General backend failure              |

---


