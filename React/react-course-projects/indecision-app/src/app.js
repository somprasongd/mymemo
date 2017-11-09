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
      <button 
        id="my-id" 
        className="button"
        onClick={addOne}
        >+1</button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>reset</button>
    </div>
  );
  
  var appRoot = document.getElementById('app');
  
  // Render
  ReactDOM.render(templateFour, appRoot);
}

renderCounterApp();
