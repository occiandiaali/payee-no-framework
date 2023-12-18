function decodeExtractor2(input) {
    const n = input.indexOf("Name");
    const i = input.indexOf("Info");
    const p = input.indexOf("Price");

    const name = input.substring(n + 5, i - 1);
    const info = input.substring(i + 5, p - 1);
    const price = input.substring(p + 6);
    return { name, info, price }
}