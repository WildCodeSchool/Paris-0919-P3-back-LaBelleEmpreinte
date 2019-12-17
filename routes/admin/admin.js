const express = require('express')
const connection = require('../../conf')

const router = express.Router()

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
/////////////// créer un article informatif /////////////////
// post des données dans les input dans un tuple de la table article     ///  OK
router.post('/articles', (req, res) => {
    const postArticles = req.body
    connection.query("INSERT INTO articles SET ? ", postArticles, (err, results) => {
        if (err) {
            res.status(500).send("l'aticle n'a pas pu être créé")
        } else {
            res.status(200).send('article créé')
        }
    })
    }
)

//// afficher les objets et besoins dans les dropdown menu correspondants
// Get besoins //
router.get('/besoins', (req, res) => {

    connection.query(`SELECT * FROM besoins`, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving besoins');
        } else {
            res.json(results);
        }
    });

})

// Get types d'activités //
router.get('/activites', (req, res) => {

    connection.query(`SELECT * FROM types_activites`, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving types dactivites ');
        } else {
            res.json(results);
        }
    });

})

// Get Catégories d'objets //
router.get('/catobjets', (req, res) => {

    connection.query(`SELECT * FROM categories_objets`, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving categories_objets');
        } else {
            res.json(results);
        }
    });

})

// get Catégories intermédiaires //
router.get('/catinter', (req, res) => {

    connection.query(`SELECT * FROM categories_intermediaires`, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving categories_intermediaires ');
        } else {
            res.json(results);
        }
    });

})

// get objets //
router.get('/objets', (req, res) => {

    connection.query(`SELECT * FROM objets`, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving objets');
        } else {
            res.json(results);
        }
    });

})


