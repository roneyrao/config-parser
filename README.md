## opinionated-config-parser

[![Build Status](https://travis-ci.org/roneyrao/opinionated-config-parser.svg?branch=master)](https://travis-ci.org/roneyrao/opinionated-config-parser)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0d9047bd9fae6577010b/test_coverage)](https://codeclimate.com/github/roneyrao/opinionated-config-parser/test_coverage)
[![codecov](https://codecov.io/gh/roneyrao/opinionated-config-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/roneyrao/opinionated-config-parser)
[![Maintainability](https://api.codeclimate.com/v1/badges/0d9047bd9fae6577010b/maintainability)](https://codeclimate.com/github/roneyrao/opinionated-config-parser/maintainability)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/roneyrao/opinionated-config-parser/master/LICENSE)

Select configuration for specific build target; if `process.env.NODE_ENV == 'production'`, target is set to 'production' no matter what is passed in.

 1. select an environment, mix (may overwrite) its data with the subfields of root;
 2. convert key name to format of `__OUT_DIR__`
 3. return another copy for webpack 'DefinePlugin', which set them for client use;

### example:

 `parseCfg(source, 'mock')`

 **source**
 ```
{
	outDir:'dev'
	publicPath:'/',
	apiPath:'/api/'
	targets:{
		mock:{
			publicPath:'/root/',
			apiPath:'https://hna-app-test.hnair.com'
		},
		production:{
			outDir:'dist',
			publicPath:'/appname/',
			apiPath:'https://hna-app-test.hnair.com',
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

#### parseCfg(cfgInput, targetSelected, postProcessor) ⇒ <code>Object</code>
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
| postProcessor | <code>Function</code> | process after selected config is merged before converting key character cases |


## License

[MIT](LICENSE).

