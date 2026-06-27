import { productsData } from './products';

const DB_KEY = 'buzzhive_local_db';

// Initialize the database with placeholder data if it's empty
const initDb = () => {
  const existing = localStorage.getItem(DB_KEY);
  if (!existing) {
    // Transform productsData into a flat list of products with a category ID
    const initialProducts = [];
    productsData.forEach(cat => {
      cat.items.forEach((item, index) => {
        initialProducts.push({
          id: `${cat.id}-${index}-${Date.now()}`,
          categoryId: cat.id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          createdAt: Date.now()
        });
      });
    });
    localStorage.setItem(DB_KEY, JSON.stringify(initialProducts));
  }
};

export const getProducts = () => {
  initDb();
  return JSON.parse(localStorage.getItem(DB_KEY)) || [];
};

export const getProductsByCategory = (categoryId) => {
  const products = getProducts();
  return products.filter(p => p.categoryId === categoryId);
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: `prod-${Date.now()}`,
    createdAt: Date.now()
  };
  products.push(newProduct);
  localStorage.setItem(DB_KEY, JSON.stringify(products));
  return newProduct;
};

export const deleteProduct = (productId) => {
  const products = getProducts();
  const updated = products.filter(p => p.id !== productId);
  localStorage.setItem(DB_KEY, JSON.stringify(updated));
};
