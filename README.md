# [Preact] + [React Router] v4, _without [preact-compat]_

React Router expects our project to depend on React but because we're using Preact Webpack will blow up when React Router tries to import the non-existent React.

To solve this we need to alias a few of the React specific things that React Router depends on. We do this in `src/lib/react.js`.

The only other thing we need to do is make sure React Router finds this file when it tries to import React. We can do this by modifying our Webpack config. 

```javascript
module.exports = {
  resolve: {
    modulesDirectories: [
      path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, "node_modules"),
      'node_modules'
    ]
  }
}
```

'modulesDirectories' (just 'modules' in Webpack 2) tells Webpack where to look for imported modules. We need to add the folder where we placed our 'react.js' file so React Router will import that file when it tries to import React.


[Preact]: https://github.com/developit/preact
[preact-compat]: https://github.com/developit/preact-compat
[React Router]: https://github.com/reacttraining/react-router
