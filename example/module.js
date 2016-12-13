import { value } from './other/commonJsDep';
import { fn } from './dep';

export function go() {
	return `module ${fn()} ${value}`;
}
