export namespace Finance {
    export class LoanCalculator {
        constructor(
            public principal: number,
            public annualRate: number,
            public years: number
        ) {}

        monthlyPayment(): number {
            const rate = this.annualRate / 12 / 100;
            const n = this.years * 12;
            return this.principal * rate / (1 - Math.pow(1 + rate, -n));
        }
    }

    export class TaxCalculator {
        constructor(public income: number, public taxRate: number) {}

        calculateTax(): number {
            return this.income * this.taxRate / 100;
        }
    }
}