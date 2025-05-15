# MyAiCook - AI-Powered Recipe Management System

MyAiCook is a modern web application built with Next.js and Firebase that helps users manage their recipes and ingredients efficiently. The application features an AI-powered recipe recommendation system and a comprehensive ingredient management system.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── ingredients/    # Ingredient management page
│   └── ...            # Other pages
├── components/         # Reusable React components
└── lib/               # Utility functions and configurations
    └── firebase.ts    # Firebase configuration
```

## Key Components

### 1. Ingredient Management System (`/ingredients`)

The ingredient management system allows users to:
- Add new ingredients with details like name, category, quantity, and unit
- Edit existing ingredients
- Delete ingredients
- View all ingredients in a grid layout

#### Features:
- Real-time updates using Firebase
- Form validation
- Responsive design
- Toast notifications for user feedback
- Animated UI elements using Framer Motion

#### Component Structure:
- `IngredientsPage`: Main component handling ingredient management
- Form components for adding/editing ingredients
- Grid display of ingredients
- CRUD operations with Firebase

### 2. Firebase Integration

The application uses Firebase for:
- Real-time database operations
- Authentication (if implemented)
- Cloud storage (if implemented)

### 3. UI/UX Features

- Modern, responsive design using Tailwind CSS
- Smooth animations with Framer Motion
- Toast notifications for user feedback
- Form validation and error handling
- Mobile-friendly interface

## Technologies Used

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **Database**: Firebase
- **Animation**: Framer Motion
- **Icons**: React Icons
- **Notifications**: React Hot Toast

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase configuration in `.env` file
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 