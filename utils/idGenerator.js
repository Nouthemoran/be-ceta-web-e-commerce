// Di utils/idGenerator.js
const generateCustomId = (prefix = '', length = 8) => {
    const randomPart = generateRandomString(length);
    
    // Custom prefix mapping
    const prefixMap = {
      PRODUCT: 'PRODUCT',
      CART: 'CART',
      ORDER: 'ORDER',
      INV: 'INV'
    };
    
    return `${prefixMap[prefix] || prefix}-${randomPart}`;
  };