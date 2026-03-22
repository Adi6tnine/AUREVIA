export const COLORS = {
  pink: '#FCE9F1',
  purple: '#E6DDF8',
  sky: '#DDF0FF',
  cream: '#FDFBF7',
  white: '#FFFFFF',
  taupe: '#2C2826',
  gold: '#C9A96E',
  goldLight: '#F5EDD8',
};

export const customEase = [0.16, 1, 0.3, 1];

export const FREE_SHIPPING_THRESHOLD = 200;

export const CATEGORIES = ['All', 'Necklaces', 'Earrings', 'Rings'];

export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest', value: 'newest' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Isabelle M.',
    location: 'Paris',
    rating: 5,
    text: 'The Lumière Choker arrived in the most beautiful packaging. I wore it the same evening and received three compliments before dinner.',
    product: 'Lumière Choker',
  },
  {
    id: 2,
    name: 'Sofia R.',
    location: 'Milan',
    rating: 5,
    text: 'I have never owned a piece of jewellery that felt so alive. The pearl catches light in a way that feels almost magical.',
    product: 'Aura Ring',
  },
  {
    id: 3,
    name: 'Charlotte W.',
    location: 'London',
    rating: 5,
    text: 'Gifted the Whisper Chain to my mother for her birthday. She cried. That says everything.',
    product: 'Whisper Chain',
  },
  {
    id: 4,
    name: 'Amélie D.',
    location: 'Lyon',
    rating: 5,
    text: 'The craftsmanship is extraordinary. You can feel the care in every detail — this is not fast fashion, this is heirloom quality.',
    product: 'Ethereal Drops',
  },
  {
    id: 5,
    name: 'Nadia K.',
    location: 'Amsterdam',
    rating: 5,
    text: 'Ordered the Luna Pendant on a whim and it has become the piece I reach for every single day. Effortless luxury.',
    product: 'Luna Pendant',
  },
];

export const TRUST_ITEMS = [
  '✦ Handcrafted in small batches',
  '✦ 18k Gold Vermeil',
  '✦ Freshwater & Akoya Pearls',
  '✦ Free returns within 30 days',
  '✦ Complimentary gift wrapping',
  '✦ Carbon-neutral shipping',
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Lumière Choker',
    price: 185,
    category: 'Necklaces',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a8efbf80e46?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1599643477874-c58f0e55b169?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    ],
    tag: 'Bestseller',
    stock: 3,
    rating: 4.9,
    reviewCount: 42,
    variants: ['Pearl White', 'Blush Rose', 'Midnight Ivory'],
    care: 'Wipe gently with a soft cloth. Avoid contact with perfume and water.',
    description:
      'A delicate arrangement of freshwater pearls, strung by hand. Designed to rest softly against the collarbone.',
    createdAt: '2026-01-10',
  },
  {
    id: 2,
    name: 'Ethereal Drops',
    price: 120,
    category: 'Earrings',
    images: [
      'https://images.unsplash.com/photo-1573408301145-b98c413a290d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515562141207-7a8efbf80e46?auto=format&fit=crop&q=80&w=800',
    ],
    tag: 'New',
    stock: 8,
    rating: 4.7,
    reviewCount: 18,
    variants: ['Gold Vermeil', 'Sterling Silver'],
    care: 'Store in the pouch provided. Keep away from moisture.',
    description:
      'Suspended moments of elegance. These baroque pearl drops offer an organic, imperfect beauty.',
    createdAt: '2026-03-01',
  },
  {
    id: 3,
    name: 'Aura Ring',
    price: 95,
    category: 'Rings',
    images: [
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1573408301145-b98c413a290d?auto=format&fit=crop&q=80&w=800',
    ],
    tag: null,
    stock: 5,
    rating: 4.8,
    reviewCount: 27,
    variants: ['Size 5', 'Size 6', 'Size 7', 'Size 8'],
    care: 'Remove before washing hands. Polish with a jewellery cloth.',
    description:
      'A single, luminous pearl set in an organic, flowing gold vermeil band.',
    createdAt: '2026-02-14',
  },
  {
    id: 4,
    name: 'Whisper Chain',
    price: 145,
    category: 'Necklaces',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800',
    ],
    tag: null,
    stock: 12,
    rating: 4.6,
    reviewCount: 33,
    variants: ['Pearl White', 'Champagne'],
    care: 'Lay flat when storing. Avoid tangling with other pieces.',
    description:
      'An ultra-fine chain interspersed with tiny seed pearls. A subtle luxury meant to be worn daily.',
    createdAt: '2026-01-28',
  },
  {
    id: 5,
    name: 'Soleil Studs',
    price: 85,
    category: 'Earrings',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1573408301145-b98c413a290d?auto=format&fit=crop&q=80&w=800',
    ],
    tag: 'New',
    stock: 15,
    rating: 4.9,
    reviewCount: 11,
    variants: ['Gold Vermeil', 'Sterling Silver', 'Rose Gold'],
    care: 'Store separately to avoid scratching. Clean with a dry cloth.',
    description:
      'Perfectly round Akoya pearls set in 18k gold vermeil. The ideal everyday stud.',
    createdAt: '2026-03-15',
  },
  {
    id: 6,
    name: 'Cascade Bracelet',
    price: 165,
    category: 'Necklaces',
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515562141207-7a8efbf80e46?auto=format&fit=crop&q=80&w=800',
    ],
    tag: 'Bestseller',
    stock: 2,
    rating: 5.0,
    reviewCount: 9,
    variants: ['Pearl White'],
    care: 'Handle with care. Clasp gently to preserve the setting.',
    description:
      'A flowing cascade of graduated freshwater pearls on a delicate gold chain. Effortless luxury.',
    createdAt: '2026-02-01',
  },
  {
    id: 7,
    name: 'Dew Drop Ring',
    price: 110,
    category: 'Rings',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800',
    ],
    tag: null,
    stock: 7,
    rating: 4.7,
    reviewCount: 14,
    variants: ['Size 5', 'Size 6', 'Size 7'],
    care: 'Remove before sleeping. Store in the velvet pouch.',
    description:
      'A teardrop baroque pearl cradled in a sculptural gold band. Wearable art.',
    createdAt: '2026-03-05',
  },
  {
    id: 8,
    name: 'Luna Pendant',
    price: 195,
    category: 'Necklaces',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    ],
    tag: null,
    stock: 4,
    rating: 4.8,
    reviewCount: 22,
    variants: ['Pearl White', 'Blush Rose'],
    care: 'Store flat. Avoid exposure to direct sunlight for extended periods.',
    description:
      'A crescent-shaped pendant suspending a single luminous pearl. Inspired by moonrise.',
    createdAt: '2026-01-20',
  },
];
