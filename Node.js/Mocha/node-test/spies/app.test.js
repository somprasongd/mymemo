const expect  = require('expect');

describe('App', () => {
  it('should call the spr correctly', () => {
    var spy = expect.createSpy();
    spy('Ball', 31);
    expect(spy).toHaveBeenCalledWith('Ball', 31);
  });
});
