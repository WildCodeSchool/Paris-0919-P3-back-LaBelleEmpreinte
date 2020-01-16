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

// récupérer les articles selon les filtres sélectionnés //
router.post('/filtres/articles', (req, res) => {
	const objectName = req.body.objectName
	const besoinName = req.body.besoinName
	if (objectName && besoinName) {
		// Récupérer le titre, l'image et l'id de chaque article qui répond aux deux filtres besoin et objet //
		connection.query(
			`SELECT articles.titre, articles.image, articles.id FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.categories_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id INNER JOIN types_activites ON types_activites.id = articles_has_types_activites.types_activites_id INNER JOIN articles_has_categories_intermediaires ON articles.id = articles_has_categories_intermediaires.articles_id INNER JOIN categories_intermediaires ON categories_intermediaires.id = articles_has_categories_intermediaires.categories_intermediaires_id INNER JOIN articles_has_objets ON articles.id = articles_has_objets.articles_id INNER JOIN objets ON objets.id = articles_has_objets.objets_id WHERE categories_objets.categorie = ? OR categories_intermediaires.name = ? OR objets.name = ? AND besoins.besoins = ? OR types_activites.types_activites = ? GROUP BY articles.id`,
			[objectName, objectName, objectName, besoinName, besoinName],
			(err, results) => {
				if (err) {
					console.log(err)
					res
						.status(500)
						.send(`Erreur lors de la récupération de la liste des users avec les 2 filtres !!`)
				} else res.status(200).json(results)
			}
		)
	}
	else if (besoinName) {
		// Requête SQL pour récupérer le titre, l'image et l'id de chaque article qui répond au filtre besoin //
		connection.query(
			`SELECT articles.titre, articles.image, articles.id FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.categories_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id INNER JOIN types_activites ON types_activites.id = articles_has_types_activites.types_activites_id INNER JOIN articles_has_categories_intermediaires ON articles.id = articles_has_categories_intermediaires.articles_id INNER JOIN categories_intermediaires ON categories_intermediaires.id = articles_has_categories_intermediaires.categories_intermediaires_id INNER JOIN articles_has_objets ON articles.id = articles_has_objets.articles_id INNER JOIN objets ON objets.id = articles_has_objets.objets_id WHERE besoins.besoins = ? OR types_activites.types_activites = ? GROUP BY articles.id`,
			[besoinName, besoinName],
			(err, results) => {
				if (err) {
					res
						.status(500)
						.send(`Erreur lors de la récupération de la liste des users avec le filtre besoin/typesdactivites !!`)
				} else res.status(200).json(results)
			}
		)
	}
	else if (objectName) {
		// Requête SQL pour récupérer le titre, l'image et l'id de chaque article qui répond au filtre objet //
		connection.query(
			`SELECT articles.titre, articles.image, articles.id FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.categories_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id INNER JOIN types_activites ON types_activites.id = articles_has_types_activites.types_activites_id INNER JOIN articles_has_categories_intermediaires ON articles.id = articles_has_categories_intermediaires.articles_id INNER JOIN categories_intermediaires ON categories_intermediaires.id = articles_has_categories_intermediaires.categories_intermediaires_id INNER JOIN articles_has_objets ON articles.id = articles_has_objets.articles_id INNER JOIN objets ON objets.id = articles_has_objets.objets_id WHERE categories_objets.categorie = ? OR categories_intermediaires.name = ? OR objets.name = ? GROUP BY articles.id`,
			[objectName, objectName, objectName],
			(err, results) => {
				if (err) {
					res
						.status(500)
						.send(`Erreur lors de la récupération de la liste des users avec le filtre objet/catint/catobjet !!`)
				} else res.status(200).json(results)
			}
		)
	}

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
	connection.query(`SELECT initiatives.name, initiatives.url, initiatives.adresse1, initiatives.logo from articles INNER JOIN articles_has_initiatives ON articles_has_initiatives.articles_id = articles.id INNER JOIN initiatives ON initiatives.id = articles_has_initiatives.initiatives_id WHERE articles.id = ?`, req.params.id, (err, results) => {
		if (err) {
			res.status(500).send('Error retrieving article')
		} else res.status(200).json(results)
	})
})


module.exports = router