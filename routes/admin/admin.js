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

// supprimer un article informatif          IL FAUT SUPPRIMER LES DONNES DANS LES TABLES INTERMEDIAIRES ASSOCIEES
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

// supprimer une initiative responsable         
// IL FAUT SUPPRIMER LES DONNES DANS LES TABLES INTERMEDIAIRES ASSOCIEES
router.delete('/initiatives_maj/:id', (req, res) => {
    const initiative_id = req.params.id
    connection.query("DELETE FROM initiatives WHERE id = ?", initiative_id, (err, results) => {
        if (err) {
            res.status(500).send("l'initiative n'a pas pu être supprimée")
        } else {
            res.status(200).send('initiative supprimée')
        }
    })
}
)




module.exports = router