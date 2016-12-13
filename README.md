# mockpack
Mock out ES6/CommonJS/AMD modules imported with [webpack 1.x](https://webpack.github.io/) and [babel](https://babeljs.io/).

Basically, replaces the exports objects of a when it is imported into the module you want to test.

## Example
```js
// module.js
import { value } from './dep'

export function go() {
	return value * 100;
}

// test.js
import mockpack from 'mockpack';
const mocked = mockpack(
	require.context('.'),	// Provide a context for path resolving
	'./module',		// The module we want to test
	{			// The modules to swap out what gets exported with a fixed object
		'./dep': {
			value: 50
		}
	}
);

assert(mocked.go() === 50 * 100);
```

## Important!
I cannot stress that this does NOT replace the entire module structure! It simply swaps out the cache
for the given deps to export the object you provide and ONLY the object you provide! It does not provide
partial mocking.

## Running the test
```
npm test
// navigate to //localhost:8080/test.bundle
```

## Why
I had an old webpack loader called [proxy-loader](https://github.com/c-dante/proxy-loader)
which mocked modules by wrapping them in a factory method letting you swap out specific require statements with a different exports.

This worked well for CommonJS and AMD modules, but with ES6 imports, it got... complicated.

So I made another solution, specifically for webpack 1.x.

## How
Webpack's require exposes a cache to resolve modules. I'm screwing with that cache to inject your mocked exports.
