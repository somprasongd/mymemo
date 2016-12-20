const expect = require('expect');
const utils = require('./utils');

describe('Utils', () => {

  it('should add two number', () => {
    var res = utils.add(33, 11);
    if(res !== 44){
      throw new Error(`Expected 44, but got ${res}.`);
    }
  });

  it('should square number', () => {
    var res = utils.square(3);
    if(res !== 9){
      throw new Error(`Expected 9, but got ${res}.`);
    }
  });

  // use assert library
  // should verify first and last names setName
  // assert it includes firstName and lastName with proper values
  it('should set firstName and lastName', () => {
    var user = {location: "Phuket", age: 31};
    var res = utils.setName(user, "Somprasong Damyos");
    // expect(user).toEqual(res);
    expect(res).toInclude({
      firstName: "Somprasong",
      lastName: "Damyos"
    });
  });

  // async
  it('should async add two number', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
      expect(sum).toBe(7).toBeA('number');
      done();
    });
  });

  it('should async square number', (done) => {
    utils.asyncSquare(5, (res) => {
      expect(res).toBe(25).toBeA('number');
      done();
    });
  });
});
