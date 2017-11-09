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

**ข้างใน {} JSX จะไม่แสดงอะไรออกมา เมื่อมีค่าเป็น false หรือ null หรือ undefined**
**ข้างใน {} สามารถใส่ JSX ลงไปได้**

### JSX Condition

สามารถใช้ condition ได้ 3 วิธี
1. ไปเขียนเป็น function แล้วเรียกใช้ใน JSX ผ่าน `{}`
2. ใช้ `{ true ? 'Show when true' : 'Show when false' }`
3. ใช้ Logical Operators เช่น
```javascript
true && 'Show when true'

false && 'Show when true' // return false และ JSX จะไม่แสดงอะไรออกมา ค่ามีค่าเป็น false หรือ null หรือ undefined
```

```javascript
function getLocation(location) {
  if(location){
    return <p>Location: {user.location}</p>
  }  
}

var templateThree = (
  <div>
    <h1>{user.name ? user.name : 'Anonymous'}</h1>
    {(user.age && user.age >= 20) && <p>Age: {user.age}</p>}
    {getLocation(user.location)}
  </div>
);
```

### Events & Attributes

- Events เช่น onClick, onSubmit รูปแบบการใช้งาน `onClick={() => {}}` หรือ `onClick={functionName}` [ดูเพิ่มเติม](https://reactjs.org/docs/events.html#supported-events)
- Attributes สามารถใช้ได้เหมือน HTML เลย ต่างที่ HTML ใช้เป็น lower case แต่ JSX ใช้เป็น camel case และมีคำพิเศษบางคำเช่น class ต้องใช้เป็น className

```javascript
let count = 0;
const addOne = () => {
  count++;
  console.log('addOne', count);
}

const minusOne = () => {
  count--;
  console.log('minusOne', count);
}

const reset = () => {
  count = 0;
  console.log('reset', count);
}

const templateFour = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={addOne}>+1</button>
    <button onClick={minusOne}>-1</button>
    <button onClick={reset}>reset</button>
  </div>
);
```

จากตัวอย่างข้างบน เมื่อกดปุ่มแล้วค่า count เปลี่ยนถูกต้อง แต่หน้าจอไม่ได้ถูก render ใหม่ ดังนั้นแก้ง่ายๆ โดยสั่งให้ react re-render ใหม่

```javascript
let count = 0;
const addOne = () => {
  count++;
  console.log('addOne', count);
  renderCounterApp();
}

const minusOne = () => {
  count--;
  console.log('minusOne', count);
  renderCounterApp();
}

const reset = () => {
  count = 0;
  console.log('reset', count);
  renderCounterApp();
}

const renderCounterApp = () => {
  const templateFour = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne}>+1</button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>reset</button>
    </div>
  );
  
  var appRoot = document.getElementById('app');
  
  // Render
  ReactDOM.render(templateFour, appRoot);
}

renderCounterApp();
```

ถ้าลองดูจากแทบ Elements ของ Dev tools เมื่อมีการกดปุ่มจะเห็นว่า DOM จะถูกอัพเดทแค่ส่วนของตัวเลขเท่านั้น ไม่ได้ render ใหม่ทั้งหมด ตรงนี้เพราะ react มี virtual dom 
