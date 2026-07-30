# Internship Tracker Backend API Documentation

Express.js REST API with MongoDB & Mongoose for Internship Tracking application.

---

## Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints (`/api/auth`)

### 1. Register User
- **Endpoint:** `POST /api/auth/register`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "_id": "65b1a234f5e6789012345678",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "token": "eyJhbGciOiJIUzI1Ni..."
  }
  ```
- **Validation Error (`400 Bad Request`):**
  ```json
  {
    "error": "Please provide name, email, and password"
  }
  ```

---

### 2. Login User
- **Endpoint:** `POST /api/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "_id": "65b1a234f5e6789012345678",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "token": "eyJhbGciOiJIUzI1Ni..."
  }
  ```
- **Error (`401 Unauthorized`):**
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

---

### 3. Get Current User Profile
- **Endpoint:** `GET /api/auth/me`
- **Access:** Private (Requires Header: `Authorization: Bearer <token>`)
- **Response (`200 OK`):**
  ```json
  {
    "_id": "65b1a234f5e6789012345678",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2026-07-21T16:30:00.000Z",
    "updatedAt": "2026-07-21T16:30:00.000Z"
  }
  ```

---

## Internship Management Endpoints (`/api/internships`)

> **Note:** All internship routes are protected. Include `Authorization: Bearer <JWT_TOKEN>` header in every request.

### 1. Create Internship Application
- **Endpoint:** `POST /api/internships`
- **Access:** Private
- **Request Body:**
  ```json
  {
    "company": "Google",
    "role": "Software Engineering Intern",
    "jdText": "Looking for SWE Interns proficient in C++ or Python.",
    "sourceLink": "https://careers.google.com/jobs/results/123",
    "status": "applied",
    "appliedDate": "2026-07-20T00:00:00.000Z",
    "deadline": "2026-08-15T00:00:00.000Z"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "_id": "65b98765f4e3210987654321",
    "userId": "65b1a234f5e6789012345678",
    "company": "Google",
    "role": "Software Engineering Intern",
    "jdText": "Looking for SWE Interns proficient in C++ or Python.",
    "sourceLink": "https://careers.google.com/jobs/results/123",
    "status": "applied",
    "appliedDate": "2026-07-20T00:00:00.000Z",
    "deadline": "2026-08-15T00:00:00.000Z",
    "createdAt": "2026-07-21T16:55:00.000Z",
    "updatedAt": "2026-07-21T16:55:00.000Z"
  }
  ```
- **Validation Error (`400 Bad Request`):**
  ```json
  {
    "error": "Company and role are required"
  }
  ```

---

### 2. Get All Internships for Authenticated User
- **Endpoint:** `GET /api/internships`
- **Access:** Private
- **Query Parameters (Optional):**
  - `status`: Filter by status (`applied` | `screening` | `interview` | `rejected` | `selected`)
  - `search`: Search term matching `company`, `role`, or `jdText`
- **Example Request:** `GET /api/internships?status=interview&search=Google`
- **Response (`200 OK`):**
  ```json
  [
    {
      "_id": "65b98765f4e3210987654321",
      "userId": "65b1a234f5e6789012345678",
      "company": "Google",
      "role": "Software Engineering Intern",
      "jdText": "Looking for SWE Interns proficient in C++ or Python.",
      "sourceLink": "https://careers.google.com/jobs/results/123",
      "status": "interview",
      "appliedDate": "2026-07-20T00:00:00.000Z",
      "deadline": "2026-08-15T00:00:00.000Z",
      "createdAt": "2026-07-21T16:55:00.000Z",
      "updatedAt": "2026-07-21T16:55:00.000Z"
    }
  ]
  ```

---

### 3. Get Single Internship Workspace
- **Endpoint:** `GET /api/internships/:id`
- **Access:** Private
- **Response (`200 OK`):**
  ```json
  {
    "_id": "65b98765f4e3210987654321",
    "userId": "65b1a234f5e6789012345678",
    "company": "Google",
    "role": "Software Engineering Intern",
    "jdText": "Looking for SWE Interns proficient in C++ or Python.",
    "sourceLink": "https://careers.google.com/jobs/results/123",
    "status": "interview",
    "appliedDate": "2026-07-20T00:00:00.000Z",
    "deadline": "2026-08-15T00:00:00.000Z",
    "createdAt": "2026-07-21T16:55:00.000Z",
    "updatedAt": "2026-07-21T16:55:00.000Z",
    "resources": [
      {
        "_id": "65c111...",
        "title": "System Design Overview",
        "type": "link",
        "content": "https://github.com/donnemartin/system-design-primer"
      }
    ],
    "prepItems": [
      {
        "_id": "65c222...",
        "question": "Tell me about a challenging technical project.",
        "myAnswer": "I built a distributed key-value store using raft consensus."
      }
    ]
  }
  ```
- **Ownership / Not Found Case (`404 Not Found`):**
  *(Returned if the internship ID does not exist OR if it belongs to another user)*
  ```json
  {
    "error": "Internship not found"
  }
  ```

---

### 4. Update Internship Status Only
- **Endpoint:** `PATCH /api/internships/:id/status`
- **Access:** Private
- **Request Body:**
  ```json
  {
    "status": "interview"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "_id": "65b98765f4e3210987654321",
    "userId": "65b1a234f5e6789012345678",
    "company": "Google",
    "role": "Software Engineering Intern",
    "status": "interview",
    "updatedAt": "2026-07-21T17:00:00.000Z"
  }
  ```
- **Invalid Status Error (`400 Bad Request`):**
  ```json
  {
    "error": "Status must be one of: applied, screening, interview, rejected, selected"
  }
  ```
- **Ownership / Not Found Case (`404 Not Found`):**
  ```json
  {
    "error": "Internship not found"
  }
  ```

---

### 5. Update Internship Details
- **Endpoint:** `PATCH /api/internships/:id` (or `PUT /api/internships/:id`)
- **Access:** Private
- **Request Body:**
  ```json
  {
    "company": "Google LLC",
    "status": "interview",
    "deadline": "2026-08-30T00:00:00.000Z"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "_id": "65b98765f4e3210987654321",
    "userId": "65b1a234f5e6789012345678",
    "company": "Google LLC",
    "role": "Software Engineering Intern",
    "status": "interview",
    "deadline": "2026-08-30T00:00:00.000Z",
    "updatedAt": "2026-07-21T17:05:00.000Z"
  }
  ```
- **Ownership / Not Found Case (`404 Not Found`):**
  ```json
  {
    "error": "Internship not found"
  }
  ```

---

### 6. Delete Internship Application
- **Endpoint:** `DELETE /api/internships/:id`
- **Access:** Private
- **Response (`200 OK`):**
  ```json
  {
    "message": "Internship and associated items deleted successfully"
  }
  ```
- **Ownership / Not Found Case (`404 Not Found`):**
  ```json
  {
    "error": "Internship not found"
  }
  ```

---

## Resource Endpoints (`/api/resources`)

### 1. Add Resource
- **Endpoint:** `POST /api/resources`
- **Access:** Private
- **Request Body:**
  ```json
  {
    "internshipId": "65b98765f4e3210987654321",
    "title": "System Design Notes",
    "type": "note",
    "content": "Key notes on database indexing and caching."
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "_id": "65c111223344556677889900",
    "internshipId": "65b98765f4e3210987654321",
    "userId": "65b1a234f5e6789012345678",
    "title": "System Design Notes",
    "type": "note",
    "content": "Key notes on database indexing and caching.",
    "createdAt": "2026-07-21T17:15:00.000Z",
    "updatedAt": "2026-07-21T17:15:00.000Z"
  }
  ```
- **Parent Ownership / Not Found Case (`404 Not Found`):**
  ```json
  {
    "error": "Internship not found"
  }
  ```

---

### 2. Get Resources for an Internship
- **Endpoint:** `GET /api/resources/:internshipId` (or `/api/resources/internship/:internshipId`)
- **Access:** Private
- **Response (`200 OK`):**
  ```json
  [
    {
      "_id": "65c111223344556677889900",
      "internshipId": "65b98765f4e3210987654321",
      "userId": "65b1a234f5e6789012345678",
      "title": "System Design Notes",
      "type": "note",
      "content": "Key notes on database indexing and caching."
    }
  ]
  ```

---

### 3. Delete Resource
- **Endpoint:** `DELETE /api/resources/:id`
- **Access:** Private
- **Response (`200 OK`):**
  ```json
  {
    "message": "Resource deleted successfully"
  }
  ```
- **Ownership / Not Found Case (`404 Not Found`):**
  ```json
  {
    "error": "Resource not found"
  }
  ```

---

## Prep Item Endpoints (`/api/prep-items`)

### 1. Add Prep Item (Mock Question & Notes)
- **Endpoint:** `POST /api/prep-items`
- **Access:** Private
- **Request Body:**
  ```json
  {
    "internshipId": "65b98765f4e3210987654321",
    "question": "Tell me about a time you optimized a slow query.",
    "myAnswer": "I analyzed execution plans, added composite indexes, reducing runtime by 70%."
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "_id": "65c222334455667788990011",
    "internshipId": "65b98765f4e3210987654321",
    "userId": "65b1a234f5e6789012345678",
    "question": "Tell me about a time you optimized a slow query.",
    "myAnswer": "I analyzed execution plans, added composite indexes, reducing runtime by 70%.",
    "createdAt": "2026-07-21T17:16:00.000Z",
    "updatedAt": "2026-07-21T17:16:00.000Z"
  }
  ```

---

### 2. Get Prep Items for an Internship
- **Endpoint:** `GET /api/prep-items/:internshipId` (or `/api/prep-items/internship/:internshipId`)
- **Access:** Private
- **Response (`200 OK`):**
  ```json
  [
    {
      "_id": "65c222334455667788990011",
      "internshipId": "65b98765f4e3210987654321",
      "userId": "65b1a234f5e6789012345678",
      "question": "Tell me about a time you optimized a slow query.",
      "myAnswer": "I analyzed execution plans, added composite indexes, reducing runtime by 70%."
    }
  ]
  ```

---

### 3. Update Prep Item
- **Endpoint:** `PUT /api/prep-items/:id`
- **Access:** Private
- **Request Body:**
  ```json
  {
    "myAnswer": "Updated notes on STAR method response."
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "_id": "65c222334455667788990011",
    "question": "Tell me about a time you optimized a slow query.",
    "myAnswer": "Updated notes on STAR method response.",
    "updatedAt": "2026-07-21T17:18:00.000Z"
  }
  ```

---

### 4. Delete Prep Item
- **Endpoint:** `DELETE /api/prep-items/:id`
- **Access:** Private
- **Response (`200 OK`):**
  ```json
  {
    "message": "Prep item deleted successfully"
  }
  ```
- **Ownership / Not Found Case (`404 Not Found`):**
  ```json
  {
    "error": "Prep item not found"
  }
  ```

---

## Authentication Error Handling

### Missing / Invalid JWT Token (`401 Unauthorized`)
- **Header:** Missing `Authorization` or invalid token format
- **Response (`401 Unauthorized`):**
  ```json
  {
    "error": "Not authorized, token failed"
  }
  ```
