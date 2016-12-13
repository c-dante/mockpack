import mockpack from '../mockpack';
import { assert } from 'chai';

import * as original from './module';

// Assert we are mocked
describe('mockpack example', () => {
	let mocked;

	before(() => {
		mocked = mockpack(
			require.context('.'),
			'./module',
			{
				'./dep': {
					fn: () => 'override'
				}
			}
		);
	});

	it('mocked have the mocked results', () => {
		assert.equal(mocked.go(), 'module override common-js-dep');
	});

	it('original should have the unmocked results', () => {
		assert.equal(original.go(), 'module dep common-js-dep');
	});

	it('can even work inline', () => {
		const inlineMock = mockpack(
			require.context('.'),
			'./module',
			{
				'./other/commonJsDep': {
					value: 'mocked-other-dep'
				},
				'./dep': {
					fn: () => 'mocked-dep'
				}
			}
		);

		assert.equal(inlineMock.go(), 'module mocked-dep mocked-other-dep');
	});

});
