export default function mockpack(require, pathToMock, depMap) {
	const cache = {};
	const idToMock = require.resolve(pathToMock);

	// Require the thing to mock to cache its deps
	require(pathToMock);

	// Cache the original require so webpack rebuilds it
	cache[idToMock] = __webpack_require__.c[idToMock];
	delete __webpack_require__.c[idToMock];

	// Mock the cache of the deps by overriding the exports object
	Object.keys(depMap).forEach(modulePath => {
		const depId = require.resolve(modulePath);
		cache[depId] = __webpack_require__.c[depId];
		__webpack_require__.c[depId] = Object.assign({}, cache[depId], { exports: depMap[modulePath] });
	});

	// Construct the mocked module
	const module = __webpack_require__(idToMock);

	// Restore the mocked cache values
	Object.keys(cache).forEach(moduleId => {
		__webpack_require__.c[moduleId] = cache[moduleId];
	});

	// Return the results
	return module;
}