//// selectioner les critères à asssocier
// récupérer les articles selon les filtres sélectionnés //   // remplacer articles part initiatives et mettre des OR à la place des AND //
router.post('/filtre', (req, res) => {
    const objectsList = req.body.objectId
    const besoinsList = req.body.besoinId
    console.log(req.body)
    if(objectId && besoinId){
        connection.query(
            `SELECT besoins.besoins, articles.titre, articles.image, articles.id, categories_objets.categorie, types_activites.types_activites, objets.name, categories_intermediaires.name FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.catego  a v q0 ries_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id INNER JOIN types_activites ON types_activites.id = articles_has_types_activites.types_activites_id INNER JOIN articles_has_categories_intermediaires ON articles.id = articles_has_categories_intermediaires.articles_id INNER JOIN categories_intermediaires ON categories_intermediaires.id = articles_has_categories_intermediaires.categories_intermediaires_id INNER JOIN articles_has_objets ON articles.id = articles_has_objets.articles_id INNER JOIN objets ON objets.id = articles_has_objets.objets_id WHERE categories_objets.categorie = ? OR categories_intermediaires.name = ? OR objets.name = ? AND besoins.besoins = ? OR types_activites.types_activites = ? `,
            
           [objectId,objectId, objectId, besoinId, besoinId] ,
           (err, results) => {
             if (err) {
                 console.log(err)
               res
                 .status(500)
                 .send(`Erreur lors de la récupération de la liste des users avec les 2 filtres !!`)
             } else {
                const filteredArticles = []
                results.map(article => {
                    if (filteredArticles.length == 0) {
                        
                        const newArticle = {
                            titre : article.titre,
                            image : article.image,
                            articleId : article.id 
                        }
                        filteredArticles.push(newArticle)
                    }

                    for (let i=0 ; i < filteredArticles.length ; ++i) {
                        if (article.id != filteredArticles[i].articleId) {
                            const newArticle = {
                                titre : article.titre,
                                image : article.image,
                                articleId : article.id 
                            }
                            filteredArticles.push(newArticle)
                        }
                    }
                })
               res.status(200).json(filteredArticles)
             }
           }
         )
    }
    else if(besoinId){
        connection.query(
            `SELECT besoins.besoins, articles.titre, articles.image, articles.id, categories_objets.categorie, types_activites.types_activites, objets.name, categories_intermediaires.name FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.categories_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id INNER JOIN types_activites ON types_activites.id = articles_has_types_activites.types_activites_id INNER JOIN articles_has_categories_intermediaires ON articles.id = articles_has_categories_intermediaires.articles_id INNER JOIN categories_intermediaires ON categories_intermediaires.id = articles_has_categories_intermediaires.categories_intermediaires_id INNER JOIN articles_has_objets ON articles.id = articles_has_objets.articles_id INNER JOIN objets ON objets.id = articles_has_objets.objets_id WHERE besoins.besoins = ? ` ,
           [besoinId],
           (err, results) => {
             if (err) {
               res
                 .status(500)
                 .send(`Erreur lors de la récupération de la liste des users avec le filtre besoin/typesdactivites !!`)
             } else {
                const filteredArticles = []
                results.map(article => {
                    if (filteredArticles.length == 0) {
                        
                        const newArticle = {
                            titre : article.titre,
                            image : article.image,
                            articleId : article.id 
                        }
                        filteredArticles.push(newArticle)
                    }

                    for (let i=0 ; i < filteredArticles.length ; ++i) {
                        if (article.id != filteredArticles[i].articleId) {
                            const newArticle = {
                                titre : article.titre,
                                image : article.image,
                                articleId : article.id 
                            }
                            filteredArticles.push(newArticle)
                        }
                    }
                })
               res.status(200).json(filteredArticles)
             }
           }
         )
    }
    else if(objectId){
        connection.query(
            ` SELECT besoins.besoins, articles.titre, articles.image, articles.id, categories_objets.categorie, types_activites.types_activites, objets.name, categories_intermediaires.name FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.categories_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id INNER JOIN types_activites ON types_activites.id = articles_has_types_activites.types_activites_id INNER JOIN articles_has_categories_intermediaires ON articles.id = articles_has_categories_intermediaires.articles_id INNER JOIN categories_intermediaires ON categories_intermediaires.id = articles_has_categories_intermediaires.categories_intermediaires_id INNER JOIN articles_has_objets ON articles.id = articles_has_objets.articles_id INNER JOIN objets ON objets.id = articles_has_objets.objets_id WHERE categories_objets.categorie = ? ` ,
           [objectId],
           (err, results) => {
             if (err) {
               res
                 .status(500)
                 .send(`Erreur lors de la récupération de la liste des users avec le filtre objet/catint/catobjet !!`)
             } else {
                const filteredArticles = []
                results.map(article => {
                    if (filteredArticles.length == 0) {
                        
                        const newArticle = {
                            titre : article.titre,
                            image : article.image,
                            articleId : article.id 
                        }
                        filteredArticles.push(newArticle)
                    }

                    for (let i=0 ; i < filteredArticles.length ; ++i) {
                        if (article.id != filteredArticles[i].articleId) {
                            const newArticle = {
                                titre : article.titre,
                                image : article.image,
                                articleId : article.id 
                            }
                            filteredArticles.push(newArticle)
                        }
                    }
                })
               res.status(200).json(filteredArticles)
             }
           }
         )
    }
  })

 ////////////// afficher les articles informatifs ///////////////           à voir avec Pauline et Tracy
// router.get('/articles_liste', (req, res) => {
//     connection.query('SELECT id, titres, publication FROM articles WHERE ',, (err, results) => {
//         if (err) {
//             res.status(500).send("les articles n'ont pas pu être trouvés")
//         } else {
//             res.status(200).json(results)
//         }
//     })
//     }
// )


//////////////  modifier un article informatif ///////////////              OK
// récupérer les infos de l'article sur lequel on a cliqué dans la liste
router.get('/articles_maj/:id', (req, res) => {
    const article_id = req.params.id
    connection.query('SELECT * FROM articles WHERE id = ?', article_id, (err, results) => {
        if (err) {
            res.status(500).send("les articles n'ont pas pu être trouvés")
        } else {
            res.status(200).json(results)
        }
    })
    }
)

// modifier un article informatif               OK
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

// supprimer un article informatif          OK
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

 ////////////// afficher les initiatives responsables ///////////////            à voir avec Pauline et Tracy
//  router.get('/initiatives_liste', (req, res) => {
//     connection.query('SELECT id, titres, publication FROM initiatives WHERE ',, (err, results) => {
//         if (err) {
//             res.status(500).send("les articles n'ont pas pu être trouvés")
//         } else {
//             res.status(200).json(results)
//         }
//     })
//     }
// )

//////////////  modifier une initiave responsable /////////////// 
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

// modifier une initiative responsable               OK
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

// supprimer une initiative responsable          OK
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