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

const getPotentialItemsForSection = (request, response) => {
	var sectionId = request.params.sectionId;

	pool.query('SELECT * FROM list_items WHERE section=$1 ORDER BY id ASC;', [sectionId], function (error, results) {
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

const getNotRequiredItemsForSection = (request, response) => {
	var sectionId = request.params.sectionId;

	pool.query('SELECT * FROM list_items WHERE section=$1 AND required=false ORDER BY id ASC;', [sectionId], function (error, results) {
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
		notes
	} = request.body
	pool.query('INSERT INTO list_items(name, section, required, notes) VALUES($1, $2, $3, $4) returning *;',
		[name, section, required, notes],
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
		notes
	} = request.body
	pool.query('UPDATE list_items SET name=$1, section=$2, required=$3, notes=$4 WHERE id=$5 returning *;',
		[name, section, required, notes, itemId],
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

	pool.query('UPDATE list_items SET required=false WHERE section=$1;',
		[sectionId],
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
	getPotentialItemsForSection,
	getRequiredItemsForSection,
	getNotRequiredItemsForSection,
	getListItem,
	addListItem,
	editListItem,
	resetSection,
	deleteListItem
}
