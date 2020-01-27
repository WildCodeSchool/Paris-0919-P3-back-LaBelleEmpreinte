const express = require("express")
const connection = require('../../conf')

const router = express.Router()

// Get all besoins et types d'activités //
router.get('/besoins', (req, res) => {
	connection.query(`SELECT * FROM besoins`, (err, results) => {
		if (err) {
			res.status(500).send('Error retrieving besoins');
		} else {
			const besoins = { type: "besoins", results }
			connection.query(`SELECT * FROM types_activites`, (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving types dactivites ');
				} else {
					const typeActivites = { type: "types_activites", results }
					const filtreBesoin = [besoins, typeActivites]
					res.json(filtreBesoin);
				}
			});
		}
	});

})


// Get all Catégories d'objets, catégories intermédiaires and objects //
router.get('/objets', (req, res) => {
	connection.query(`SELECT * FROM categories_objets`, (err, results) => {
		if (err) {
			res.status(500).send('Error retrieving categories_objets');
		} else {
			const catObjets = { type: "Catégories d'Objets", results }
			connection.query(`SELECT * FROM categories_intermediaires`, (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving categories_intermediaires ');
				} else {
					const catInter = { type: "Catégories intermédiaires", results }
					connection.query(`SELECT * FROM objets`, (err, results) => {
						if (err) {
							res.status(500).send('Error retrieving objets');
						} else {
							const objets = { type: "Objets", results }
							const filtreObjet = [catObjets, catInter, objets]
							res.json(filtreObjet);
						}
					});
				}
			})
		};
	})
})


///// ROUTE pour récupérer tous les articles liés aux filtres Objets et Besoins (quand les deux filtres sont sélectionnés)
router.post('/filtres/articles', (req, res) => {
	const object = req.body.object
	const besoin = req.body.besoin
	if (object.type == 'categories_objets') {
		if (besoin.type == 'besoins') {
			connection.query(`
				SELECT articles.* from articles INNER JOIN articles_has_categories_objets ON articles_has_categories_objets.articles_id = articles.id INNER JOIN articles_has_besoins ON articles_has_besoins.articles_id = articles.id WHERE articles_has_categories_objets.categories_objets_id = ? AND articles_has_besoins.besoins_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving articles related to objets')
				} else res.status(200).json(results)
			})
		} else if (besoin.type == 'types_activites') {
			connection.query(`
		SELECT articles.* from articles INNER JOIN articles_has_categories_objets ON articles_has_categories_objets.articles_id = articles.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id WHERE articles_has_categories_objets.categories_objets_id = ? AND articles_has_types_activites.types_activites_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving articles related to objets')
				} else res.status(200).json(results)
			})


		}
	}

	else if (object.type == 'categories_intermediaires') {
		if (besoin.type == 'besoins') {
			connection.query(`
							SELECT articles.* from articles INNER JOIN articles_has_categories_intermediaires ON articles_has_categories_intermediaires.articles_id = articles.id INNER JOIN articles_has_besoins ON articles_has_besoins.articles_id = articles.id WHERE articles_has_categories_intermediaires.categories_intermediaires_id = ? AND articles_has_besoins.besoins_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving articles related to objets')
				} else res.status(200).json(results)
			})
		} else if (besoin.type == 'types_activites') {
			connection.query(`
					SELECT articles.* from articles INNER JOIN articles_has_categories_intermediaires ON articles_has_categories_intermediaires.articles_id = articles.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id WHERE articles_has_categories_intermediaires.categories_intermediaires_id = ? AND articles_has_types_activites.types_activites_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving articles related to objets')
				} else res.status(200).json(results)
			})


		}
	}

	else if (object.type == 'objets') {
		if (besoin.type == 'besoins') {
			connection.query(`
									SELECT articles.* from articles INNER JOIN articles_has_objets ON articles_has_objets.articles_id = articles.id INNER JOIN articles_has_besoins ON articles_has_besoins.articles_id = articles.id WHERE articles_has_objets.objets_id = ? AND articles_has_besoins.besoins_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving articles related to objets')
				} else res.status(200).json(results)
			})
		} else if (besoin.type == 'types_activites') {
			connection.query(`
							SELECT articles.* from articles INNER JOIN articles_has_objets ON articles_has_objets.articles_id = articles.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id WHERE articles_has_objets.objets_id = ? AND articles_has_types_activites.types_activites_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving articles related to objets')
				} else res.status(200).json(results)
			})


		}
	}

})







