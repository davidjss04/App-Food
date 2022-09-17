//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
// const controllerDB = require('./src/controllers/controllerDB.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.

//colocar force: true para que se borre la base de datos y se cree de nuevo
// conn.sync({ force: true }).then(() => {
// 	server.listen(3001, async () => {
// 		console.log('%s listening at 3001');
// 		await controllerDB.getAll(); // eslint-disable-line no-console
// 	});
// });

conn.sync().then(() => {
	server.listen(3001, () => {
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});
