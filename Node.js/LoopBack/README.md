# Build a Node.js REST API with LoopBack #

## 1. สร้างโปรเจคด้วย CLI ##

- ติดตั้ง loopback-cli
```
$ npm install -g loopback-cli
```

- สร้างโปรเจคชื่อ rest-loopback
```
$ mkdir rest-loopback

$ cd rest-loopback

$ lb app
```

- โปรแกรมจะถามชื่อ application, version และประเภทของ application ที่จะสร้าง ให้เลือกตามนี้
```
? What's the name of your application? rest-loopback
? Which version of LoopBack would you like to use? 3.x (current)
? What kind of application do you have in mind? api-server (A LoopBack API server with local User auth)
```

- เมื่อเสร็จแล้วทดลองรัน
```
$ node .

Web server listening at: http://localhost:3000
Browse your REST API at http://localhost:3000/explorer
```

# 2. สร้าง model #
- สร้าง model ชื่อ Product เป็น in memory db และเป็น PersistedModel (CRUD)
```
$ lb model

? Enter the model name: Product
? Select the datasource to attach Product to: db (memory)
? Select model's base class PersistedModel
? Expose Product via the REST API? Yes
? Custom plural form (used to build REST URL):
? Common model or server only? common
Let's add some Product properties now.
```

- สร้าง property 2 ตัว คือ name (String, Required) กับ price (Number, Required)
```
Enter an empty property name when done.
? Property name: name
   invoke   loopback:property
? Property type: string
? Required? Yes
? Default value[leave blank for none]:

Let's add another Product property.
Enter an empty property name when done.
? Property name: price
   invoke   loopback:property
? Property type: number
? Required? Yes
? Default value[leave blank for none]:

Let's add another Product property.
Enter an empty property name when done.
? Property name:
```

- ทดลองรันใหม่อีกรอบ จะพบว่ามี Product เพิ่มขึ้นมาให้ใช้งานแล้ว
```
node .
```

- ถ้า stop/start server ใหม่ จะพบว่าข้อมูลที่สร้างขึ้นไว้เมื่อกี้จะไม่มีแล้ว เพราะเราเลือกใช้งาน db แบบ in memory แต่เราสามารถให้มันเขียนเก็บลงไฟล์ได้ เช่น db.json
  - แก้ไขที่ไฟล์ server/datasource.json
  - เพิ่มค่าดังนี้ `,"file": "db.json"`
    ```json
    {
        "db": {
            "name": "db",
            "connector": "memory",
            "file": "db.json"
        }
    }
    ```

## 3. สร้าง development mode โดยใช้ nodemon ##
- ติดตั้ง nodemon ใน dev dependency
```
$ npm install --save-dev nodemon
```

- เพิ่ม script สำหรับรัน nodemon ที่ไฟล์ package.json
```
"dev": "nodemon server/server.js --watch common --watch server"
```

- รัน dev mode โดยใช้คำสั่ง `npm run dev` ซึ่ง nodemon จะ restart server ให้เมื่อมีการแก้ไขไฟล์ในไดเรกทอรี่ common และ server 

## 4. Create a relation between two LoopBack models ##
Loopback สามารถสร้าง relation ระหว่าง models ได้ ซึ่งจะประเภทดังนี้ has many, belogs to, has and belongs to many, has one

ตัวอย่างจะสร้าง model ตัวใหม่ ชื่อ Category โดยและจะเพิ่ม property ชื่อ categoryId ที่ Product โดยจะให้มีความสัมพันธ์ดังนี้ Category hasMany Products  และ Product belongsTo a Category

- สร้าง Category model มี property ชือ name (String, Required)
```
$ lb model Category
? Enter the model name: Category
? Select the datasource to attach Category to: db (memory)
? Select model's base class PersistedModel
? Expose Category via the REST API? Yes
? Custom plural form (used to build REST URL):
? Common model or server only? common
Let's add some Category properties now.

Enter an empty property name when done.
? Property name: name
   invoke   loopback:property
? Property type: string
? Required? Yes
? Default value[leave blank for none]:
```

- เพิ่ม property ชื่อ categoryId ใน Product model
```
$ lb property
? Select the model: Product
? Enter the property name: categoryId
? Property type: number
? Required? No
? Default value[leave blank for none]:
```

- สร้าง relation ตัวแรก Category hasMany Products
```
$ lb relation
? Select the model to create the relationship from: Category
? Relation type: has many
? Choose a model to create a relationship with: Product
? Enter the property name for the relation: products
? Optionally enter a custom foreign key: categoryId
? Require a through model? No
```

- สร้าง relation ตัวที่สอง Product belongsTo a Category
```
$ lb relation
? Select the model to create the relationship from: Product
? Relation type: belongs to
? Choose a model to create a relationship with: Category
? Enter the property name for the relation: category
? Optionally enter a custom foreign key: categoryId
```

