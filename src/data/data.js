export const products = [
  {
    id: 'apple',
    name: 'Red Apple',
    cartName: 'Natural Red Apple',
    subtitle: '1kg, Price',
    price: 4.99,
    imageKey: 'apple',
    heroImageKey: 'appleHero',
    thumbnailKey: 'apple',
    brand: 'Individual Collection',
    categories: ['Fresh Fruits & Vegetables'],
  },
  {
    id: 'banana',
    name: 'Organic Bananas',
    subtitle: '12kg, Price',
    price: 4.0,
    imageKey: 'banana',
    brand: 'Individual Collection',
    categories: ['Fresh Fruits & Vegetables'],
  },
  {
    id: 'red-pepper',
    name: 'Bell Pepper Red',
    subtitle: '1kg, Price',
    price: 4.99,
    imageKey: 'redPepper',
    brand: 'Individual Collection',
    categories: ['Fresh Fruits & Vegetables'],
  },
  {
    id: 'ginger',
    name: 'Ginger',
    subtitle: '250gm, Price',
    price: 2.99,
    imageKey: 'ginger',
    brand: 'Individual Collection',
    categories: ['Fresh Fruits & Vegetables'],
  },
  {
    id: 'egg-chicken-red',
    name: 'Egg Chicken Red',
    subtitle: '4pcs, Price',
    price: 1.99,
    imageKey: 'chicken',
    brand: 'Kazi Farms',
    categories: ['Eggs'],
  },
  {
    id: 'diet-coke',
    name: 'Diet Coke',
    subtitle: '355ml, Price',
    price: 1.99,
    imageKey: 'dietCoke',
    brand: 'Cocola',
    categories: ['Beverages'],
  },
  {
    id: 'sprite-can',
    name: 'Sprite Can',
    subtitle: '325ml, Price',
    price: 1.5,
    imageKey: 'sprite',
    brand: 'Cocola',
    categories: ['Beverages'],
  },
  {
    id: 'apple-grape-juice',
    name: 'Apple & Grape Juice',
    subtitle: '2L, Price',
    price: 15.5,
    imageKey: 'appleGrapeJuice',
    brand: 'Cocola',
    categories: ['Beverages'],
  },
  {
    id: 'coca-cola-can',
    name: 'Coca Cola Can',
    subtitle: '325ml, Price',
    price: 4.99,
    imageKey: 'cocaCola',
    brand: 'Cocola',
    categories: ['Beverages'],
  },
  {
    id: 'pepsi-can',
    name: 'Pepsi Can',
    subtitle: '330ml, Price',
    price: 4.99,
    imageKey: 'pepsi',
    brand: 'Cocola',
    categories: ['Beverages'],
  },
];

export const productMap = Object.fromEntries(products.map((product) => [product.id, product]));

export const defaultCartSeed = [
  { productId: 'red-pepper', quantity: 1 },
  { productId: 'egg-chicken-red', quantity: 1 },
  { productId: 'banana', quantity: 1 },
  { productId: 'ginger', quantity: 1 },
];

export const defaultFavoriteIds = [
  'sprite-can',
  'diet-coke',
  'apple-grape-juice',
  'coca-cola-can',
  'pepsi-can',
];

export function getProductById(productId = 'apple') {
  return productMap[productId] ?? productMap.apple;
}
