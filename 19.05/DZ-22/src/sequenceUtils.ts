export function generateFibonacci(limit: number): number[] {
    const fib = [0, 1];
    while (fib[fib.length - 1] + fib[fib.length - 2] <= limit) {
        fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    }
    return fib;
}

export function generatePrimeNumbers(limit: number): number[] {
    const primes: number[] = [];
    for (let i = 2; i <= limit; i++) {
        if (primes.every(p => i % p !== 0)) primes.push(i);
    }
    return primes;
}