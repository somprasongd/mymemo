'use strict';

console.log('App.js is running!');

// JSX - JavaScript XML
var template = React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    'React App'
  ),
  React.createElement(
    'p',
    null,
    'This is JSX from app.js!'
  ),
  React.createElement(
    'ol',
    null,
    React.createElement(
      'li',
      null,
      'Item One'
    ),
    React.createElement(
      'li',
      null,
      'Iten Two'
    )
  )
);

var user = {
  name: 'Somprasong Damyos',
  age: 32,
  location: 'Phuket'
};

var templateTwo = React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    user.name
  ),
  React.createElement(
    'p',
    null,
    'Age: ',
    user.age
  ),
  React.createElement(
    'p',
    null,
    'Location: ',
    user.location
  )
);

function getLocation(location) {
  if (location) {
    return React.createElement(
      'p',
      null,
      'Location: ',
      user.location
    );
  }
}

var templateThree = React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    user.name ? user.name : 'Anonymous'
  ),
  user.age && user.age >= 20 && React.createElement(
    'p',
    null,
    'Age: ',
    user.age
  ),
  getLocation(user.location)
);

var count = 0;
var addOne = function addOne() {
  count++;
  console.log('addOne', count);
  renderCounterApp();
};

var minusOne = function minusOne() {
  count--;
  console.log('minusOne', count);
  renderCounterApp();
};

var reset = function reset() {
  count = 0;
  console.log('reset', count);
  renderCounterApp();
};

var renderCounterApp = function renderCounterApp() {
  var templateFour = React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      'Count: ',
      count
    ),
    React.createElement(
      'button',
      {
        id: 'my-id',
        className: 'button',
        onClick: addOne
      },
      '+1'
    ),
    React.createElement(
      'button',
      { onClick: minusOne },
      '-1'
    ),
    React.createElement(
      'button',
      { onClick: reset },
      'reset'
    )
  );

  var appRoot = document.getElementById('app');

  // Render
  ReactDOM.render(templateFour, appRoot);
};

renderCounterApp();
