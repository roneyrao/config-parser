var expect=require('chai').expect ;

var parser=require('../index');
var cfg=require('require-json5')(require('path').resolve(__dirname, '.cfg.json5'));

describe('returns default config', function(){
	var defs=Object.assign({}, cfg);
	delete defs.targets;
	for (var k in defs) {
		defs[['__',k.toUpperCase(),'__'].join('')] = defs[k];
		delete defs[k];
	}
	var parsed=parser(cfg);

	it('returns correct default config', function(){
		expect(parsed.cfg).to.eql(defs);
	})
	it('returns correct stringified strings', function(){
		expect(parsed.stringifiedCfg.__PUBLIC_PATH__).to.equal('"/package/"');
	})
})
describe('selects mock target', function(){
	var parsed=parser(cfg, 'mock');
	it('returns correct overridden config', function(){
		expect(parsed.cfg.__PUBLIC_PATH__).to.equal('/root/');
	})
	it('returns correct overridden config', function(){
		expect(parsed.target).to.equal('mock');
	})
})
