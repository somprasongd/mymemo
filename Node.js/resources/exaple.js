var x = 1;

var y = x + 9;

console.log(`y is ${y}`);


var add = (a, b) => {
    var total = a + b;

    return total;
}

var res = add(3, 8);

console.log(res);


console.log('Starting app');

setTimeout(() => {
    console.log('In side of callback');
}, 2000);

setTimeout(() => {
    console.log('Second setTimeout');
}, 0);

console.log('Finishing up');

// 3
step 0:
step 1: main()
step 2: main(), console.log('Starting app'); ถ้าแสดงไม่พอใช้ ... เอา
step 3: main()
step 4: main(), setTimeout(2 sec)
step 5: main(), setTimeout(2 sec)  และใน NODE API แสดงคำว่า setTimeout(2 sec)
step 6: main(), และใน NODE API แสดงคำว่า setTimeout(2 sec)
step 7: main(), setTimeout(0 sec)  และใน NODE API แสดงคำว่า setTimeout(2 sec)
step 8: main(), setTimeout(0 sec)  และใน NODE API แสดงคำว่า setTimeout(2 sec), setTimeout(0 sec)
step 9: main(), และใน NODE API แสดงคำว่า setTimeout(2 sec), setTimeout(0 sec)
step 10: main(), และใน NODE API แสดงคำว่า setTimeout(2 sec) ใน callback queue แสดงคำว่า setTimeout(0 sec)
step 11: main(), console.log('Finishing up'); และใน NODE API แสดงคำว่า setTimeout(2 sec) ใน callback queue แสดงคำว่า setTimeout(0 sec)
step 12: NODE API แสดงคำว่า setTimeout(2 sec) ใน callback queue แสดงคำว่า setTimeout(0 sec)
step 13: callback(), และใน NODE API แสดงคำว่า setTimeout(2 sec)
step 14: callback(), console.log('Second setTimeout'); และใน NODE API แสดงคำว่า setTimeout(2 sec)
step 15: callback() และใน NODE API แสดงคำว่า setTimeout(2 sec)
step 16: ใน NODE API แสดงคำว่า setTimeout(2 sec)
step 17: ใน callback queue แสดงคำว่า setTimeout(2 sec)
step 18: callback()
step 19: callback(), console.log('In side of callback');
step 20: callback()
step 21: 

// 1
step 0:
step 1: main()
step 2: main(), var x = 1;
step 3: main()
step 4: main(), var y = x + 9;
step 5: main()
step 6: main(), console.log();
step 7: main()
step 8:

// 2
step 0:
step 1: main()
step 2: main(), var add = (a, b) => {};
step 3: main(), var res = add(3, 8);
step 4: main()
step 5: main(), add();
step 6: main(), add();, var total = a + b;
step 7: main(), add();, return total;
step 8: main()
step 9: main(), console.log()
step 10: 