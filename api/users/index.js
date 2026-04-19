// Sample user data - in production this would come from a database
let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In production, this should be hashed
    address: "123 Main St, City, State"
  }
];

let userIdCounter = 2;

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(users);
      break;
    
    case 'POST':
      if (req.query.action === 'login') {
        const { email, password } = req.query;
        
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          // Remove password from response
          const { password, ...userWithoutPassword } = user;
          res.status(200).json(userWithoutPassword);
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } else if (req.query.action === 'register') {
        const { name, email, password, address } = req.body;
        
        if (!name || !email || !password) {
          return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          return res.status(409).json({ error: 'User already exists' });
        }

        const newUser = {
          id: userIdCounter++,
          name,
          email,
          password, // In production, this should be hashed
          address: address || ""
        };

        users.push(newUser);
        
        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
      } else {
        res.status(400).json({ error: 'Action parameter required (login/register)' });
      }
      break;
    
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
