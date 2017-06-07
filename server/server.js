const app = require('./app');
const db = require('./db').db;

db.sync({force:true}).then(() => {
	app.listen(1337, () => {
		console.log('listening on port 1337');
	});
})
    .catch(console.error.bind(this));