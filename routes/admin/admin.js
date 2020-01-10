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

//  page modifier une initiave responsable //
// récupérer les infos de l'initiave sur laquelle on a cliqué dans la liste
// IL FAUT AUSSSI GET LES TABLES INTERMEDIARES 
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

// page créer/modifier liste d'init et afficher engagements //
// récupérer les engagements //
router.get('/engagements', (req, res) => {
    connection.query('SELECT * FROM engagements', (err, results) => {
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


// Page afficher catégorie d'objets //
router.get('/categories_objets', (req, res) => {
    connection.query('SELECT * FROM categories_objets', (err, results) => {
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
    connection.query('SELECT * FROM categories_intermediaires', (err, results) => {
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
    connection.query('SELECT * FROM objets', (err, results) => {
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
    connection.query('SELECT * FROM besoins', (err, results) => {
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
    connection.query('SELECT * FROM types_activites', (err, results) => {
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




////// ARTICLE INFORMATIF ////////

/// Récupérer la liste des initiatives //// 
// EN PROGRES //

router.post('/filtre', (req, res) => {
    const besoins = req.body.besoins
    const types_activites = req.body.types_activites
    const categories_objets = req.body.categories_objets
    const categories_intermediaires = req.body.categories_intermediaires
    const objets = req.body.objets
    const filteredInitiatives = []
    const getFilters = (tab, tabValue) => {
        console.log(filteredInitiatives)
        if (tabValue.length != 0) {
            tabValue.map((elem, index) =>
                connection.query(`SELECT initiatives.name, initiatives.id FROM initiatives INNER JOIN initiatives_has_${tab} ON initiatives_has_${tab}.initiatives_id = initiatives.id WHERE initiatives_has_${tab}.${tab}_id = ${tabValue} GROUP BY initiatives.id`, (err, results) => {
                    if (err) {
                        res.status(500).send(`les initiatives associées à ${tab} n'ont pas été récupérées`)
                    }
                    else {
                        const uniqueFilteredInitiatives = [...new Set(results.map(elem => filteredInitiatives.elem))]
                        console.log('unique', uniqueFilteredInitiatives)
                    }
                    // const uniqueFilteredInitiatives = [...new Set(results.map(elem => filteredInitiatives.elem))]
                }))
        }
    }

    getFilters('besoins', besoins)
    getFilters('objets', objets)
    res.status(200).send(uniqueFilteredInitiatives)


   // SELECT initiatives.name, initiatives.id FROM initiatives INNER JOIN initiatives_has_besoins ON initiatives_has_besoins.initiatives_id = initiatives.id INNER JOIN besoins ON initiatives_has_besoins.initiatives_id = initiatives.id WHERE besoins.id = 4 GROUP BY initiatives.id // 
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
                connection.query(`INSERT INTO ${tab1}_has_${tab2} (${tab1}_id, ${tab2}_id) VALUES ( ${id}, ${elem})`, (err, results) => {
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


///////// PUT ///////////

/// Modifier un engagements ///
router.put('/engagements/modify', (req, res) => {
	const engagements = req.body
	console.log(engagements)
    connection.query(`UPDATE engagements SET ? where id = ?`, [engagements, engagements.id],(err, results) => {
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
    connection.query(`UPDATE categories_objets SET ? where id = ?`, [categories_objets, categories_objets.id],(err, results) => {
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
    connection.query(`UPDATE categories_intermediaires SET ? where id = ?`, [categories_intermediaires, categories_intermediaires.id],(err, results) => {
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
    connection.query(`UPDATE objets SET ? where id = ?`, [objets, objets.id],(err, results) => {
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
	console.log(besoins)
    connection.query(`UPDATE besoins SET ? where id = ?`, [besoins, besoins.id],(err, results) => {
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
    connection.query(`UPDATE types_activites SET ? where id = ?`, [types_activites, types_activites.id],(err, results) => {
        if (err) {
            res.status(500).send("l'types_activites n'a pas pu être modifié")
        } else {
            res.status(200).json(results)
        }
    })
}
)



// modifier un article informatif               IL FAUT COMPLETER LES TABLES INTERMEDIAIRES
router.put('/articles_maj/:id', (req, res) => {
    const putArticles = req.body
    const article_id = req.params.id
    connection.query("UPDATE articles SET ? WHERE id = ?", putArticles, article_id, (err, results) => {
        if (err) {
            res.status(500).send("l'aticle n'a pas pu être modifié")
        } else {
            res.status(200).send('article modifié')
        }
    })
}
)




//////////////  page modifier une initiave responsable /////////////// 

// modifier une initiative responsable        
// IL FAUT MAJ LES TABLES INTERMEDIAIRES
router.put('/initiatives_maj/:id', (req, res) => {
    const putInitiatives = req.body
    const initiative_id = req.params.id
    connection.query("UPDATE initiatives SET ? WHERE id = ?", putInitiatives, initiative_id, (err, results) => {
        if (err) {
            res.status(500).send("l'initiative n'a pas pu être modifiée")
        } else {
            res.status(200).send('initiative modifiée')
        }
    })
}
)




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