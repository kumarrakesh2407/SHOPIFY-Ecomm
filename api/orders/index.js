// Sample order data - in production this would come from a database
let orders = [
  {
    id: 1,
    userId: 1,
    products: [
      { id: 1, name: "PUMA Running Shoes", quantity: 1, price: 3999 },
      { id: 3, name: "Apple AirPods Pro", quantity: 1, price: 24999 }
    ],
    totalAmount: 28998,
    status: "CONFIRMED",
    orderDate: "2024-04-19T10:30:00Z"
  }
];

let orderIdCounter = 2;

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.userId) {
        const userOrders = orders.filter(order => order.userId === parseInt(req.query.userId));
        res.status(200).json(userOrders);
      } else {
        res.status(200).json(orders);
      }
      break;
    
    case 'POST':
      if (req.query.userId) {
        const { productQuantities, totalAmount } = req.body;
        
        if (!productQuantities || !totalAmount) {
          return res.status(400).json({ error: 'Product quantities and total amount are required' });
        }

        const newOrder = {
          id: orderIdCounter++,
          userId: parseInt(req.query.userId),
          products: productQuantities,
          totalAmount: totalAmount,
          status: "PENDING",
          orderDate: new Date().toISOString()
        };

        orders.push(newOrder);
        res.status(201).json(newOrder);
      } else {
        res.status(400).json({ error: 'User ID required' });
      }
      break;
    
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
