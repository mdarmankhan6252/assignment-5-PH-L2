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

POST	/api/v1/user/register	Register a new user
POST	/api/v1/auth/login	Login and receive access & refresh tokens
POST	/api/v1/auth/refresh-token	Get a new access token using refresh token
POST	/api/v1/auth/logout	Logout and clear tokens

---------

POST	/api/v1/parcel/create	Create a new parcel
GET	/api/v1/parcel/all-parcels	Get all parcels (Admin only or filterable)
PATCH	/api/v1/parcel/:id	Update parcel details 
DELETE	/api/v1/parcel/:id	Delete a parcel
