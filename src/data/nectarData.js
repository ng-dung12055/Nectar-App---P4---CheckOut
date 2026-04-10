import { getProductById } from './data';

const IMAGES = {
  apple: require('../../assets/nectar/apple.png'),
  appleHero: require('../../assets/nectar/apple-hero.png'),
  appleGrapeJuice: require('../../assets/nectar/apple-grape-juice.png'),
  banana: require('../../assets/nectar/banana.png'),
  chicken: require('../../assets/nectar/chicken.png'),
  cocaCola: require('../../assets/nectar/coca-cola.png'),
  dietCoke: require('../../assets/nectar/diet-coke.png'),
  errorBag: require('../../assets/derived/error-bag.png'),
  ginger: require('../../assets/nectar/ginger.png'),
  orderBadge: require('../../assets/derived/order-badge.png'),
  profileAvatar: require('../../assets/derived/account-avatar.png'),
  redPepper: require('../../assets/nectar/red-pepper.png'),
  sprite: require('../../assets/nectar/sprite.png'),
  vegetablesHero: require('../../assets/nectar/vegetables-hero.png'),
};

export const nectarTheme = {
  background: '#FFFFFF',
  text: '#181725',
  mutedText: '#7C7C7C',
  border: '#E2E2E2',
  green: '#53B175',
  greenSoft: '#EAF6EE',
};

export function getImageSource(imageKey) {
  return IMAGES[imageKey] ?? IMAGES.apple;
}

export function getGraphicSource(graphicKey) {
  return IMAGES[graphicKey];
}

export function getProductDetail(productId = 'apple') {
  const product = getProductById(productId);

  return {
    id: product.id,
    name: product.name,
    cartName: product.cartName ?? product.name,
    subtitle: product.subtitle,
    price: product.price,
    imageKey: product.heroImageKey ?? product.imageKey,
    thumbnailKey: product.thumbnailKey ?? product.imageKey,
  };
}

export function buildCartItem(productId) {
  const product = getProductById(productId);

  return {
    id: product.id,
    name: product.cartName ?? product.name,
    subtitle: product.subtitle,
    price: product.price,
    imageKey: product.thumbnailKey ?? product.imageKey,
  };
}
