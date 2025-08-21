// Mock Categories Data
export const categories = [
  {
    id: 1,
    name: "Women's Collection",
    slug: "women",
    image: "https://images.pexels.com/photos/8386654/pexels-photo-8386654.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 2,
    name: "Men's Collection",
    slug: "men",
    image: "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 3,
    name: "Accessories",
    slug: "accessories",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600"
  }
];

// Mock Featured Products Data
export const featuredProducts = [
  {
    id: 1,
    name: "Cashmere Blend Sweater",
    description: "Luxurious cashmere blend sweater with a relaxed fit, perfect for everyday comfort and style.",
    price: 129.99,
    discount: 0,
    image: "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "men",
    rating: 4.8,
    reviewCount: 56,
    freeShipping: true,
    colors: ["Black", "Camel", "Grey"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Silk Slip Dress",
    description: "Elegant silk slip dress with adjustable straps and a flattering cut, perfect for special occasions.",
    price: 189.99,
    discount: 15,
    image: "https://images.pexels.com/photos/7691218/pexels-photo-7691218.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "women",
    rating: 4.7,
    reviewCount: 42,
    freeShipping: true,
    colors: ["Ivory", "Black", "Sage"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    description: "Handcrafted leather crossbody bag with adjustable strap and multiple compartments for organization.",
    price: 249.99,
    discount: 0,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "accessories",
    rating: 4.9,
    reviewCount: 78,
    freeShipping: true,
    colors: ["Tan", "Black", "Brown"],
    sizes: []
  },
  {
    id: 4,
    name: "Wool Tailored Coat",
    description: "Premium wool tailored coat with a timeless silhouette, perfect for elevating your winter wardrobe.",
    price: 329.99,
    discount: 10,
    image: "https://images.pexels.com/photos/7691223/pexels-photo-7691223.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "women",
    rating: 4.6,
    reviewCount: 35,
    freeShipping: true,
    colors: ["Camel", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL"]
  }
];

// Mock All Products Data
export const allProducts = [
  ...featuredProducts,
  {
    id: 5,
    name: "Linen Button-Down Shirt",
    description: "Breathable linen button-down shirt with a relaxed fit, perfect for warm weather.",
    price: 89.99,
    discount: 0,
    image: "https://images.pexels.com/photos/6626892/pexels-photo-6626892.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "men",
    rating: 4.5,
    reviewCount: 48,
    freeShipping: true,
    colors: ["White", "Blue", "Sand"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 6,
    name: "Gold Hoop Earrings",
    description: "Handcrafted gold hoop earrings with a modern design, adds elegance to any outfit.",
    price: 79.99,
    discount: 0,
    image: "https://images.pexels.com/photos/13088073/pexels-photo-13088073.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "accessories",
    rating: 4.8,
    reviewCount: 63,
    freeShipping: true,
    colors: ["Gold"],
    sizes: []
  },
  {
    id: 7,
    name: "Wide-Leg Trousers",
    description: "Sophisticated wide-leg trousers with a high waist, perfect for office or evening wear.",
    price: 119.99,
    discount: 20,
    image: "https://images.pexels.com/photos/7691246/pexels-photo-7691246.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "women",
    rating: 4.7,
    reviewCount: 39,
    freeShipping: true,
    colors: ["Black", "Navy", "Olive"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 8,
    name: "Leather Dress Shoes",
    description: "Classic leather dress shoes with a comfortable fit, handcrafted with premium materials.",
    price: 199.99,
    discount: 0,
    image: "https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "men",
    rating: 4.9,
    reviewCount: 72,
    freeShipping: true,
    colors: ["Black", "Brown"],
    sizes: ["7", "8", "9", "10", "11", "12"]
  }
];