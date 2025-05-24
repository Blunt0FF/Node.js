// Задание 1 — Типизация функции с несколькими параметрами
function calculateTotal(price: number, quantity: number, discount: number = 0): number {
  const total = price * quantity;
  return total - (total * discount);
}

console.log("Total:", calculateTotal(100, 2)); // 200
console.log("Total with discount:", calculateTotal(100, 2, 0.1)); // 180

// Задание 2 — Использование Union типов
let id: string | number;

id = "abc123";
displayId(id); // ABC123

id = 42;
displayId(id); // 420

function displayId(id: string | number): void {
  if (typeof id === "string") {
    console.log("ID:", id.toUpperCase());
  } else {
    console.log("ID:", id * 10);
  }
}

// Задание 3 — Объявление и типизация массивов объектов
type OrderStatus = "pending" | "shipped" | "delivered";

interface Order {
  orderId: string;
  amount: number;
  status: OrderStatus;
}

const orders: Order[] = [
  { orderId: "A1", amount: 100, status: "pending" },
  { orderId: "A2", amount: 200, status: "shipped" },
  { orderId: "A3", amount: 150, status: "delivered" },
  { orderId: "A4", amount: 120, status: "pending" }
];

function filterOrdersByStatus(orders: Order[], status: OrderStatus): Order[] {
    return orders.filter(order => order.status === status);
}

const pendingOrders = filterOrdersByStatus(orders, "pending");
console.log("Pending Orders:", pendingOrders);

// Задание 4 — Работа с кортежами и объектами
type ProductInfo = [string, number, number];

function updateStock(
  inventory: Record<string, number>,
  productInfo: ProductInfo
): Record<string, number> {
  const [name, , quantity] = productInfo;
  inventory[name] = (inventory[name] || 0) + quantity;
  return inventory;
}

let inventory: Record<string, number> = {
  "Phone": 10,
  "Laptop": 5
};

const product: ProductInfo = ["Phone", 699, 3];
inventory = updateStock(inventory, product);
console.log("Updated Inventory:", inventory);