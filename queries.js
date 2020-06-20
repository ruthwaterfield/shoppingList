const dbSettings = require('./dbSettings').dbSettings

const Pool = require('pg').Pool
const pool = new Pool({
	user: dbSettings.user,
	host: dbSettings.host,
	database: dbSettings.database,
	password: dbSettings.password,
	port: dbSettings.port
})

const getSections = (request, response) => {
	pool.query('SELECT * FROM supermarket_sections ORDER BY id ASC;', function (error, results) {
		if (error) {
			console.log(error);
			response.status(400).send('Sorry there was a problem!')
		} else {
			response.status(200).json(results.rows)
		}
	})
}

const getRegularItemsForSection = (request, response) => {
	var sectionId = request.params.sectionId;

	pool.query('SELECT * FROM list_items WHERE section=$1 AND regular=true AND required=false ORDER BY id ASC;', [sectionId], function (error, results) {
		if (error) {
			console.log(error);
			response.status(400).send('Sorry there was a problem!')
		} else {
			response.status(200).json(results.rows)
		}
	})
}

const getRequiredItemsForSection = (request, response) => {
	var sectionId = request.params.sectionId;

	pool.query('SELECT * FROM list_items WHERE section=$1 AND required=true ORDER BY id ASC;', [sectionId], function (error, results) {
		if (error) {
			console.log(error);
			response.status(400).send('Sorry there was a problem!')
		} else {
			response.status(200).json(results.rows)
		}
	})
}

const getIrregularItemsForSection = (request, response) => {
	var sectionId = request.params.sectionId;

	pool.query('SELECT * FROM list_items WHERE section=$1 AND regular=false AND required=false ORDER BY id ASC;', [sectionId], function (error, results) {
		if (error) {
			console.log(error);
			response.status(400).send('Sorry there was a problem!')
		} else {
			response.status(200).json(results.rows)
		}
	})
}

const getListItem = (request, response) => {
	var itemId = request.params.itemId;

	pool.query('SELECT * FROM list_items WHERE id=$1;',
		[itemId],
		function (error, results) {
			if (error) {
				console.log(error);
				response.status(400).send('Sorry there was a problem!')
			} else {
				response.status(200).json(results.rows)
			}
		})
}

const addListItem = (request, response) => {
	const {
		name,
		section,
		required,
		regular,
		temporary,
		notes
	} = request.body
	pool.query('INSERT INTO list_items(name, section, required, regular, temporary, notes) VALUES($1, $2, $3, $4, $5, $6) returning *;',
		[name, section, required, regular, temporary, notes],
		function (error, result) {
			if (error) {
				console.log(error);
				response.status(400).send('Sorry there was a problem!')
			} else {
				response.status(200).json(result.rows)
			}
		}
	)
}

const editListItem = (request, response) => {
	const itemId = request.params.itemId
	const {
		name,
		section,
		required,
		regular,
		temporary,
		notes
	} = request.body
	pool.query('UPDATE list_items SET name=$1, section=$2, required=$3, regular=$4, temporary=$5, notes=$6 WHERE id=$7 returning *;',
		[name, section, required, regular, temporary, notes, itemId],
		function (error, result) {
			if (error) {
				console.log(error);
				response.status(400).send('Sorry there was a problem!')
			} else {
				response.status(200).json(result.rows)
			}
		}
	)
}

const resetSection = (request, response) => {
	const sectionId = request.params.sectionId

	let deleteTemporaryItems = new Promise((resolve, reject) => {
		pool.query('DELETE FROM list_items WHERE temporary=true AND section=$1;',
			[sectionId],
			function (error, result) {
				if (error) {
					reject(error)
				} else {
					resolve()
				}
			}
		)
	})

	let takeAllItemsOffList = new Promise((resolve, reject) => {
		pool.query('UPDATE list_items SET required=false WHERE section=$1;',
			[sectionId],
			function (error, result) {
				if (error) {
					reject(error)
				} else {
					resolve()
				}
			}
		)
	})

	Promise.all([deleteTemporaryItems, takeAllItemsOffList])
			.then(() => {
				response.status(200).send()
			})
			.catch((error) => {
				console.log(error);
				response.status(400).send('Sorry there was a problem!')
			})
}

const deleteListItem = (request, response) => {
	const itemId = parseInt(request.params.itemId)

	pool.query('DELETE FROM list_items WHERE id = $1;',
		[itemId],
		function (error, result) {
			if (error) {
				console.log(error);
				response.status(400).send('Sorry there was a problem!')
			} else {
				response.status(200).send()
			}
		}
	)
}

module.exports = {
	getSections,
	getRegularItemsForSection,
	getRequiredItemsForSection,
	getIrregularItemsForSection,
	getListItem,
	addListItem,
	editListItem,
	resetSection,
	deleteListItem
}
