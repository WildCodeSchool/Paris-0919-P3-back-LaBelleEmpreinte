const express = require('express')
const connection = require('../../conf')
const router = express.Router()

/////////////// GET ////////////////

//// PAGE ACCUEIL ADMIN /// OK
// route qui récupère les noms des tables et complète le dropdown menu avec
router.get('/', (req, res) => {
    connection.query("SELECT table_name FROM information_schema.tables WHERE table_schema='la_belle_empreinte' AND table_name NOT LIKE '%has%';", (err, results) => {
        if (err) {
            res.status(500).send('ça marche pas')
        } else {
            res.json(results)
        }
    })
}
)

// récupérer les initiatives//
router.get('/initiatives' , (req,res) => {
    connection.query("SELECT * FROM initiatives" , (err,results)=> {
        if(err) {
            res.status(500).send('ça marche pas')
        } else {
            res.json(results)
        }

    })
}
    
)

//  page modifier une initiave responsable //
// récupérer les infos de l'initiave sur laquelle on a cliqué dans la liste
router.get('/initiatives_maj/:id', (req, res) => {
    const initiative_id = req.params.id
    connection.query('SELECT * FROM initiatives WHERE id = ?', initiative_id, (err, results) => {
        if (err) {
            res.status(500).send("les initiatives n'ont pas pu être trouvés")
        } else {
            res.status(200).json(results)
        }
    })
}
)

