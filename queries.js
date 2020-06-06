const dbSettings = require('./dbSettings').dbSettings

const Pool = require('pg').Pool
const pool = new Pool({
    user: dbSettings.user,
    host: dbSettings.host,
    database: dbSettings.database,
    password: dbSettings.password,
    port: dbSettings.port
})

const getPotentialItemsForSection = (request, response) => {
	var sectionId = request.params.sectionId;

	pool.query('SELECT * FROM list_items WHERE section=$1;', [sectionId], function (error, results) {
		if (error) {
			console.log(error);
			response.status(400)
		}
		response.status(200).json(results.rows)
	})
}

const getRequiredItemsForSection = (request, response) => {
	var sectionId = request.params.sectionId;

	pool.query('SELECT * FROM list_items WHERE section=$1 AND required=true;', [sectionId], function (error, results) {
		if (error) {
			console.log(error);
			response.status(400)
		}
		response.status(200).json(results.rows)
	})
}

const getListItem = (request, response) => {
	var itemId = request.params.itemId;

	pool.query('SELECT * FROM list_items WHERE id=$1;',
		[itemId],
		function (error, results) {
			if (error) {
				console.log(error);
				response.status(400)
			}
			response.status(200).json(results.rows)
		})
}

const addListItem = (request, response) => {
	var cols = [request.body.name, request.body.section, request.body.required, request.body.notes];
	pool.query('INSERT INTO list_items(name, section, required, notes) VALUES($1, $2, $3, $4);',
		cols,
		function (error) {
			if (error) {
				console.log(error);
				response.status(400)
			}
			response.status(200)
		}
	)
}

const editListItem = (request, response) => {
	var cols = [
		request.body.name,
		request.body.section,
		request.body.required,
		request.body.notes,
		request.params.id
	];
	pool.query('UPDATE list_items SET name=$1, section=$2, required=$3, notes=$4 WHERE id=$5;',
		cols,
		function (error) {
			if (error) {
				console.log(error);
				response.status(400)
			}
			response.status(200)
		}
	)
}

module.exports = {
	getPotentialItemsForSection,
	getRequiredItemsForSection,
	getListItem,
	addListItem,
	editListItem
}
