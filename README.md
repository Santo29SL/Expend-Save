# Expend & Save

A full-stack personal finance management and investment planning platform that helps users track expenses, manage savings goals, analyze spending habits, and receive AI-powered investment recommendations.

## Features

### User Authentication

* Secure user registration and login
* JWT-based authentication
* Password encryption using bcrypt
* User profile management

### Financial Dashboard

* Monthly salary tracking
* Savings target management
* Real-time balance overview
* Financial summary dashboard

### Expense & Income Tracking

* Add and manage transactions
* Categorize expenses and income
* Transaction history view
* Delete transaction records
* Real-time financial updates

### Budget Analytics

* Interactive spending visualization
* Doughnut chart for budget distribution
* Savings vs expense comparison
* Monthly financial insights

### Investment Planning

* Bank investment schemes
* Post Office investment schemes
* Risk-based investment categorization
* Return rate comparison

### AI-Powered Investment Advisor

* Personalized investment recommendations
* Goal-based financial planning
* Risk assessment engine
* Investment strategy suggestions
* Market-cap recommendations
* AI-generated financial reasoning

### Financial Goal Calculator

* Goal amount estimation
* Monthly investment calculation
* Return projections
* Investment growth analysis

### Live Financial Information

* Financial awareness tips
* RBI-inspired financial guidance
* Mutual fund information
* Stock market information

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* Tailwind CSS
* Chart.js

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose ODM

### Authentication & Security

* JWT (JSON Web Token)
* bcryptjs
* CORS

### AI Integration

* Groq API

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Architecture

```text
ExpendAndSave/
│
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── tailwind.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ExpendAndSave.git
cd ExpendAndSave
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

Start Backend:

```bash
npm start
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Run using VS Code Live Server or any static server.

---

## API Endpoints

### User Routes

```http
POST   /api/users
POST   /api/users/login
GET    /api/users/me
PUT    /api/users/profile
```

### Transaction Routes

```http
GET    /api/transactions
POST   /api/transactions
DELETE /api/transactions/:id
```

### Investment Schemes

```http
GET    /api/schemes
POST   /api/schemes/calculate
```

### AI Recommendations

```http
POST   /api/ai/suggest
```

---

## Deployment

### Frontend Deployment (Vercel)

```bash
git push origin main
```

Automatic deployment is triggered through GitHub integration.

### Backend Deployment (Render)

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

Environment Variables:

```env
MONGO_URI=
JWT_SECRET=
GROQ_API_KEY=
```

---

## Security Features

* Password hashing using bcrypt
* JWT authentication
* Protected API routes
* Environment variable management
* Secure MongoDB Atlas connection
* CORS configuration

---

## Future Enhancements

* Email notifications
* Expense export to PDF/Excel
* Recurring transaction management
* Real-time stock market APIs
* Advanced investment analytics
* Mobile application support
* Multi-currency support
* Financial forecasting using Machine Learning

---

## Author

**Santhosh S L**

Personal Finance & AI-Powered Investment Advisory Application

---

## License

This project is developed for educational, portfolio, internship, and demonstration purposes.
