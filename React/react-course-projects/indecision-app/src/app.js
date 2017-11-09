console.log('App.js is running!');

const app = {
  title: 'React App',
  subtitle: 'Put your life in the hands of a computer',
  options: [] 
}
const onFormSubmit = (e) => {
  e.preventDefault();
  
  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
  }
  render();
}

const onRemoveAll = () => {
  app.options = [];
  render();
}

const appRoot = document.getElementById('app');

// create render function that render the new jsx
const render = () => {
  // JSX - JavaScript XML
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button onClick={onRemoveAll}>Remove All</button>
      <ol>
        <li>Item One</li>
        <li>Iten Two</li>
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"/>
        <button>Add Option</button>
      </form>
    </div>
  );

  // Render
  ReactDOM.render(template, appRoot);
}

render();