## Define a remote method on a LoopBack model ##
In this lesson we look at extending the functionality of LoopBack models by defining a remote method.

A remote method is a method on a model exposed over a custom REST endpoint.

Using the lb remote-method command we will create the remote method meta-data in product.json. We will verify that this got created and that we see the new REST endpoint got added. Then we will create the actual method in product.js and enhance it so that the API will return an error if we want to buy a negative amount of products.

- สร้าง remote method ชื่อ buy โดยมี endpoint เป็น POST /buy โดยให้ส่งค่าจำนวนที่จะซื้อมาด้วย
```
$ lb remote-method
? Select the model: Product
? Enter the remote method name: buy
? Is Static? No
? Description for method: Buy this product

Let's configure where to expose your new method in the public REST API.
You can provide multiple HTTP endpoints, enter an empty path when you are done.
? Enter the path of this endpoint: /buy
? HTTP verb: post

Let's add another endpoint, enter an empty name when done.
? Enter the path of this endpoint:

Describe the input ("accepts") arguments of your remote method.
You can define multiple input arguments.
Enter an empty name when you've defined all input arguments.
? What is the name of this argument? quantity
? Select argument's type: number
? Is this argument required? Yes
? Please describe the argument: Number of products to buy
? Where to get the value from? (auto)

Let's add another accept argument, enter an empty name when done.
? What is the name of this argument?

Describe the output ("returns") arguments to the remote method's callback function.
You can define multiple output arguments.
Enter an empty name when you've defined all output arguments.
? What is the name of this argument? result
? Select argument's type: object
? Is this argument a full response body (root)? Yes
? Please describe the argument: The result of the purchase

Let's add another return argument. Enter empty name when done.
? What is the name of this argument?

We added strong-remoting metadata for your new method to common/models/product.json.
You must implement the method in common\models\product.js. For example:
Here is sample code to get you started:

/**
 * Buy this product
 * @param {number} quantity Number of products to buy
 * @param {Function(Error, object)} callback
 */

Product.prototype.buy = function(quantity, callback) {
  var result;
  // TODO
  callback(null, result);
};
```

- เอาโค้ดที่ได้มา ไปใส่ใน product.js และแก้ไขให้ทำงานตามที่ต้องการ

```javascript
'use strict';

module.exports = function (Product) {

 /**
  * Return true if input is larger than zero
  * @param {number} quantity Number to validate
  */
  const validQuantity = quantity => Boolean(quantity > 0);

  /**
   * Buy this product
   * @param {number} quantity Number of products to buy
   * @param {Function(Error, object)} callback
   */

  Product.prototype.buy = function (quantity, callback) {
    if (!validQuantity(quantity)){
        return callback(`Invalid quantity ${quantity}`);
    }
    var result = {
      status: `You bought ${quantity} product(s)`
    };
    // TODO
    callback(null, result);
  };
};
```

## Add validation rules to a model in LoopBack API ##

We can add validation rules to our models to make sure the data we store in our API is how we want it.

In this lesson we will add validation rules to the Product model.

We will make sure the product name has a minimal length using the validatesLengthOf rule and that it is unique using the validatesUniquenessOf rule.

For the price property we will add a custom validation to make sure that the value entered is not a negative integer. Additionally we will show how to do an async validation using validateAsync . This can for instance be useful if you want the validation to depend on a value in the database or a remote system.

- validation rules 
```javascript
  // Validate minimal length of the name
  Product.validatesLengthOf('name', {
    min: 3,
    message: {
      min: 'Name should be at least 3 characters',
    },
  });

  // validate the name to be unique
  Product.validatesUniquenessOf('name');

  // กำหนดให้ price เป็นตัวเลข
  const positiveInteger = /^[0-9]*s/;

  const validatePositiveInteger = function(err) {
    if (!positiveInteger.test(this.price)) {
      err();
    }
  };

  Product.validate('price', validatePositiveInteger, {
    message: 'Price should be a postive integer',
  });

  // ตรวจสอบราคาใช้ async ดึงข้อมูลจาก db มาเปรียบเทียบ
  function validateMinimalPrice(err, done) {
    const price = this.price;

    process.nextTick(() => {
      const minimalPriceFromDB = 99;
      if (price < minimalPriceFromDB) {
        err();
      }
      done();
    });
  };

  Product.validateAsync('price', validateMinimalPrice, {
    message: 'Price should be higher than the minimal price in the DB',
  });
```

## Add unit tests to a LoopBack API project ##
In this lesson we will learn how to add tests to the project to make sure our API behaves as we expect.

After installing mocha and chai as devDependencies we will add test and test:watch scripts to our package.json. We will create a different datasource what we will use when running the tests by copying datasources.json to datasources.test.json and prefixing our test command with NODE_ENV=test.

We will verify that our tests run against an empty datasource. We’ll also add various tests to verify that our remote method and validation on the Product model behave as expected.


https://egghead.io/courses/build-a-node-js-rest-api-with-loopback