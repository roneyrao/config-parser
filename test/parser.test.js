import {
  expect,
} from 'chai';

import parser from '../src/parser';

const cfg = require('require-json5')(require('path').resolve(__dirname, '.cfg.json5'));

describe('returns default config', () => {
  const defs = Object.assign({}, cfg);
  delete defs.targets;
  Object.entries(defs).forEach(([k, v]) => {
    const nk = k.replace(/([A-Z])/g, '_$1');
    defs[['__', nk.toUpperCase(), '__'].join('')] = v;
    delete defs[k];
  });
  const parsed = parser(cfg);

  it('returns correct default config', () => {
    expect(parsed.cfg).to.eql(defs);
  });
  it('returns correct stringified strings', () => {
    expect(parsed.stringifiedCfg.__PUBLIC_PATH__).to.equal('"/package/"');
  });
  it('returns correct target', () => {
    expect(parsed.target).to.be.undefined;
  });
});
describe('selects mock target', () => {
  const parsed = parser(cfg, 'test');
  it('returns correct public path', () => {
    expect(parsed.cfg.__PUBLIC_PATH__).to.equal('/root/');
  });
  it('returns correct api path', () => {
    expect(parsed.cfg.__API_PATH__).to.equal('https://192.12.33.44');
  });
  it('returns correct target', () => {
    expect(parsed.target).to.equal('test');
  });
});
describe('selects non-exist target', () => {
  it('throws error', () => {
    expect(() => parser(cfg, 'abcd')).to.throw('unfound');
  });
});
describe('default', () => {
  it('returns target of "production"', () => {
    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    expect(parser(cfg).target).to.equal('production');
    process.env.NODE_ENV = env;
  });
});

