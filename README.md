# API Documentation for Online Live Chat Room App

## Table of Contents

1. [Get List of Chat Rooms](#1-get-list-of-chat-rooms-story-2)
2. [User Login](#2-user-login-story-3)
3. [Get Room Details](#3-get-room-details-story-4)
4. [Post a Comment](#4-post-a-comment-story-5)
5. [Soft Delete a Comment](#5-soft-delete-a-comment-story-6)
6. [Edit a Comment](#6-edit-a-comment-story-7)

---

## **1. Get List of Chat Rooms** (Story 2)

- **Endpoint:** `/rooms`
- **Method:** `GET`
- **URL Parameters:** None

### **Example Request**

```http
GET /rooms
```

### **Success Response**

**Code:** `200 OK`

```json
{
  "message": "Successfully retrieved rooms.",
  "data": [
    {
      "roomId": "1",
      "roomName": "General Chat",
      "commentCount": 123,
      "latestCommentDate": "DD-MM-YY"
    }
  ]
}
```

### **Error Response**

**Code:** `500 INTERNAL SERVER ERROR`

```json
{
  "message": "Unexpected error",
  "data": {}
}
```

---

## **2. User Login** (Story 3)

- **Endpoint:** `/login`
- **Method:** `POST`
- **URL Parameters:** None

### **Example Request**

```http
POST /login
```

### **Success Response**

**Code:** `200 OK`

```json
{
  "message": "Successfully logged in.",
  "data": {
    "username": "Joe Blogs"
  }
}
```

### **Error Responses**

**Code:** `400 BAD REQUEST`

```json
{
  "message": "Missing login information",
  "data": {}
}
```

**Code:** `401 UNAUTHORIZED`

```json
{
  "message": "Invalid username or password",
  "data": {}
}
```

**Code:** `500 INTERNAL SERVER ERROR`

```json
{
  "message": "Unexpected error",
  "data": {}
}
```

---

## **3. Get Room Details** (Story 4)

- **Endpoint:** `/rooms/:roomId`
- **Method:** `GET`
- **URL Parameters:** `roomId` (required)

### **Example Request**

```http
GET /rooms/123
```

### **Success Response**

**Code:** `200 OK`

```json
{
  "message": "Successfully retrieved room.",
  "data": {
    "name": "Top Secret Room",
    "comments": [
      {
        "commentId": "123",
        "userId": "007",
        "timestamp": 1739157340,
        "author": "James Bond",
        "content": "This is a message",
        "isEdited": true
      }
    ]
  }
}
```

### **Error Responses**

**Code:** `400 BAD REQUEST`

```json
{
  "message": "Invalid room ID",
  "data": {}
}
```

**Code:** `500 INTERNAL SERVER ERROR`

```json
{
  "message": "Unexpected error",
  "data": {}
}
```

---

## **4. Post a Comment** (Story 5)

- **Endpoint:** `/rooms/:roomId/addComment`
- **Method:** `POST`
- **URL Parameters:** `roomId` (required)

### **Example Request**

```http
POST /rooms/123/addComment
```

### **Success Response**

**Code:** `201 CREATED`

```json
{
  "message": "Successfully added comment.",
  "data": {
    "commentId": "420"
  }
}
```

### **Error Responses**

**Code:** `400 BAD REQUEST`

```json
{
  "message": "Invalid or missing form data",
  "data": {}
}
```

**Code:** `401 UNAUTHORIZED`

```json
{
  "message": "Not logged in",
  "data": {}
}
```

**Code:** `500 INTERNAL SERVER ERROR`

```json
{
  "message": "Unexpected error",
  "data": {}
}
```

---

## **5. Soft Delete a Comment** (Story 6)

- **Endpoint:** `/rooms/:roomId/:commentId/delete`
- **Method:** `PUT`
- **URL Parameters:** `roomId`, `commentId` (required)

### **Example Request**

```http
PUT /rooms/123/420/delete
```

### **Success Response**

**Code:** `200 OK`

```json
{
  "message": "Successfully soft deleted comment.",
  "data": {
    "commentId": "420",
    "isDeleted": true
  }
}
```

### **Error Responses**

**Code:** `400 BAD REQUEST`

```json
{
  "message": "Invalid comment ID",
  "data": {}
}
```

**Code:** `401 UNAUTHORIZED`

```json
{
  "message": "Not logged in",
  "data": {}
}
```

**Code:** `500 INTERNAL SERVER ERROR`

```json
{
  "message": "Unexpected error",
  "data": {}
}
```

---

## **6. Edit a Comment** (Story 7)

- **Endpoint:** `/rooms/:roomId/:commentId/edit`
- **Method:** `PUT`
- **URL Parameters:** `roomId`, `commentId` (required)

### **Example Request**

```http
PUT /rooms/123/420/edit
```

### **Success Response**

**Code:** `200 OK`

```json
{
  "message": "Successfully edited comment.",
  "data": {
    "commentId": "420",
    "isEdited": true
  }
}
```

### **Error Responses**

**Code:** `400 BAD REQUEST`

```json
{
  "message": "Invalid comment ID",
  "data": {}
}
```

**Code:** `401 UNAUTHORIZED`

```json
{
  "message": "Not logged in",
  "data": {}
}
```

**Code:** `500 INTERNAL SERVER ERROR`

```json
{
  "message": "Unexpected error",
  "data": {}
}
```