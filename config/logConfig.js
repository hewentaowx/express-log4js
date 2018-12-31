const log4js = require('log4js');

const levels = {
	trace: log4js.levels.TRACE,
	debug: log4js.levels.DEBUG,
	info: log4js.levels.INFO,
	warn: log4js.levels.WARN,
	error: log4js.levels.ERROR,
	fatal: log4js.levels.FATAL,
};

log4js.configure({
	appenders: {
		console: { type: 'console' },
		infoLog: {
			type: 'dateFile',
			filename: 'logs/info/',
			pattern: 'yyyy-MM-dd.log',
			compress: true,
			maxLogSize: 10000000,
			alwaysIncludePattern: true,
		},
		errorLog: {
			type: 'dateFile',
			filename: 'logs/error/',
			pattern: 'yyyy-MM-dd.log',
			compress: true,
			maxLogSize: 10000000,
			alwaysIncludePattern: true,
		},
	},
	categories: {
		default: { appenders: [ 'console' ], level: 'debug' },
		info: { appenders: [ 'infoLog' ], level: 'info' },
		error: { appenders: [ 'errorLog' ], level: 'error' },
	},
});

// 记录每次log4js输出权限大于等于info的日志
exports.info = (name = 'info') => {
	return log4js.getLogger(name);
};

// 记录每次log4js输出权限大于等于error的日志
exports.error = (name = 'error') => {
	return log4js.getLogger(name);
};

// 内置到系统控制台打印 express启动时候来调用
exports.use = function(app, level) {
	// 加载中间件
	app.use(log4js.connectLogger(log4js.getLogger('default'), {
		level: levels[level] || levels.debug,
		format: ':method :url :status',
	}));
};