///// ROUTE pour récupérer tous les articles liés au filtre Objet (quand seul le filtre Objet est sélectionné)
router.post('/filtres/objets/articles', (req, res) => {
	const object = req.body.object
	if (object.type == 'categories_objets') {
		connection.query(`
	SELECT articles.* from articles INNER JOIN articles_has_categories_objets ON articles_has_categories_objets.articles_id = articles.id WHERE articles_has_categories_objets.categories_objets_id = ?`, object.id, (err, results) => {
			if (err) {
				res.status(500).send('Error retrieving articles related to objets')
			} else res.status(200).json(results)
		})
	}

	else if (object.type == 'categories_intermediaires') {
		connection.query(`
			SELECT articles.* from articles INNER JOIN articles_has_categories_intermediaires ON articles_has_categories_intermediaires.articles_id = articles.id WHERE articles_has_categories_intermediaires.categories_intermediaires_id = ?`, object.id, (err, results) => {
			if (err) {
				res.status(500).send('Error retrieving article related to categories intermediaires')
			} else res.status(200).json(results)
		})
	}

	else if (object.type == 'objets') {
		connection.query(`
			SELECT articles.* from articles INNER JOIN articles_has_objets ON articles_has_objets.articles_id = articles.id WHERE articles_has_objets.objets_id = ?`, object.id, (err, results) => {
			if (err) {
				res.status(500).send('Error retrieving article related to categories intermediaires')
			} else res.status(200).json(results)
		})
	}

})

///// ROUTE pour récupérer tous les articles liés au filtre Besoin (quand seul le filtre besoin est sélectionné)
router.post('/filtres/besoins/articles', (req, res) => {
	const besoin = req.body.besoin
	console.log(besoin)
	console.log(besoin.type)
	if (besoin.type == 'besoins') {
		console.log('salut')
		connection.query(`
	SELECT articles.* from articles INNER JOIN articles_has_besoins ON articles_has_besoins.articles_id = articles.id WHERE articles_has_besoins.besoins_id = ?`, besoin.id, (err, results) => {
			if (err) {
				res.status(500).send('Error retrieving articles related to objets')
			} else res.status(200).json(results)
		})
	}

	else if (besoin.type == 'types_activites') {
		console.log('aurevoir')
		connection.query(`
			SELECT articles.* from articles INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id WHERE articles_has_types_activites.types_activites_id = ?`, besoin.id, (err, results) => {
			if (err) {
				res.status(500).send('Error retrieving article related to categories intermediaires')
			} else res.status(200).json(results)
		})
	}

})

///// ROUTE pour récupérer 3 les derniers articles avant d'appliquer les filtres
router.get('/lastarticles', (req, res) => {
	connection.query(`
	SELECT articles.* FROM articles ORDER BY date DESC LIMIT 3`, (err, results) => {
		if (err) {
			res.status(500).send('Error retrieving last articles ordered by date')
		} else res.status(200).json(results)
	})
})

// récupérer le contenu d'un article grâce à son id //
router.get('/articles/:id', (req, res) => {

	connection.query(`SELECT * FROM articles WHERE id = ?`, req.params.id, (err, results) => {
		if (err) {
			res.status(500).send('Error retrieving article')
		} else res.status(200).json(results)
	})
})

// récupérer les initiatives associées à un article grâce à l'id de l'article //
router.get('/initiatives/:id', (req, res) => {
	connection.query(`SELECT initiatives.* from articles INNER JOIN articles_has_initiatives ON articles_has_initiatives.articles_id = articles.id INNER JOIN initiatives ON initiatives.id = articles_has_initiatives.initiatives_id WHERE articles.id = ?`, req.params.id, (err, results) => {
		if (err) {
			res.status(500).send('Error retrieving article')
		} else res.status(200).json(results)
	})
})

// récupérer les engagements associés à une initiative grâce à l'id de l'initiative //
router.get('/engagements', (req, res) => {
	connection.query(`SELECT engagements.*, initiatives_has_engagements.initiatives_id from initiatives INNER JOIN initiatives_has_engagements ON initiatives_has_engagements.initiatives_id = initiatives.id INNER JOIN engagements ON engagements.id = initiatives_has_engagements.engagements_id`, req.params.id, (err, results) => {
		if (err) {
			res.status(500).send('Error retrieving article')
		} else res.status(200).json(results)
	})
})


module.exports = router