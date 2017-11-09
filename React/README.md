# REACT

## เตรียมความพร้อม
1. ติดตั้ง VS Code
2. ติดตั้ง Node.js
3. ติดตั้ง Yarn
4. ติดตั้ง live-server เพื่อจำลอง web server `yarn add global live-server`

## Hello REACT

ลองสร้างโปรแกรมแรกกับ React

- เริ่มจากสร้างไฟล์ public/index.html และมีการเรียกใช้ lib react และ react-dom ตามลำดับ

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React App</title>
</head>
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
  <script src="/scripts/app.js"></script>
</body>
</html>
```

- สร้างไฟล์ /public/scripts/app.js ไว้สำหรับเขียนโปรแกรม React

```javascript
console.log('App.js is running!');

// JSX - JavaScript XML
var template = <p>This is JSX from app.js!</p>;
// root element ที่จะให้ react ไปทำงาน
var appRoot = document.getElementById('app');

// Render with ReactDOM
ReactDOM.render(template, appRoot);
```

- ทดสอบรัน `live-server public`

- จะพบว่าไม่สามารถทำงานได้ จะพบ error ว่า `Uncaught SyntaxError: Unexpected token < app.js:4 ` เนื่องจาก browser ไม่รู้จัก JSX จะต้องใช้ [babel](http://babeljs.io) มาช่วย ซึ่งสุดท้ายแล้ว JSX `var template = <p>This is JSX from app.js!</p>` จะถุกแปลงไปเป็น Javascript ดังนี้

```javascript
var template = React.createElement(
  'p',
  null,
  'This is JSX from app.js!'
);
```

- ถ้าลองเอา Javascript ไปแทนที่ JSX ใน app.js โปรแกรมก็จะสามารถทำงานได้ปกติ

## ติดตั้ง Babel

- ออกจาก live-server ก่อน
- ติดตั้ง babel-cli `yarn global add babel-cli`
- สร้าง package.json `yarn init`
- ติดตั้ง plugin `yarn add babel-preset-react babel-preset-env`
- ย้ายไฟล์ ./public/scripts/app.js ไปไว้ที่ ./src/app.js
- สั่งให้ babel complie ./src/app.js ไปไว้ที่ ./public/scripts/app.js โดยใช้คำสั่ง `babel src/app.js --out-file=public/scripts/app.js --presets=env,react`

- แต่ถ้าต้องการให้ babel complie ให้อัตโนมัติเมื่อมีการเปลี่ยนแปลงไฟล์ ./src/app.js ใช้คำสั่ง `babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

## JSX

JSX จะต้องมีแค่ single root element เท่านั้น 

```javascript
console.log('App.js is running!');

// JSX - JavaScript XML
var template = (
  <div>
    <h1>React App</h1>
    <p>This is JSX from app.js!</p>
    <ol>
      <li>Item One</li>
      <li>Iten Two</li>
    </ol>
  </div>
);
// root element ที่จะให้ react ไปทำงาน
var appRoot = document.getElementById('app');

// Render with ReactDOM
ReactDOM.render(template, appRoot);
```

### JSX Expression

สามารถใช้ Javascript exporession ไปใน JSX ได้โดยใช้ `{}` ตัวอย่าง
```javascript
var user = {
  name: 'Somprasong Damyos',
  age: 32,
  location: 'Phuket'
};

var templateTwo = (
  <div>
    <h1>{user.name}</h1>
    <p>Age: {user.age}</p>
    <p>Location: {user.location}</p>
  </div>
);
```

ข้อควรระวัง JSX  ไม่สามารถแสดง object ได้ `<h1>{user}</h1>`
