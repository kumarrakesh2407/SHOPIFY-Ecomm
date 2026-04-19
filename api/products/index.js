// Sample product data - in production this would come from a database
const products = [
  {
    id: 1,
    name: "PUMA Running Shoes",
    description: "Comfortable running shoes with excellent cushioning",
    price: 3999,
    category: "Clothing",
    imageUrl: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/product/376572/01/sv01/fnd/IND/fmt/png/Running-Shoes"
  },
  {
    id: 2,
    name: "Nike Sport T-Shirt",
    description: "Breathable sports t-shirt for workouts",
    price: 1299,
    category: "Clothing",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/9216cd3f-9d5a-4b7c-8bb4-9c9c8c6c6c6c/sport-t-shirt.jpg"
  },
  {
    id: 3,
    name: "Apple AirPods Pro",
    description: "Wireless earbuds with active noise cancellation",
    price: 24999,
    category: "Electronics",
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MWP22?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1592845404000"
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch",
    description: "Smart watch with health tracking features",
    price: 18999,
    category: "Electronics",
    imageUrl: "https://images.samsung.com/is/image/samsung/p6/sg-sm-r860nzdbxwa/gallery/sg-galaxy-watch-active2-44mm-r860-black-sm-r860nzdbxwa-thumb-327540382?$720_576_PNG$"
  },
  {
    id: 5,
    name: "Adidas Track Pants",
    description: "Comfortable track pants for casual wear",
    price: 2299,
    category: "Clothing",
    imageUrl: "https://assets.adidas.com/images/w_600,f_auto,q_auto/6d7f2a9a8c8a4d4b8a8a4d4b8a8a4d4b/Track-Pants-Black.jpg"
  },
  {
    id: 6,
    name: "Sony WH-1000XM4 Headphones",
    description: "Premium wireless headphones with noise cancellation",
    price: 29999,
    category: "Electronics",
    imageUrl: "https://www.sony.com/image/image/3000x3000/5f8b6b6b6b6b6b6b6b6b6b6b6b6b6b6b/WH-1000XM4.jpg"
  }
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        const product = products.find(p => p.id === parseInt(req.query.id));
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } else {
        res.status(200).json(products);
      }
      break;
    
    case 'POST':
      const newProduct = {
        id: products.length + 1,
        ...req.body
      };
      products.push(newProduct);
      res.status(201).json(newProduct);
      break;
    
    case 'DELETE':
      if (req.query.id) {
        const index = products.findIndex(p => p.id === parseInt(req.query.id));
        if (index !== -1) {
          products.splice(index, 1);
          res.status(200).json({ message: 'Product deleted successfully' });
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } else {
        res.status(400).json({ error: 'Product ID required' });
      }
      break;
    
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
