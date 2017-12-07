import {expect} from 'chai';
import parser from '../index';
const cfg=require('require-json5')(require('path').resolve(__dirname, '.cfg.json5'));

describe('returns default config', function(){
	const defs=Object.assign({}, cfg);
	delete defs.targets;
	for (const k in defs) {
		defs[['__',k.toUpperCase(),'__'].join('')] = defs[k];
		delete defs[k];
	}
	const parsed=parser(cfg);

	it('returns correct default config', function(){
		expect(parsed.cfg).to.eql(defs);
	})
	it('returns correct stringified strings', function(){
		expect(parsed.stringifiedCfg.__PUBLIC_PATH__).to.equal('"/package/"');
	})
})
describe('selects mock target', function(){
	const parsed=parser(cfg, 'test');
	it('returns correct public path', function(){
		expect(parsed.cfg.__PUBLIC_PATH__).to.equal('/root/');
	})
	it('returns correct api path', function(){
		expect(parsed.cfg.__API_PATH__).to.equal('https://192.12.33.44');
	})
})
