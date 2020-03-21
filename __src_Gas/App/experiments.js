/* eslint-disable max-params */
import { looper } from '../../../GAS | Library/v01/utils/looper';
import { randomFromArray } from '../../../GAS | Library/v02/arr/randomFromArray';

import { SHEETS } from './config';
import { runJbJ, runTbT, fire, single } from './helpers';
import {
	goLocal,
	goExternal,
	goCache,
	goHub,
	getRandomData,
} from './tasks';

/* ***************** Strukrura testów ******************* */

/**
 * Odpalenie 'times' razy każdego zadania i przejście do następnego
 * @param {number} times
 * @param {function} callback Którą funkcję mam zastosowac
 * @param {string} desc Opis np. Wklejenie danych (external)
 */

const jbj = (times, callback, desc) => () => {
	looper(times, runJbJ(callback('l100'), 'Arr 1: 100', desc));
	looper(times, runJbJ(callback('l200'), 'Arr 2: 200', desc));
	looper(times, runJbJ(callback('l500'), 'Arr 3: 500', desc));
	looper(times, runJbJ(callback('l1000'), 'Arr 4: 1000', desc));
	looper(times, runJbJ(callback('l2000'), 'Arr 5: 2000', desc));
	looper(times, runJbJ(callback('l4000'), 'Arr 6: 4000', desc));
	looper(times, runJbJ(callback('l8000'), 'Arr 7: 8000', desc));
	looper(times, runJbJ(callback('l16000'), 'Arr 8: 16000', desc));
};

/**
 * Odpalenie 'times' razy sekwencji składającej się ze wszystkich zadań
 * @param {number} times
 * @param {function} callback
 * @param {string} desc Opis np. Wklejenie danych (external)
 */

const tbt = (times, callback, desc) => () => {
	looper(times, () => {
		runTbT(callback('l100'), 'Arr 1: 100', desc)();
		runTbT(callback('l200'), 'Arr 2: 200', desc)();
		runTbT(callback('l500'), 'Arr 3: 500', desc)();
		runTbT(callback('l1000'), 'Arr 4: 1000', desc)();
		runTbT(callback('l2000'), 'Arr 5: 2000', desc)();
		runTbT(callback('l4000'), 'Arr 6: 4000', desc)();
		runTbT(callback('l8000'), 'Arr 7: 8000', desc)();
		runTbT(callback('l16000'), 'Arr 8: 16000', desc)();
	});
};

const DESC = 'Wklejenie danych ';
const DESC_RAND = 'Wygenerowanie losowej tablicy';

/**
 * Obiekt ze wszystkimi callbackami do eksperymetów
 */
const exps = {
	/* WYGENEROWANIE LOSOWEJ TABLICY 50 */
	randomJbJ: fire(50, getRandomData, jbj, DESC_RAND, SHEETS.RAND),
	randomTbT: fire(50, getRandomData, tbt, DESC_RAND, SHEETS.RAND),

	/* LOCAL 10 */
	localJbJ: fire(20, goLocal, jbj, `${DESC}(local)`, SHEETS.LOCAL),
	localTbT: fire(20, goLocal, tbt, `${DESC}(local)`, SHEETS.LOCAL),

	/* EXTERNAL 10 */
	extJbJ: fire(20, goExternal, jbj, `${DESC}(external)`, SHEETS.EXTER),
	extTbT: fire(20, goExternal, tbt, `${DESC}(external)`, SHEETS.EXTER),

	/* CACHE 30 */
	cacheJbJ: fire(50, goCache, jbj, `${DESC}(cache)`, SHEETS.CACHE),
	cacheTbT: fire(50, goCache, tbt, `${DESC}(cache)`, SHEETS.CACHE),
};

/* ******************** TESTY POJEDYŃCZE *********** */
const randomCode = [
	'l100',
	'l200',
	'l500',
	'l1000',
	'l2000',
	'l4000',
	'l8000',
	'l16000',
];
const randomFn = [goLocal, goExternal, goCache, goHub, getRandomData];

const runRandomSingle = () => {
	const [code] = randomFromArray(randomCode, 1);
	const [fn] = randomFromArray(randomFn, 1);
	console.log(`Arkusz: ${code} | Fn: ${fn.name}`);

	single(code, fn);
};

export { exps, runRandomSingle };
