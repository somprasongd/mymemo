# JWT #

Web site: [https://jwt.io](https://jwt.io)

## Hashing คือ ##

การ hash คือการเข้ารหัสประเภทหนึ่ง ซื่งถ้าเป็นค่าเดิมต้องได้เลข hash เป็นเลขเดิมเสมอ

1. ติดตั้ง package [crypto-js](https://www.npmjs.com/package/crypto-js) `$ npm i crypto-js --save`
2. การใช้งาน

	```javascript
	
	const {SHA256} = require('crypto-js');
	
	var message = 'Somprasong Damyos';
	var hash = SHA256(message).toString();
	
	```

## Package jsonwebtoken ##

Web site: [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

Installation: `$ npm install jsonwebtoken --save`

Usage: 

สร้าง token ใช้ **`jwt.sign(payload, secretOrPrivateKey, options, [callback])`**

```javascript

// sign with default (HMAC SHA256) 
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//backdate a jwt 30 seconds 
var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
 
// sign with RSA SHA256 
var cert = fs.readFileSync('private.key');  // get private key 
var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});
 
// sign asynchronously 
jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
  console.log(token);
});
```


การดึงค่าออกมาจาก token ใช้ **`jwt.verify(token, secretOrPublicKey, [options, callback])`**

```javascript

// verify a token symmetric - synchronous 
var decoded = jwt.verify(token, 'shhhhh');
console.log(decoded.foo) // bar 
 
// verify a token symmetric 
jwt.verify(token, 'shhhhh', function(err, decoded) {
  console.log(decoded.foo) // bar 
});
 
// invalid token - synchronous 
try {
  var decoded = jwt.verify(token, 'wrong-secret');
} catch(err) {
  // err 
}
 
// invalid token 
jwt.verify(token, 'wrong-secret', function(err, decoded) {
  // err 
  // decoded undefined 
});
 
// verify a token asymmetric 
var cert = fs.readFileSync('public.pem');  // get public key 
jwt.verify(token, cert, function(err, decoded) {
  console.log(decoded.foo) // bar 
});
 
// verify audience 
var cert = fs.readFileSync('public.pem');  // get public key 
jwt.verify(token, cert, { audience: 'urn:foo' }, function(err, decoded) {
  // if audience mismatch, err == invalid audience 
});
 
// verify issuer 
var cert = fs.readFileSync('public.pem');  // get public key 
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer' }, function(err, decoded) {
  // if issuer mismatch, err == invalid issuer 
});
 
// verify jwt id 
var cert = fs.readFileSync('public.pem');  // get public key 
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid' }, function(err, decoded) {
  // if jwt id mismatch, err == invalid jwt id 
});
 
// verify subject 
var cert = fs.readFileSync('public.pem');  // get public key 
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid', subject: 'subject' }, function(err, decoded) {
  // if subject mismatch, err == invalid subject 
});
 
// alg mismatch 
var cert = fs.readFileSync('public.pem'); // get public key 
jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {
  // if token alg != RS256,  err == invalid signature 
});
```