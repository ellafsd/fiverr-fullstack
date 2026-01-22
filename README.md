# Fiverr Full-Stack Application

## About
A full-stack Fiverr-like marketplace application built with a separate client and API. 
Users can browse services by category or search, view detailed gig pages, and explore seller profiles. 
Sellers can create, manage, and delete their own services, including pricing, delivery time, revisions, and images. The project demonstrates real-world features such as authentication, role-based UI, CRUD operations, reusable components, and state synchronization after data mutations.

## Features
- User and seller authentication
- Role-based UI (buyer / seller)
- Create, list, and delete services (gigs)
- Image upload with slider preview
- Category and keyword-based search


## Tech Stack

### Frontend
- React
- React Router DOM
- React Toastify
- Day.js
- Axios
- TanStack Query
- Splide (React Splide)
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (image/file uploads)
- Dotenv (environment variables)
- Bcrypt (password hashing)

## Contributing
Contributions, issues, and feature requests are welcome.  
Feel free to fork the repository and submit a pull request.

## Getting Started
1. Clone the repository.
2. Install dependencies in both `client` and `api` folders.
3. Set up environment variables (`.env`) in the `api` folder (e.g. `JWT_SECRET`, database connection string).
4. Run `npm run dev` in both `client` and `api`.
