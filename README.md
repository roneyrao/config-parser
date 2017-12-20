## config-parser

[![Build Status](https://travis-ci.org/roneyrao/config-parser.svg?branch=master)](https://travis-ci.org/roneyrao/config-parser)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0d9047bd9fae6577010b/test_coverage)](https://codeclimate.com/github/roneyrao/config-parser/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/0d9047bd9fae6577010b/maintainability)](https://codeclimate.com/github/roneyrao/config-parser/maintainability)

select configuration for specific build target; if `process.env.NODE_ENV == 'production'`, target is set to 'production' no matter what is passed in.

 1. select an environment, mix (may overwrite) its data with the subfields of root;
 2. convert key name to format of `__OUT_DIR__`
 3. return another copy for webpack 'DefinePlugin' set for client use;
 
### example:

 `parseCfg(source, 'mock')`

 **source**
 ```
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
 ```

 **output**
 ```
{
	__OUT_DIR__:'dev',
	__PUBLIC_PATH__:'/root/',
	__API_PATH__:'https://hna-app-test.hnair.com',
}
 ```


### interface

<a name="parseCfg"></a>

#### parseCfg(cfgInput, targetSelected) ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - refer to @see  
**See**: returned object
 * cfg {Object} - merged config;
 * stringifiedCfg {Object} - with strings processed with JSON.stringify;
 * target {string} - calculated target;  

| Param | Type | Description |
| --- | --- | --- |
| cfgInput | <code>json</code> | content |
| targetSelected | <code>string</code> | selected target, subkey of 'targets'; |


## License

[MIT](LICENSE).

