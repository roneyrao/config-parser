/*
 * 1. select an environment, mix (may overwrite) its data with the subfields of root;
 * 2. convert key name to format of '__OUT_DIR__'
 * 3. return another copy for webpack 'DefinePlugin' set for client use;
 *
 * example:
 *
 **source**
{
  out_dir:'dev'
  public_path:'/',
  api_path:'/api/'
  targets:{
    mock:{
      public_path:'/root/',
      api_path:'https://hna-app-test.hnair.com'
    },
    production:{
      out_dir:'dist',
      public_path:'/appname/',
      api_path:'https://hna-app-test.hnair.com',
    }
  }
}

 **output**
{
  __OUT_DIR__:'dev',
  __PUBLIC_PATH__:'/root/',
  __API_PATH__:'https://hna-app-test.hnair.com',
}

*/


/**
 * parseCfg
 *
 * @param cfgInput {json} content
 * @param targetSelected {string} subkey of 'targets';
 * @returns {{cfg, stringifiedCfg, target}}
 *  cfg: selected;
 *  stringifiedCfg: with strings processed with JSON.stringify;
 *  target: calculated target;
 */
const debug = require('debug')('config-parser');

export default function parseCfg(cfgInput, targetSelected) {
  debug('input cfg:', cfgInput);
  // leave input untouched.
  const cfg = Object.assign({}, cfgInput);
  let target;

  if (targetSelected) {
    target = targetSelected.trim();
  }
  // if 'NODE_ENV' is 'production', set to 'production';
  target = process.env.NODE_ENV === 'production' ? 'production' : target;
  debug('target key:', target);

  // prune targets
  const { targets } = cfg;
  delete cfg.targets;

  // copy selected properties to root;
  if (target) {
    const { [target]: selectedTargets } = targets;
    if (selectedTargets) {
      Object.entries(selectedTargets).forEach(([k, v]) => { cfg[k] = v; });
      debug('overriden cfg:', cfg);
    } else {
      throw new Error(`unfound config target: ${targetSelected}`);
    }
  }

  // convert key name to format of '__OUT_DIR__'
  Object.entries(cfg).forEach(([k, v]) => {
    cfg[['__', k.toUpperCase(), '__'].join('')] = v;
    delete cfg[k];
  });
  debug('renamed cfg:', cfg);

  // surround strings with quotes, for webpack 'define' plugin;
  const stringifiedCfg = {};
  Object.entries(cfg).forEach(([k, v]) => { stringifiedCfg[k] = typeof (v) === 'string' ? JSON.stringify(v) : v; });
  return { cfg, stringifiedCfg, target };
}
