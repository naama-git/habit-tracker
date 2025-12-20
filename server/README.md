## Technologies
- Node.js & Express
- MongoDB (Database)
- JWT (for Authentication)

##  Environment Variables
To run this server, you will need to add a `.env` file with the following:
- `PORT`: Server port (e.g., 5000)
- `DATABASE_URI`: Your MongoDB connection string
- `ACCESS_TOKEN_SECRET`: A secret key for tokens

##  Getting Started
1. Navigate to this directory: `cd server`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## API Endpoints
- `POST /user/signup` - User registration
- `POST /user/login` - User login
- `GET /myHabits` - Retrieve user habits
- `POST /myHabits` - Create a new habit
- `GET /myHabits/:id` - Retrieve specific habit
- `DELETE /myHabits/:id` - Delete a habit
- `PATCH /myHabits/:id` - Update habit

