async function main() {
    const x = await 42; // จริงๆ แล้วมันจะทำแบบนี้ให้ Promise.resolve(42); ทำให้ใช้ await ได้
    console.log(x); // 42
}

main();