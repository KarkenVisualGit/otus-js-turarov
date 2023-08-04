function nthFibo(n) {
    // 0 1 1 2 3 5 8 13
    if (n <= 1) {
        return 0;
    }
    if (n <= 3) {
        return 1;
    }
    return nthFibo(n - 1) + nthFibo(n - 2);
}

console.log(nthFibo(3));