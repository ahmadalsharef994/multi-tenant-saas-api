# 🏢 Multi-Tenant SaaS API

A production-ready multi-tenant Software-as-a-Service (SaaS) API built with Node.js, Express.js, and MongoDB. Designed for enterprise applications requiring complete tenant isolation, role-based access control, and scalable architecture.

## ✨ Features

### 🔐 Multi-Tenancy Architecture
- **Complete Tenant Isolation**: Each tenant's data is completely separated
- **Database Per Tenant**: Dedicated MongoDB database for each tenant
- **Tenant-Aware Routing**: Automatic tenant identification and routing
- **Cross-Tenant Security**: Prevents data leakage between tenants

### 🛡️ Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: Granular permission management
- **Tenant-Scoped Permissions**: Roles and permissions isolated per tenant
- **Password Hashing**: Secure password storage with bcrypt

### 🚀 Enterprise Features
- **RESTful API Design**: Clean, standardized API endpoints
- **Middleware Architecture**: Modular and extensible middleware system
- **Error Handling**: Comprehensive error handling and logging
- **Request Validation**: Input validation and sanitization
- **Rate Limiting**: Protection against abuse and DoS attacks

### 📊 Scalability & Performance
- **Connection Pooling**: Efficient database connection management
- **Caching Layer**: Redis integration for improved performance
- **Horizontal Scaling**: Designed for multi-instance deployment
- **Database Indexing**: Optimized queries and performance

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt, helmet, cors
- **Validation**: Joi or express-validator
- **Environment**: dotenv for configuration

## 📋 Prerequisites

- Node.js 16+ and npm
- MongoDB 4.4+
- Redis (optional, for caching)

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ahmadalsharef994/multi-tenant-saas-api.git
cd multi-tenant-saas-api
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the application:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## ⚙️ Configuration

### Environment Variables
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/
DB_NAME_PREFIX=tenant_

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h

# Redis Configuration (optional)
REDIS_URL=redis://localhost:6379
```

### Tenant Configuration
```javascript
// Example tenant structure
{
  "tenantId": "company-abc",
  "name": "Company ABC",
  "domain": "company-abc.yourapp.com",
  "dbName": "tenant_company_abc",
  "settings": {
    "maxUsers": 100,
    "features": ["analytics", "reports"]
  }
}
```

## 🎯 API Endpoints

### Authentication
```bash
POST /api/auth/login          # Tenant user login
POST /api/auth/register       # Tenant user registration
POST /api/auth/refresh        # Refresh JWT token
POST /api/auth/logout         # User logout
```

### Tenant Management
```bash
GET    /api/tenants           # List all tenants (admin only)
POST   /api/tenants           # Create new tenant
GET    /api/tenants/:id       # Get tenant details
PUT    /api/tenants/:id       # Update tenant
DELETE /api/tenants/:id       # Delete tenant
```

### User Management (Tenant-Scoped)
```bash
GET    /api/users             # List tenant users
POST   /api/users             # Create user
GET    /api/users/:id         # Get user details
PUT    /api/users/:id         # Update user
DELETE /api/users/:id         # Delete user
```

### Roles & Permissions
```bash
GET    /api/roles             # List tenant roles
POST   /api/roles             # Create role
PUT    /api/roles/:id         # Update role
DELETE /api/roles/:id         # Delete role
```

## 🏗️ Architecture

### Multi-Tenant Strategy
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Tenant A      │    │   Tenant B      │    │   Tenant C      │
│   Database      │    │   Database      │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Application    │
                    │  Layer          │
                    └─────────────────┘
```

### Request Flow
1. **Tenant Identification**: Extract tenant from subdomain/header
2. **Database Selection**: Connect to tenant-specific database
3. **Authentication**: Verify JWT token and tenant access
4. **Authorization**: Check role-based permissions
5. **Business Logic**: Execute tenant-scoped operations
6. **Response**: Return tenant-specific data

## 📚 Usage Examples

### Creating a New Tenant
```javascript
const response = await fetch('/api/tenants', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + adminToken
  },
  body: JSON.stringify({
    name: 'Acme Corporation',
    domain: 'acme.yourapp.com',
    adminEmail: 'admin@acme.com'
  })
});
```

### Tenant-Scoped User Authentication
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Tenant-ID': 'acme-corp'
  },
  body: JSON.stringify({
    email: 'user@acme.com',
    password: 'securepassword'
  })
});
```

## 🔧 Development

### Running Tests
```bash
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate coverage report
```

### Code Quality
```bash
npm run lint              # Run ESLint
npm run format            # Format code with Prettier
```

### Database Migration
```bash
npm run migrate           # Run database migrations
npm run seed              # Seed test data
```

## 🚀 Deployment

### Docker Deployment
```dockerfile
# Dockerfile included for containerized deployment
docker build -t multi-tenant-api .
docker run -p 3000:3000 multi-tenant-api
```

### Production Considerations
- Use process managers (PM2, Docker)
- Configure reverse proxy (Nginx)
- Set up monitoring and logging
- Implement backup strategies
- Use environment-specific configurations

## 🔒 Security Best Practices

- **Input Validation**: All inputs validated and sanitized
- **SQL Injection Prevention**: Parameterized queries with Mongoose
- **XSS Protection**: Content Security Policy headers
- **Rate Limiting**: Prevent abuse and DoS attacks
- **HTTPS Only**: Force secure connections in production
- **Tenant Isolation**: Complete data separation between tenants

## 📈 Performance Optimization

- **Database Indexing**: Optimized queries with proper indexes
- **Connection Pooling**: Efficient database connection management
- **Caching**: Redis integration for frequently accessed data
- **Compression**: Gzip compression for API responses
- **CDN Integration**: Static asset delivery optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) for the web framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling
- [JWT](https://jwt.io/) for authentication tokens

## 📞 Support

For support and questions:
- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/ahmadalsharef994/multi-tenant-saas-api/issues)
- 📖 Documentation: [Wiki](https://github.com/ahmadalsharef994/multi-tenant-saas-api/wiki)

---

**Built for enterprise-grade multi-tenant applications** 🏢
