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
 * @param cfg {json} content of '.cfg.json5'
 * @param target {string} subkey of 'target';
 * @returns {{cfg, stringifiedCfg}} cfg: selected; stringifiedCfg: with strings processed with JSON.stringify;
 */
const log=process.env.DEBUG?console.log:function(){};

export default function parseCfg(cfg, target){
	log('input cfg:', cfg);

	//leave input untouched.
	cfg=Object.assign({}, cfg);

	if(target){
		target=target.trim();
	}
	// if 'NODE_ENV' is 'production', set to 'production';
	target=process.env.NODE_ENV == 'production'?'production':target;
	log('target key:', target);

	//prune targets
	const targets=cfg.targets;
	delete cfg.targets;

	//copy selected properties to root;
	if(target){
		target=targets[target];
		for (const k in target) {
			cfg[k] = target[k];
		}
		log('overriden cfg:', cfg);
	}

	//convert key name to format of '__OUT_DIR__'
	for (const k in cfg) {
		cfg[['__',k.toUpperCase(),'__'].join('')] = cfg[k];
		delete cfg[k];
	}
	log('renamed cfg:', cfg);

	//surround strings with quotes, for webpack 'define' plugin;
	const stringifiedCfg={};
	for (const k in cfg) {
		stringifiedCfg[k] = typeof(cfg[k]) == 'string' ? JSON.stringify(cfg[k]) : cfg[k];
	}

	return {cfg:cfg, stringifiedCfg:stringifiedCfg, target:target};
}


