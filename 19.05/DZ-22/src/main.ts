import { capitalize, reverseString } from "./stringUtils";
import { Finance } from "./finance";
import { UserManagement } from "./userManagement";
import { generateFibonacci, generatePrimeNumbers } from "./sequenceUtils";

console.log(capitalize("hello"));
console.log(reverseString("TypeScript"));

const loan = new Finance.LoanCalculator(100000, 5, 10);
console.log("Monthly payment:", loan.monthlyPayment());

const tax = new Finance.TaxCalculator(50000, 20);
console.log("Tax:", tax.calculateTax());

const admin = new UserManagement.Admin.AdminUser("John", "john@example.com", true);
console.log("Admin status before:", admin.isSuperAdmin);
admin.toggleAdminStatus();
console.log("Admin status after:", admin.isSuperAdmin);

console.log("Fibonacci up to 50:", generateFibonacci(50));
console.log("Primes up to 50:", generatePrimeNumbers(50));