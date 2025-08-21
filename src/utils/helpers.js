// Format price to display currency
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price);
};

// Calculate discount price
export const calculateDiscountPrice = (price, discount) => {
  if (!discount) return price;
  return price - (price * (discount / 100));
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Generate slug from text
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

// Filter products by category
export const filterByCategory = (products, category) => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};

// Sort products by different criteria
export const sortProducts = (products, sortBy) => {
  if (!sortBy) return products;
  
  const productsCopy = [...products];
  
  switch (sortBy) {
    case 'price-low-high':
      return productsCopy.sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return productsCopy.sort((a, b) => b.price - a.price);
    case 'name-a-z':
      return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-z-a':
      return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      // Assuming there's a date field, otherwise this won't work correctly
      return productsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    default:
      return productsCopy;
  }
};

// Search products
export const searchProducts = (products, query) => {
  if (!query) return products;
  
  const lowerCaseQuery = query.toLowerCase();
  
  return products.filter(product => {
    return (
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery)
    );
  });
};