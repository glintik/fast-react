# Fast React

## Why?

* Fast-React is like React but faster up to 10 times by added overhead

* Tolerate for an errors in render and other component methods

* It has very small size – 6kb vs 26kb gzip


## Compability

Full compability with all existen react libs and components include react-redux, react-router, animations.

## Benchmarks

soon


## Install
You don't need change existen code base. Just add settings to your webpack.config.js

`npm install fast-react --save`

`npm install babel-fast-react --save-dev`


webpack.config.js
```js
module.exports = {
	modules: {
		loaders: [
			pattern: '\.jsx?$',
			loader: 'babel',
			query: [
            	plugins: [
	                'babel-fast-react'
                ]
				
			]
		]
	}
	...
	resolve: {
		'react': 'fast-react',
		'react-dom': 'fast-react'
	}
	...
}
```


babel-fast-react transforms jsx code 
```html 
<div className="foo">Hello world</div>
```
to examplary array 
```js
['div', 'className', 'foo', 'Hello world']
```


## Why so fast?
soon


## Known incompatibilities
* Cannot reuse existen html code created by server side react
* Mixins doesn't support (soon)
* IE9+


## See also
* [preact](https://github.com/developit/preact)
* [inferno](https://github.com/trueadm/inferno)