// Page modifier/supprimer initiatives
// Get pour récupérer les filtres objets et besoins par les tables intermédiaires
router.get('/initiatives/:id', (req, res) => {
    const initId = req.params.id
    const tabInt = []
    connection.query('select besoins.besoins, besoins.id from besoins inner join initiatives_has_besoins on initiatives_has_besoins.besoins_id = besoins.id where initiatives_has_besoins.initiatives_id = ?', initId, (err, results) => {
        if (err) {
            res.status(500).send("les besoins associés n'ont pas pu être trouvés")
        } else {
            tabInt.push(...results)
            connection.query('select types_activites.types_activites, types_activites.id from types_activites inner join initiatives_has_types_activites on initiatives_has_types_activites.types_activites_id = types_activites.id where initiatives_has_types_activites.initiatives_id = ?', initId, (err, results) => {
                if (err) {
                    res.status(500).send("les types d'activités associés n'ont pas pu être trouvés")
                } else {
                    tabInt.push(...results)

                    connection.query('select categories_objets.categorie, categories_objets.id  from categories_objets inner join initiatives_has_categories_objets on initiatives_has_categories_objets.categories_objets_id = categories_objets.id where initiatives_has_categories_objets.initiatives_id = ?', initId, (err, results) => {
                        if (err) {
                            res.status(500).send("les catégories d'objets associées n'ont pas pu être trouvées")
                        } else {
                            tabInt.push(...results)

                            connection.query('select categories_intermediaires.name, categories_intermediaires.id from categories_intermediaires inner join initiatives_has_categories_intermediaires on initiatives_has_categories_intermediaires.categories_intermediaires_id = categories_intermediaires.id where initiatives_has_categories_intermediaires.initiatives_id = ?', initId, (err, results) => {
                                if (err) {
                                    res.status(500).send("les categories intermediaires associées n'ont pas pu être trouvées")
                                } else {
                                    tabInt.push(...results)

                                    connection.query('select objets.name, objets.id from objets inner join initiatives_has_objets on initiatives_has_objets.objets_id = objets.id where initiatives_has_objets.initiatives_id = ?', initId, (err, results) => {
                                        if (err) {
                                            res.status(500).send("les objets associés n'ont pas pu être trouvés")
                                        } else {
                                            tabInt.push(...results)

                                            connection.query('select engagements.engagements, engagements.id from engagements inner join initiatives_has_engagements on initiatives_has_engagements.engagements_id = engagements.id where initiatives_has_engagements.initiatives_id = ?', initId, (err, results) => {
                                                if (err) {
                                                    res.status(500).send("les engagements associés n'ont pas pu être trouvés")
                                                } else {
                                                    tabInt.push(...results)

                                                    res.status(200).json(tabInt)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})


// page créer/modifier liste d'init et afficher engagements //
// récupérer les engagements //
router.get('/engagements', (req, res) => {
    connection.query('SELECT * FROM engagements ORDER BY engagements', (err, results) => {
        if (err) {
            res.status(500).send("les engagements n'ont pas pu être trouvés")
        } else {
            res.status(200).json(results)
        }
    })
}
)

router.get('/engagements/:id', (req, res) => {
    const engagement_id = req.params.id
    connection.query('SELECT * FROM initiatives WHERE id = ?', engagement_id, (err, results) => {
        if (err) {
            res.status(500).send("l'engagement n'a pas pu être trouvé")
        } else {
            res.status(200).json(results)
        }
    })
}
)

// Page modifier/supprimer articles
// autre route dans user pour Get les articles //
// Get pour récupérer les filtres par les tables intermédiaires

router.get('/articles/:id', (req, res) => {
    const articleId = req.params.id
    const tabInt = []
    connection.query('select besoins.besoins, besoins.id from besoins inner join articles_has_besoins on articles_has_besoins.besoins_id = besoins.id where articles_has_besoins.articles_id = ?', articleId, (err, results) => {
        if (err) {
            res.status(500).send("les besoins associés n'ont pas pu être trouvés")
        } else {
            tabInt.push(...results)
            connection.query('select types_activites.types_activites, types_activites.id from types_activites inner join articles_has_types_activites on articles_has_types_activites.types_activites_id = types_activites.id where articles_has_types_activites.articles_id = ?', articleId, (err, results) => {
                if (err) {
                    res.status(500).send("les types d'activités associés n'ont pas pu être trouvés")
                } else {
                    tabInt.push(...results)

                    connection.query('select categories_objets.categorie, categories_objets.id  from categories_objets inner join articles_has_categories_objets on articles_has_categories_objets.categories_objets_id = categories_objets.id where articles_has_categories_objets.articles_id = ?', articleId, (err, results) => {
                        if (err) {
                            res.status(500).send("les catégories d'objets associées n'ont pas pu être trouvées")
                        } else {
                            tabInt.push(...results)

                            connection.query('select categories_intermediaires.name, categories_intermediaires.id from categories_intermediaires inner join articles_has_categories_intermediaires on articles_has_categories_intermediaires.categories_intermediaires_id = categories_intermediaires.id where articles_has_categories_intermediaires.articles_id = ?', articleId, (err, results) => {
                                if (err) {
                                    res.status(500).send("les categories intermediaires associées n'ont pas pu être trouvées")
                                } else {
                                    tabInt.push(...results)

                                    connection.query('select objets.name, objets.id from objets inner join articles_has_objets on articles_has_objets.objets_id = objets.id where articles_has_objets.articles_id = ?', articleId, (err, results) => {
                                        if (err) {
                                            res.status(500).send("les objets associés n'ont pas pu être trouvés")
                                        } else {
                                            tabInt.push(...results)

                                            connection.query('select initiatives.name, initiatives.id from initiatives inner join articles_has_initiatives on articles_has_initiatives.initiatives_id = initiatives.id where articles_has_initiatives.articles_id = ?', articleId, (err, results) => {
                                                if (err) {
                                                    res.status(500).send("les initiatives associés n'ont pas pu être trouvés")
                                                } else {
                                                    tabInt.push(...results)

                                                    res.status(200).json(tabInt)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})



// Page afficher catégorie d'objets //
router.get('/categories_objets', (req, res) => {
    connection.query('SELECT * FROM categories_objets ORDER BY categorie', (err, results) => {
        if (err) {
            res.status(500).send("les categories_objets n'ont pas pu être trouvés")
        } else {
            res.status(200).json(results)
        }
    })
}
)

router.get('/categories_objets/:id', (req, res) => {
    const categorie_objets_id = req.params.id
    connection.query('SELECT * FROM initiatives WHERE id = ?', categorie_objets_id, (err, results) => {
        if (err) {
            res.status(500).send("la categorie d'objet n'a pas pu être trouvée")
        } else {
            res.status(200).json(results)
        }
    })
}
)

// Page afficher categories_intermediaires //
router.get('/categories_intermediaires', (req, res) => {
    connection.query('SELECT * FROM categories_intermediaires ORDER BY name', (err, results) => {
        if (err) {
            res.status(500).send("les categories_intermediaires n'ont pas pu être trouvés")
        } else {
            res.status(200).json(results)
        }
    })
}
)

router.get('/categories_intermediaires/:id', (req, res) => {
    const categorie_intermediaires_id = req.params.id
    connection.query('SELECT * FROM initiatives WHERE id = ?', categorie_intermediaires_id, (err, results) => {
        if (err) {
            res.status(500).send("la categorie intermediaire n'a pas pu être trouvée")
        } else {
            res.status(200).json(results)
        }
    })
}
)

// Page afficher objets //
router.get('/objets', (req, res) => {
    connection.query('SELECT * FROM objets ORDER BY name', (err, results) => {
        if (err) {
            res.status(500).send("les objets n'ont pas pu être trouvés")
        } else {
            res.status(200).json(results)
        }
    })
}
)

router.get('/objets/:id', (req, res) => {
    const objet_id = req.params.id
    connection.query('SELECT * FROM initiatives WHERE id = ?', objet_id, (err, results) => {
        if (err) {
            res.status(500).send("l'objet n'a pas pu être trouvé")
        } else {
            res.status(200).json(results)
        }
    })
}
)

// Page afficher besoins //
router.get('/besoins', (req, res) => {
    connection.query('SELECT * FROM besoins ORDER BY besoins', (err, results) => {
        if (err) {
            res.status(500).send("les besoins n'ont pas pu être trouvés")
        } else {
            res.status(200).json(results)
        }
    })
}
)

router.get('/besoins/:id', (req, res) => {
    const besoin_id = req.params.id
    connection.query('SELECT * FROM initiatives WHERE id = ?', besoin_id, (err, results) => {
        if (err) {
            res.status(500).send("le besoin n'a pas pu être trouvé")
        } else {
            res.status(200).json(results)
        }
    })
}
)

// Page afficher types_activites //
router.get('/types_activites', (req, res) => {
    connection.query('SELECT * FROM types_activites ORDER BY types_activites', (err, results) => {
        if (err) {
            res.status(500).send("les types_activites n'ont pas pu être trouvés")
        } else {
            res.status(200).json(results)
        }
    })
}
)

router.get('/types_activites/:id', (req, res) => {
    const type_activites_id = req.params.id
    connection.query('SELECT * FROM initiatives WHERE id = ?', type_activites_id, (err, results) => {
        if (err) {
            res.status(500).send("le type d'activité n'a pas pu être trouvé")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/////////////// POST //////////////////

/// Créer un engagement ///
router.post('/engagements/create', (req, res) => {
    const engagement = req.body
    connection.query('INSERT INTO engagements SET ?', engagement, (err, results) => {
        if (err) {
            res.status(500).send("l'engagement n'a pas pu être créé")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/// Créer un categorie_objet ///
router.post('/categories_objets/create', (req, res) => {
    const categorie_objet = req.body
    connection.query('INSERT INTO categories_objets SET ?', categorie_objet, (err, results) => {
        if (err) {
            res.status(500).send("l'categorie_objet n'a pas pu être créé")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/// Créer un categories_intermediaires ///
router.post('/categories_intermediaires/create', (req, res) => {
    const categories_intermediaire = req.body
    connection.query('INSERT INTO categories_intermediaires SET ?', categories_intermediaire, (err, results) => {
        if (err) {
            res.status(500).send("l'categories_intermediaires n'a pas pu être créé")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/// Créer un objets ///
router.post('/objets/create', (req, res) => {
    const objets = req.body
    connection.query('INSERT INTO objets SET ?', objets, (err, results) => {
        if (err) {
            res.status(500).send("l'objets n'a pas pu être créé")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/// Créer un besoins ///
router.post('/besoins/create', (req, res) => {
    const besoins = req.body
    connection.query('INSERT INTO besoins SET ?', besoins, (err, results) => {
        if (err) {
            res.status(500).send("l'besoins n'a pas pu être créé")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/// Créer un types_activites ///
router.post('/types_activites/create', (req, res) => {
    const types_activites = req.body
    connection.query('INSERT INTO types_activites SET ?', types_activites, (err, results) => {
        if (err) {
            res.status(500).send("l'types_activites n'a pas pu être créé")
        } else {
            res.status(200).json(results)
        }
    })
}
)




////// Page créer un ARTICLE INFORMATIF ////////
/// Récupérer la liste des initiatives //// 
/// dans le front : faire un map sur tous les filtres stockés dans un tableau avec un axios à la route admin/filtre/initiatives à chaque fois ///

router.post('/filtre/initiatives', (req, res) => {
    const formData = req.body
    console.log(formData)
    connection.query(`select initiatives.name, initiatives.id from initiatives inner join initiatives_has_${formData.type} on initiatives_has_${formData.type}.initiatives_id = initiatives.id where initiatives_has_${formData.type}.${formData.type}_id = ? group by initiatives.id`, formData.id, (err, results) => {
        if (err) {
            res.status(500).send(`les initiatives associées à truc n'ont pas été récupérées`)
        }
        else {
            res.status(200).send(results)
        }
    })
})


/////////////// créer un article informatif ///////////////// OK
router.post('/articles/create', (req, res) => {
    const postArticles = req.body.article
    const initiatives = req.body.initiatives
    const besoins = req.body.besoins
    const types_activites = req.body.types_activites
    const categories_objets = req.body.categories_objets
    const categories_intermediaires = req.body.categories_intermediaires
    const objets = req.body.objets
    console.log(postArticles);

    const tableBinding = (tab1, tab2, tab2value, id) => {
        if (tab2value.length != 0) {
            tab2value.map((elem, index) =>
                connection.query(`INSERT INTO ${tab1}_has_${tab2} (${tab1}_id, ${tab2}_id) VALUES ( ${id}, ${elem.id})`, (err, results) => {
                    if (err) {
                        res.status(500).send("l'article n'a pas pu être créé step 2")
                    }
                }))
        }
    }

    connection.query("INSERT INTO articles SET ? ", postArticles, (err, results) => {
        if (err) {
            res.status(500).send("l'article n'a pas pu être créé")
        } else {
            const articleId = results.insertId
            tableBinding('articles', 'initiatives', initiatives, articleId)
            tableBinding('articles', 'besoins', besoins, articleId)
            tableBinding('articles', 'types_activites', types_activites, articleId)
            tableBinding('articles', 'categories_objets', categories_objets, articleId)
            tableBinding('articles', 'categories_intermediaires', categories_intermediaires, articleId)
            tableBinding('articles', 'objets', objets, articleId)
            res.status(200).send('article créé')  /// faut qu'on trouve un moyen de faire le res.status(200) après que les fonctions soient jouées
        }

    })
}
)

///// créer une initiative //////
router.post('/initiatives/create', (req, res) => {
    const postInitiatives = req.body.initiatives
    const engagements = req.body.engagements
    const besoins = req.body.besoins
    const types_activites = req.body.types_activites
    const categories_objets = req.body.categories_objets
    const categories_intermediaires = req.body.categories_intermediaires
    const objets = req.body.objets
    console.log(postInitiatives);

    const tableBinding = (tab1, tab2, tab2value, id) => {
        if (tab2value.length != 0) {
            tab2value.map((elem, index) =>
                connection.query(`INSERT INTO ${tab1}_has_${tab2} (${tab1}_id, ${tab2}_id) VALUES ( ${id}, ${elem.id})`, (err, results) => {
                    if (err) {
                        res.status(500).send("l'initiative n'a pas pu être créé step 2")
                    }
                }))
        }
    }

    connection.query("INSERT INTO initiatives SET ? ", postInitiatives, (err, results) => {
        if (err) {
            res.status(500).send("l'initiative n'a pas pu être créé")
        } else {
            const initId = results.insertId
            tableBinding('initiatives', 'engagements', engagements, initId)
            tableBinding('initiatives', 'besoins', besoins, initId)
            tableBinding('initiatives', 'types_activites', types_activites, initId)
            tableBinding('initiatives', 'categories_objets', categories_objets, initId)
            tableBinding('initiatives', 'categories_intermediaires', categories_intermediaires, initId)
            tableBinding('initiatives', 'objets', objets, initId)
            res.status(200).send('initiative créé')  /// faut qu'on trouve un moyen de faire le res.status(200) après que les fonctions soient jouées
        }

    })
}
)

// 
// récupérer les initiatives selon les filtres sélectionnés //
/////////////////////////// FILTRES /////////////////////////////////
///// FILTRES OBJETS + BESOINS /////////
///// ROUTE pour récupérer tous les initiatives liés aux filtres Objets et Besoins (quand les deux filtres sont sélectionnés)
router.post('/filtres/initiatives', (req, res) => {
	const object = req.body.object
	const besoin = req.body.besoin
	if (object.type == 'categories_objets') {
		if (besoin.type == 'besoins') {
			connection.query(`
				SELECT initiatives.* from initiatives INNER JOIN initiatives_has_categories_objets ON initiatives_has_categories_objets.initiatives_id = initiatives.id INNER JOIN initiatives_has_besoins ON initiatives_has_besoins.initiatives_id = initiatives.id WHERE initiatives_has_categories_objets.categories_objets_id = ? AND initiatives_has_besoins.besoins_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving initiatives related to objets')
				} else res.status(200).json(results)
			})
		} else if (besoin.type == 'types_activites') {
			connection.query(`
		SELECT initiatives.* from initiatives INNER JOIN initiatives_has_categories_objets ON initiatives_has_categories_objets.initiatives_id = initiatives.id INNER JOIN initiatives_has_types_activites ON initiatives_has_types_activites.initiatives_id = initiatives.id WHERE initiatives_has_categories_objets.categories_objets_id = ? AND initiatives_has_types_activites.types_activites_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving initiatives related to objets')
				} else res.status(200).json(results)
			})


		}
	}

	else if (object.type == 'categories_intermediaires') {
		if (besoin.type == 'besoins') {
			connection.query(`
							SELECT initiatives.* from initiatives INNER JOIN initiatives_has_categories_intermediaires ON initiatives_has_categories_intermediaires.initiatives_id = initiatives.id INNER JOIN initiatives_has_besoins ON initiatives_has_besoins.initiatives_id = initiatives.id WHERE initiatives_has_categories_intermediaires.categories_intermediaires_id = ? AND initiatives_has_besoins.besoins_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving initiatives related to objets')
				} else res.status(200).json(results)
			})
		} else if (besoin.type == 'types_activites') {
			connection.query(`
					SELECT initiatives.* from initiatives INNER JOIN initiatives_has_categories_intermediaires ON initiatives_has_categories_intermediaires.initiatives_id = initiatives.id INNER JOIN initiatives_has_types_activites ON initiatives_has_types_activites.initiatives_id = initiatives.id WHERE initiatives_has_categories_intermediaires.categories_intermediaires_id = ? AND initiatives_has_types_activites.types_activites_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving initiatives related to objets')
				} else res.status(200).json(results)
			})


		}
	}

	else if (object.type == 'objets') {
		if (besoin.type == 'besoins') {
			connection.query(`
									SELECT initiatives.* from initiatives INNER JOIN initiatives_has_objets ON initiatives_has_objets.initiatives_id = initiatives.id INNER JOIN initiatives_has_besoins ON initiatives_has_besoins.initiatives_id = initiatives.id WHERE initiatives_has_objets.objets_id = ? AND initiatives_has_besoins.besoins_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving initiatives related to objets')
				} else res.status(200).json(results)
			})
		} else if (besoin.type == 'types_activites') {
			connection.query(`
							SELECT initiatives.* from initiatives INNER JOIN initiatives_has_objets ON initiatives_has_objets.initiatives_id = initiatives.id INNER JOIN initiatives_has_types_activites ON initiatives_has_types_activites.initiatives_id = initiatives.id WHERE initiatives_has_objets.objets_id = ? AND initiatives_has_types_activites.types_activites_id = ?`, [object.id, besoin.id], (err, results) => {
				if (err) {
					res.status(500).send('Error retrieving initiatives related to objets')
				} else res.status(200).json(results)
			})


		}
	}

})

////FILTRES OBJET////
///// ROUTE pour récupérer tous les initiatives liés au filtre Objet (quand seul le filtre Objet est sélectionné)
router.post('/filtres/objets/initiatives', (req, res) => {
	const object = req.body.object
	if (object.type == 'categories_objets') {
		connection.query(`
	SELECT initiatives.* from initiatives INNER JOIN initiatives_has_categories_objets ON initiatives_has_categories_objets.initiatives_id = initiatives.id WHERE initiatives_has_categories_objets.categories_objets_id = ?`, object.id, (err, results) => {
			if (err) {
				res.status(500).send('Error retrieving initiatives related to objets')
			} else res.status(200).json(results)
		})
	}

	else if (object.type == 'categories_intermediaires') {
		connection.query(`
			SELECT initiatives.* from initiatives INNER JOIN initiatives_has_categories_intermediaires ON initiatives_has_categories_intermediaires.initiatives_id = initiatives.id WHERE initiatives_has_categories_intermediaires.categories_intermediaires_id = ?`, object.id, (err, results) => {
			if (err) {
				res.status(500).send('Error retrieving article related to categories intermediaires')
			} else res.status(200).json(results)
		})
	}

	else if (object.type == 'objets') {
		connection.query(`
			SELECT initiatives.* from initiatives INNER JOIN initiatives_has_objets ON initiatives_has_objets.initiatives_id = initiatives.id WHERE initiatives_has_objets.objets_id = ?`, object.id, (err, results) => {
			if (err) {
				res.status(500).send('Error retrieving article related to categories intermediaires')
			} else res.status(200).json(results)
		})
	}

})

////FILTRES BESOINS////
///// ROUTE pour récupérer tous les initiatives liés au filtre Besoin (quand seul le filtre besoin est sélectionné)
router.post('/filtres/besoins/initiatives', (req, res) => {
	const besoin = req.body.besoin
	console.log(besoin)
	console.log(besoin.type)
	if (besoin.type == 'besoins') {
		console.log('salut')
		connection.query(`
	SELECT initiatives.* from initiatives INNER JOIN initiatives_has_besoins ON initiatives_has_besoins.initiatives_id = initiatives.id WHERE initiatives_has_besoins.besoins_id = ?`, besoin.id, (err, results) => {
			if (err) {
				res.status(500).send('Error retrieving initiatives related to objets')
			} else res.status(200).json(results)
		})
	}

	else if (besoin.type == 'types_activites') {
		console.log('aurevoir')
		connection.query(`
			SELECT initiatives.* from initiatives INNER JOIN initiatives_has_types_activites ON initiatives_has_types_activites.initiatives_id = initiatives.id WHERE initiatives_has_types_activites.types_activites_id = ?`, besoin.id, (err, results) => {
			if (err) {
				res.status(500).send('Error retrieving article related to categories intermediaires')
			} else res.status(200).json(results)
		})
	}

})



//////////////////////////////// PUT //////////////////////////////////

/// Modifier un engagements ///
router.put('/engagements/modify', (req, res) => {
    const engagements = req.body
    console.log(engagements)
    connection.query(`UPDATE engagements SET ? where id = ?`, [engagements, engagements.id], (err, results) => {
        if (err) {
            res.status(500).send("l'engagements n'a pas pu être modifié")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/// Modifier un categories_objets ///
router.put('/categories_objets/modify', (req, res) => {
    const categories_objets = req.body
    console.log(categories_objets)
    connection.query(`UPDATE categories_objets SET ? where id = ?`, [categories_objets, categories_objets.id], (err, results) => {
        if (err) {
            res.status(500).send("l'categories_objets n'a pas pu être modifié")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/// Modifier un categories_intermediaires ///
router.put('/categories_intermediaires/modify', (req, res) => {
    const categories_intermediaires = req.body
    console.log(categories_intermediaires)
    connection.query(`UPDATE categories_intermediaires SET ? where id = ?`, [categories_intermediaires, categories_intermediaires.id], (err, results) => {
        if (err) {
            res.status(500).send("l'categories_intermediaires n'a pas pu être modifié")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/// Modifier un objets ///
router.put('/objets/modify', (req, res) => {
    const objets = req.body
    console.log(objets)
    connection.query(`UPDATE objets SET ? where id = ?`, [objets, objets.id], (err, results) => {
        if (err) {
            res.status(500).send("l'objets n'a pas pu être modifié")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/// Modifier un besoins ///
router.put('/besoins/modify', (req, res) => {
    const besoins = req.body
    console.log(req.body)
    connection.query(`UPDATE besoins SET ? where id = ?`, [besoins, besoins.id], (err, results) => {
        if (err) {
            res.status(500).send("l'besoins n'a pas pu être modifié")
        } else {
            res.status(200).json(results)
        }
    })
}
)

/// Modifier un types_activites ///
router.put('/types_activites/modify', (req, res) => {
    const types_activites = req.body
    console.log(types_activites)
    connection.query(`UPDATE types_activites SET ? where id = ?`, [types_activites, types_activites.id], (err, results) => {
        if (err) {
            res.status(500).send("l'types_activites n'a pas pu être modifié")
        } else {
            res.status(200).json(results)
        }
    })
}
)



// modifier un article informatif 
//// première partie : modifier le contenu de la table article 
router.put('/articles_maj/:id', (req, res) => {
    const putArticles = req.body
    const article_id = req.params.id
    console.log(putArticles)
    connection.query(`UPDATE articles SET ? WHERE id = ?`, [putArticles, article_id], (err, results) => {
        if (err) {
            res.status(500).send("l'article n'a pas pu être modifié")
        } else {
            res.status(200).send('article modifié')
        }
    })
}
)

// modifier un article informatif  
//// seconde partie : supprimer l'article des tables intermédiaires et reassocier l'article aux tables intermédiaires sélectionnées
router.put('/articles/:id', (req, res) => {
    const articleId = req.params.id
    const initiatives = req.body.initiatives
    const besoins = req.body.besoins
    const types_activites = req.body.types_activites
    const categories_objets = req.body.categories_objets
    const categories_intermediaires = req.body.categories_intermediaires
    const objets = req.body.objets

    const tableBinding = (tab1, tab2, tab2value, id) => {
        if (tab2value.length != 0) {
            tab2value.map((elem, index) =>
                connection.query(`INSERT INTO ${tab1}_has_${tab2} (${tab1}_id, ${tab2}_id) VALUES ( ${id}, ${elem.id})`, (err, results) => {
                    if (err) {
                        res.status(500).send(`l'article n'a pas pu être créé step 2 a niveau de ${tab2}`)
                    }
                }))
        }
    }

    connection.query('DELETE from articles_has_categories_objets where articles_id = ?', articleId, (err, results) => {
        if (err) {
            res.status(500).send("le lien avec catégories d'objet n'a pas pu être supprimé")
        }
        else {
            connection.query('DELETE from articles_has_categories_intermediaires where articles_id = ?', articleId, (err, results) => {
                if (err) {
                    res.status(500).send("le lien avec categories_intermediaires n'a pas pu être supprimé")
                }
                else {
                    connection.query('DELETE from articles_has_objets where articles_id = ?', articleId, (err, results) => {
                        if (err) {
                            res.status(500).send("le lien avec objets n'a pas pu être supprimé")
                        }
                        else {
                            connection.query('DELETE from articles_has_besoins where articles_id = ?', articleId, (err, results) => {
                                if (err) {
                                    res.status(500).send("le lien avec besoins n'a pas pu être supprimé")
                                }
                                else {
                                    connection.query('DELETE from articles_has_types_activites where articles_id = ?', articleId, (err, results) => {
                                        if (err) {
                                            res.status(500).send("le lien avec types_activites n'a pas pu être supprimé")
                                        }
                                        else {
                                            connection.query('DELETE from articles_has_initiatives where articles_id = ?', articleId, (err, results) => {
                                                if (err) {
                                                    res.status(500).send("le lien avec initiatives n'a pas pu être supprimé")
                                                }
                                                else {
                                                   
                                                            tableBinding('articles', 'initiatives', initiatives, articleId)
                                                            tableBinding('articles', 'besoins', besoins, articleId)
                                                            tableBinding('articles', 'types_activites', types_activites, articleId)
                                                            tableBinding('articles', 'categories_objets', categories_objets, articleId)
                                                            tableBinding('articles', 'categories_intermediaires', categories_intermediaires, articleId)
                                                            tableBinding('articles', 'objets', objets, articleId)
                                                            res.status(200).send('article modifié')  /// faut qu'on trouve un moyen de faire le res.status(200) après que les fonctions soient jouées
                                                      
                                                }
                                            }
                                            )
                                        }
                                    }
                                    )
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})










    //////////////  page modifier une initiave responsable /////////////// 

    // Première partie :  modifier une initiative responsable dans la table initiatives     
    router.put('/initiatives_maj/:id', (req, res) => {
        const putInitiatives = req.body.initiatives
        const initiative_id = req.params.id
        connection.query("UPDATE initiatives SET ? WHERE id = ?", [putInitiatives, initiative_id], (err, results) => {
            if (err) {
                res.status(500).send("l'initiative n'a pas pu être modifiée")
            } else {
                res.status(200).send('initiative modifiée')
            }
        })
    }
    )

    //Deuxième partie : modifier les tables intermédiaires initiatives_has_something
    router.put('/initiatives/:id', (req, res) => {
        const initiativeId = req.params.id
        const engagements = req.body.engagements
        const besoins = req.body.besoins
        const types_activites = req.body.types_activites
        const categories_objets = req.body.categories_objets
        const categories_intermediaires = req.body.categories_intermediaires
        const objets = req.body.objets
    
        const tableBinding = (tab1, tab2, tab2value, id) => {
            if (tab2value.length != 0) {
                tab2value.map((elem, index) =>
                    connection.query(`INSERT INTO ${tab1}_has_${tab2} (${tab1}_id, ${tab2}_id) VALUES ( ${id}, ${elem.id})`, (err, results) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send(`l'initiative n'a pas pu être créé step 2 a niveau de ${tab2}`)
                        }
                    }))
            }
        }
    
        connection.query('DELETE from initiatives_has_categories_objets where initiatives_id = ?', initiativeId, (err, results) => {
            if (err) {
                res.status(500).send("le lien avec catégories d'objet n'a pas pu être supprimé")
            }
            else {
                connection.query('DELETE from initiatives_has_categories_intermediaires where initiatives_id = ?', initiativeId, (err, results) => {
                    if (err) {
                        res.status(500).send("le lien avec categories_intermediaires n'a pas pu être supprimé")
                    }
                    else {
                        connection.query('DELETE from initiatives_has_objets where initiatives_id = ?', initiativeId, (err, results) => {
                            if (err) {
                                res.status(500).send("le lien avec objets n'a pas pu être supprimé")
                            }
                            else {
                                connection.query('DELETE from initiatives_has_besoins where initiatives_id = ?', initiativeId, (err, results) => {
                                    if (err) {
                                        res.status(500).send("le lien avec besoins n'a pas pu être supprimé")
                                    }
                                    else {
                                        connection.query('DELETE from initiatives_has_types_activites where initiatives_id = ?', initiativeId, (err, results) => {
                                            if (err) {
                                                res.status(500).send("le lien avec types_activites n'a pas pu être supprimé")
                                            }
                                            else {
                                                connection.query('DELETE from initiatives_has_engagements where initiatives_id = ?', initiativeId, (err, results) => {
                                                    if (err) {
                                                        res.status(500).send("le lien avec engagements n'a pas pu être supprimé")
                                                    }
                                                    else {
                                                       
                                                                tableBinding('initiatives', 'engagements', engagements, initiativeId)
                                                                tableBinding('initiatives', 'besoins', besoins, initiativeId)
                                                                tableBinding('initiatives', 'types_activites', types_activites, initiativeId)
                                                                tableBinding('initiatives', 'categories_objets', categories_objets, initiativeId)
                                                                tableBinding('initiatives', 'categories_intermediaires', categories_intermediaires, initiativeId)
                                                                tableBinding('initiatives', 'objets', objets, initiativeId)
                                                                res.status(200).send('initiative modifiée')  /// faut qu'on trouve un moyen de faire le res.status(200) après que les fonctions soient jouées
                                                          
                                                    }
                                                }
                                                )
                                            }
                                        }
                                        )
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    })




    ////// DELETE /////////

    // supprimer un article informatif 
    router.delete('/articles_maj/:id', (req, res) => {
        const article_id = req.params.id
        connection.query("DELETE FROM articles WHERE id = ?", article_id, (err, results) => {
            if (err) {
                res.status(500).send("l'aticle n'a pas pu être supprimé")
            } else {
                res.status(200).send('article supprimé')
            }
        })
    }
    )

    // supprimer une initiatives responsable         
    router.delete('/initiatives_maj/:id', (req, res) => {
        const initiatives_id = req.params.id
        connection.query("DELETE FROM initiatives WHERE id = ?", initiatives_id, (err, results) => {
            if (err) {
                res.status(500).send("l'initiatives n'a pas pu être supprimée")
            } else {
                res.status(200).send('initiatives supprimée')
            }
        })
    }
    )

    // supprimer une engagements responsable         
    router.delete('/engagements/:id', (req, res) => {
        const engagements_id = req.params.id
        connection.query("DELETE FROM engagements WHERE id = ?", engagements_id, (err, results) => {
            if (err) {
                res.status(500).send("l'engagements n'a pas pu être supprimée")
            } else {
                res.status(200).send('engagements supprimée')
            }
        })
    }
    )

    // supprimer une categories_objets responsable         
    router.delete('/categories_objets/:id', (req, res) => {
        const categories_objets_id = req.params.id
        connection.query("DELETE FROM categories_objets WHERE id = ?", categories_objets_id, (err, results) => {
            if (err) {
                res.status(500).send("l'categories_objets n'a pas pu être supprimée")
            } else {
                res.status(200).send('categories_objets supprimée')
            }
        })
    }
    )

    // supprimer une categories_intermediaires responsable         
    router.delete('/categories_intermediaires/:id', (req, res) => {
        const categories_intermediaires_id = req.params.id
        connection.query("DELETE FROM categories_intermediaires WHERE id = ?", categories_intermediaires_id, (err, results) => {
            if (err) {
                res.status(500).send("l'categories_intermediaires n'a pas pu être supprimée")
            } else {
                res.status(200).send('categories_intermediaires supprimée')
            }
        })
    }
    )

    // supprimer une objets responsable         
    router.delete('/objets/:id', (req, res) => {
        const objets_id = req.params.id
        connection.query("DELETE FROM objets WHERE id = ?", objets_id, (err, results) => {
            if (err) {
                res.status(500).send("l'objets n'a pas pu être supprimée")
            } else {
                res.status(200).send('objets supprimée')
            }
        })
    }
    )

    // supprimer une besoins responsable         
    router.delete('/besoins/:id', (req, res) => {
        const besoins_id = req.params.id
        connection.query("DELETE FROM besoins WHERE id = ?", besoins_id, (err, results) => {
            if (err) {
                res.status(500).send("l'besoins n'a pas pu être supprimée")
            } else {
                res.status(200).send('besoins supprimée')
            }
        })
    }
    )

    // supprimer une types_activites responsable         
    router.delete('/types_activites/:id', (req, res) => {
        const types_activites_id = req.params.id
        connection.query("DELETE FROM types_activites WHERE id = ?", types_activites_id, (err, results) => {
            if (err) {
                res.status(500).send("l'types_activites n'a pas pu être supprimée")
            } else {
                res.status(200).send('types_activites supprimée')
            }
        })
    }
    )





    module.exports = router