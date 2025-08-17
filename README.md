# 🚚 Parcel Delivery System API

This is a backend API for a Parcel Delivery System, built with **Node.js**, **Express**, and **MongoDB** using **Mongoose** ODM. It includes features such as user authentication, parcel creation, real-time parcel tracking, and status updates.

## 📌 Features

- 🔐 User Authentication (JWT-based with Access & Refresh Tokens)
- 📦 Create, Update, and Track Parcels
- 🚦 Status updates (e.g., pending, in-transit, delivered, cancelled)
- 📁 Role-based Access (Admin, Customer, Delivery Staff)
- 🧾 RESTful API design
- 🛡️ Protected routes with authorization middleware

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Zod
- **Error Handling:** Centralized Error Middleware

## 🛠️ API

#### Register a new user
- POST	/api/v1/user/register
#### fetch all users
- GET	/api/v1/user/all-users
#### Update a user
- PATCH	/api/v1/user/:id
#### Log in a user
- POST	/api/v1/auth/login
#### Logout a user
- POST	/api/v1/auth/logout
#### Get a new access token using refresh token
- POST	/api/v1/auth/refresh-token

---------

#### create new parcel
- POST	/api/v1/parcel/create
#### fetch all parcels
- GET	/api/v1/parcel/all-parcels
#### fetch single parcels
- POST	/api/v1/parcel/:id
#### Update parcel status
- PATCH	/api/v1/parcel/status/:id
#### Delete a parcel status
- DELETE	/api/v1/parcel/:id


  ## Thanks.
