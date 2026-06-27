export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category:
    | "Cakes"
    | "Pastries"
    | "Fast Food"
    | "Cafe Specials"
    | "Hot Beverages"
    | "Cold Beverages";
  featured?: boolean;
  tag?: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Signature Chocolate Truffle",
    description: "Triple-layered Belgian chocolate with ganache drip",
    price: 899,
    category: "Cakes",
    featured: true,
    tag: "Bestseller",
  },
  {
    id: "2",
    name: "Rose & Pistachio Celebration Cake",
    description: "Delicate rose buttercream with crushed pistachio",
    price: 1199,
    category: "Cakes",
    featured: true,
  },
  {
    id: "3",
    name: "Classic Red Velvet",
    description: "Velvety crumb with cream cheese frosting",
    price: 749,
    category: "Cakes",
    featured: true,
  },
  {
    id: "4",
    name: "Vanilla Bean Designer Cake",
    description: "Hand-painted vanilla cake with gold leaf accents",
    price: 1499,
    category: "Cakes",
  },
  {
    id: "5",
    name: "Butter Croissant",
    description: "Flaky, golden, baked fresh every morning",
    price: 89,
    category: "Pastries",
    featured: true,
  },
  {
    id: "6",
    name: "Chocolate Eclair",
    description: "Choux pastry filled with vanilla cream",
    price: 129,
    category: "Pastries",
  },
  {
    id: "7",
    name: "Almond Danish",
    description: "Almond cream tucked in buttery layers",
    price: 149,
    category: "Pastries",
    featured: true,
  },
  {
    id: "8",
    name: "Strawberry Tart",
    description: "Crisp shell, vanilla custard, fresh berries",
    price: 179,
    category: "Pastries",
  },
  {
    id: "9",
    name: "Loaded Veg Burger",
    description: "House patty, melted cheese, peri-peri mayo",
    price: 199,
    category: "Fast Food",
  },
  {
    id: "10",
    name: "Cheesy Garlic Bread",
    description: "Toasted sourdough with mozzarella & herbs",
    price: 159,
    category: "Fast Food",
  },
  {
    id: "11",
    name: "Tandoori Paneer Wrap",
    description: "Smoky paneer, mint chutney, rolled fresh",
    price: 189,
    category: "Fast Food",
  },
  {
    id: "12",
    name: "Avocado Toast",
    description: "Sourdough, smashed avocado, chili flakes",
    price: 249,
    category: "Cafe Specials",
    featured: true,
  },
  {
    id: "13",
    name: "Mediterranean Pasta",
    description: "Olives, sundried tomato, basil pesto",
    price: 299,
    category: "Cafe Specials",
  },
  {
    id: "14",
    name: "Eggs Benedict",
    description: "Poached eggs, hollandaise, English muffin",
    price: 279,
    category: "Cafe Specials",
  },
  {
    id: "15",
    name: "Signature Cappuccino",
    description: "House blend espresso, silky steamed milk",
    price: 149,
    category: "Hot Beverages",
    featured: true,
    tag: "Popular",
  },
  {
    id: "16",
    name: "Salted Caramel Latte",
    description: "Rich espresso, caramel, sea salt finish",
    price: 189,
    category: "Hot Beverages",
  },
  {
    id: "17",
    name: "Hot Chocolate Indulgence",
    description: "Belgian cocoa, marshmallows, whipped cream",
    price: 169,
    category: "Hot Beverages",
  },
  {
    id: "18",
    name: "Masala Chai",
    description: "Slow-brewed with cardamom and ginger",
    price: 79,
    category: "Hot Beverages",
  },
  {
    id: "19",
    name: "Iced Mocha Frappe",
    description: "Chilled espresso, chocolate, cream cap",
    price: 199,
    category: "Cold Beverages",
    featured: true,
  },
  {
    id: "20",
    name: "Strawberry Milkshake",
    description: "Fresh strawberries blended with vanilla ice cream",
    price: 179,
    category: "Cold Beverages",
  },
  {
    id: "21",
    name: "Cold Brew",
    description: "16-hour cold extraction, smooth & bold",
    price: 169,
    category: "Cold Beverages",
  },
  {
    id: "22",
    name: "Mango Sunset Smoothie",
    description: "Mango, yogurt, honey, hint of cardamom",
    price: 189,
    category: "Cold Beverages",
  },
];

export const categories = [
  "Cakes",
  "Pastries",
  "Fast Food",
  "Cafe Specials",
  "Hot Beverages",
  "Cold Beverages",
] as const;
