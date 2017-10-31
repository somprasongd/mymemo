# Typescript #

Website: https://www.typescriptlang.org/

## ตัวอย่าง 1 ##

### ติตตั้งผ่าน npm ###

```
$ npm install -g typescript
$ npm install -g webpack
$ npm install -g ts-loader // link webpack to complie typescipt
$ npm install -g jquery // to use jquery in your product
$ npm install -g http-server // to have a local server run
```

### การตั้งค่า Typescript ###

1. สร้างไฟล์ main.ts
```typescript
class SweetSweetClass {
     constructor() { 
         console.log("Even sweeter")
     }
 }
let basil = new SweetSweetClass()
```

2. สร้างไฟล์ config ชื่อ tsconfig.json
```json
 {
   "compilerOptions": {
     "module": "commonjs",
     "outDir": "dist/",
     "noImplicitAny": true,
     "removeComments": true,
     "preserveConstEnums": true
   },
   "include": [
     "*"
   ],
   "exclude": [
       "node_modules",
       "**/*.spec.ts"
   ]
 }
```

3. complie จะได้ไฟล์ main.js อยู่ใน /dist
```
$ tsc 

หรือ

$ tsc --watch // เพื่อบอกให้ complie ไฟล์ให้ทันทีเมื่อมีการแก้ไข
```

4. สร้าง HTML page
```HTML
 <!DOCTYPE html>
 <html>
 <head>
     <title></title>
 </head>
 <body>
 <script src='/dist/main.js'></script>
 </body>
 </html>
```

5. Run Server
```
$ http-server -c-1 // -c-1 เพื่อบอกให้ browser ไม่ต้อง cache ไฟล์เอาไว้

หรือ

$ http-server
```

ุ6. จะเห็นคำว่า Even sweeter ที่ JavaScript Console 