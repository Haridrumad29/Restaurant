// Define special offers and their rules
export const specialOffers = {
  comboDeal: {
    id: 'combo1',
    name: 'Combo Deal',
    description: 'Any Burger + Drink + Fries',
    price: 180,
    originalPrice: 220,
    savings: 40,
    items: [
      {
        id: 1, // Classic Burger
        name: "Classic Burger",
        price: 120,
        quantity: 1,
      },
      {
        id: 10, // Cola
        name: "Cola",
        price: 60,
        quantity: 1,
      },
      {
        id: 'fries1',
        name: "Salted Fries",
        price: 40,
        quantity: 1,
      }
    ]
  },
  pizzaParty: {
    id: 'pizza-party',
    name: 'Pizza Party',
    description: 'Buy 2 Pizzas, Get 1 FREE',
    minimumOrder: 500,
    eligibleCategories: ['pizzas'],
    discount: 'buy2get1'
  },
  studentSpecial: {
    id: 'student-special',
    name: 'Student Special',
    description: '20% off on all items',
    discountPercent: 20,
    requiresId: true
  }
};