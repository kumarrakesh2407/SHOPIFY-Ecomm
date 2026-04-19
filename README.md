# E-Commerce Application - Vercel Deployment

This project has been configured for deployment on Vercel. The original Spring Boot backend has been converted to Vercel serverless functions.

## Project Structure

```
ecomm/
|-- api/                    # Serverless functions (backend)
|   |-- products/
|   |   `-- index.js       # Product management API
|   |-- orders/
|   |   `-- index.js       # Order management API
|   `-- users/
|       `-- index.js       # User management API
|-- Ecomm-UI/              # Frontend static files
|   |-- index.html
|   |-- cart.html
|   |-- css/
|   `-- js/
|-- package.json           # Node.js dependencies
|-- vercel.json           # Vercel configuration
`-- README.md             # This file
```

## API Endpoints

### Products API
- `GET /api/products` - Get all products
- `GET /api/products?id={id}` - Get product by ID
- `POST /api/products` - Add new product
- `DELETE /api/products?id={id}` - Delete product

### Orders API
- `GET /api/orders` - Get all orders
- `GET /api/orders?userId={id}` - Get orders by user ID
- `POST /api/orders/place/{userId}` - Place a new order

### Users API
- `GET /api/users` - Get all users
- `POST /api/users?action=login&email={email}&password={password}` - User login
- `POST /api/users?action=register` - User registration

## Deployment Instructions

### Prerequisites
1. Node.js installed locally
2. Vercel account (sign up at [vercel.com](https://vercel.com))
3. Git repository (optional but recommended)

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run locally:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser

### Deploy to Vercel

#### Method 1: Using Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your project

#### Method 2: Using GitHub Integration
1. Push your code to GitHub
2. Connect your GitHub account to Vercel
3. Import the repository in Vercel dashboard
4. Vercel will automatically deploy on every push

#### Method 3: Using Vercel Web Interface
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Upload or connect your repository
4. Configure build settings (if needed)
5. Click "Deploy"

## Configuration Files

### package.json
Defines the project dependencies and scripts for Vercel deployment.

### vercel.json
Configures:
- Static file serving from `Ecomm-UI/` directory
- API routing to serverless functions
- Build and deployment settings

## Important Notes

1. **Database**: The current implementation uses in-memory data storage. For production, you should:
   - Connect to a real database (MongoDB, PostgreSQL, etc.)
   - Use Vercel's environment variables for database credentials
   - Implement proper data persistence

2. **Authentication**: Current authentication is basic. For production:
   - Implement JWT tokens
   - Add password hashing
   - Use secure session management

3. **CORS**: Serverless functions handle CORS automatically with Vercel

4. **Environment Variables**: Set up in Vercel dashboard under Project Settings

## Testing the Deployment

After deployment, test:
1. Homepage loads correctly
2. Products display in categories
3. Add to cart functionality works
4. Navigation between pages works

## Troubleshooting

### Common Issues
- **404 errors**: Check `vercel.json` routing configuration
- **API errors**: Verify serverless function syntax and exports
- **Static file issues**: Ensure paths in `vercel.json` are correct

### Debugging
- Check Vercel deployment logs
- Use browser developer tools for network issues
- Test API endpoints directly using tools like Postman

## Production Considerations

1. **Performance**: Optimize images and implement caching
2. **Security**: Add rate limiting and input validation
3. **Monitoring**: Set up error tracking and analytics
4. **SEO**: Add meta tags and structured data

## Support

For Vercel-specific issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://vercel.com/community)

For application issues:
- Check the serverless function logs in Vercel dashboard
- Verify API endpoint configurations
- Test locally before deploying
