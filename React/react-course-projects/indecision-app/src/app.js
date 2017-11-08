console.log('App.js is running!');

// JSX - JavaScript XML
var template = <p>This is JSX from app.js!</p>;
var appRoot = document.getElementById('app');

// Render
ReactDOM.render(template, appRoot);
