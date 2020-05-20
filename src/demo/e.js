    
function Module(id = '', parent) {
	this.id = id;
	this.path = path.dirname(id);
	this.exports = {};
	this.parent = parent;
	updateChildren(parent, this, false);
	this.filename = null;
	this.loaded = false;
	this.children = [];
}

    
Module.runMain = function () {
	Module._load(process.argv[1], null, true);
};

Module._load = function (request, parent, isMain) {
	let relResolveCacheIdentifier;
	// 判断是否文件是被require加载还是通过node命令加载
	if (parent) {
		// relativeResolveCache 同一个文件被引用多次时走缓存，免得多次计算绝对路径
		relResolveCacheIdentifier = `${parent.path}\x00${request}`;
		const filename = relativeResolveCache[relResolveCacheIdentifier];
		if (filename !== undefined) {
			const cachedModule = Module._cache[filename];
			if (cachedModule !== undefined) {
				updateChildren(parent, cachedModule, true);
				return cachedModule.exports;
			}
			delete relativeResolveCache[relResolveCacheIdentifier];
		}
	}
	// 计算绝对路径
	const filename = Module._resolveFilename(request, parent, isMain);
	// 判断是否有缓存
	const cachedModule = Module._cache[filename];
	if (cachedModule !== undefined) {
		updateChildren(parent, cachedModule, true);
		return cachedModule.exports;
	}
	// 判断是否为内置模块
	const mod = loadNativeModule(filename, request, experimentalModules);
	if (mod && mod.canBeRequiredByUsers) return mod.exports;
	// 生成module实例
	const module = new Module(filename, parent);
	if (isMain) {
		process.mainModule = module;
		module.id = '.';
	}
	// 存入缓存，key值为绝对路径
	Module._cache[filename] = module;
	if (parent !== undefined) {
		relativeResolveCache[relResolveCacheIdentifier] = filename;
	}
	// 调用 Module.prototype.require 加载模块
	module.load(filename);
	// 返回module的exports属性
	return module.exports;
};

Module.prototype.load = function(filename) {
        
	this.filename = filename;
	// 包含所有node_modules的路径
	this.paths = Module._nodeModulePaths(path.dirname(filename));
	// extension 为文件不同的扩展名，主要是区分.js、.node、.json、和.mjs，其他扩展名都会被当中.js文件加载
	const extension = findLongestRegisteredExtension(filename);
	Module._extensions[extension](this, filename);
	this.loaded = true;
};

Module._extensions['.js'] = function(module, filename) {
	const content = fs.readFileSync(filename, 'utf8');
	module._compile(content, filename);
};


Module.wrapper = [
	'(function (exports, require, module, __filename, __dirname) { ',
	'\n});'
];
Module.wrap = function (script) {
	return Module.wrapper[0] + script + Module.wrapper[1];
};

// 模块代码封装函数，注入require、exports、module、__dirname、__fielname
function wrapSafe(filename, content) {
	// wrapper 封装之后的函数字符串
	const wrapper = Module.wrap(content);
	// vm.runInThisContext是在当前上下文执行wrapper，这里返回了一个函数
	return vm.runInThisContext(wrapper, {
		filename,
		lineOffset: 0,
		displayErrors: true,
		importModuleDynamically: experimentalModules ? async (specifier) => {
			const loader = await asyncESM.loaderPromise;
			return loader.import(specifier, normalizeReferrerURL(filename));
		} : undefined,
	});
}

// 文件编译执行过程，content是文件内容，filename为文件名称
Module.prototype._compile = function (content, filename) {
	// compiledWrapper 封装之后的函数
	const compiledWrapper = wrapSafe(filename, content);
	const dirname = path.dirname(filename);
	// 注入的require参数并不是Module.prototype.require
	const require = makeRequireFunction(this, redirects);
	var result;
	const exports = this.exports; // module.exports
	const thisValue = exports;
	const module = this;
	return compiledWrapper.call(thisValue, exports, require, module, filename, dirname);
};

// 调用 Module.prototype.require 方法，并对返回值添加属性封装
function makeRequireFunction(mod, redirects) {
	const Module = mod.constructor;
	let require = function require(path) {
		return mod.require(path);
	 };

	function resolve(request, options) {
	 validateString(request, 'request');
	 return Module._resolveFilename(request, mod, false, options);
	}

	require.resolve = resolve;

	function paths(request) {
	 validateString(request, 'request');
	 return Module._resolveLookupPaths(request, mod);
	}
	resolve.paths = paths;
	require.main = process.mainModule;
	require.extensions = Module._extensions;

	require.cache = Module._cache;

	return require;
 }

     
 Module.prototype.require = function (id) {
	// 获取合法字符串
	validateString(id, 'id');
	if (id === '') {
		throw new ERR_INVALID_ARG_VALUE('id', id,
			'must be a non-empty string');
	}
	requireDepth++;
	try {
		return Module._load(id, this, /* isMain */ false);
	} finally {
		requireDepth--;
	}
};

Module._extensions['.mjs'] = function(module, filename) {
	throw new ERR_REQUIRE_ESM(filename);
};


if (experimentalModules) {
	const ESMLoader = asyncESM.ESMLoader;
	const url = `${pathToFileURL(filename)}`;
	const module = ESMLoader.moduleMap.get(url);
	// Create module entry at load time to snapshot exports correctly
	const exports = this.exports;
	if (module !== undefined) { // Called from cjs translator
		if (module.reflect) {
			module.reflect.onReady((reflect) => {
				reflect.exports.default.set(exports);
			});
		}
	} else { // preemptively cache
		ESMLoader.moduleMap.set(
			url,
			new ModuleJob(ESMLoader, url, async () => {
				return createDynamicModule(
					[], ['default'], url, (reflect) => {
						reflect.exports.default.set(exports);
					});
			})
		);
	}
}



