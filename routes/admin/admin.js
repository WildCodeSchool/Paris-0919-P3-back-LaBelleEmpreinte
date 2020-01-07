const express = require('express')
const connection = require('../../conf')

const router = express.Router()


////  Route test /////

router.post('/test', (req, res) => {

    connection.query(`INSERT INTO articles_has_initiatives VALUES( 14, 'z')`, function (error, results) {
        if (error) {
            return connection.rollback(function () {
                res.status(500).send('ça bug');
            });
        }
        else res.status(200).send('test de base fonctionne')

    })
})




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


/////// ROUTE POUR CREER UN ARTICLE ET L'ASSOCIER AVEC LES TABLES INTERMEDIAIRES /////////
router.post('/blabla', (req, res) => {
    const postArticles = req.body.article
    const initiatives = req.body.initiatives
    const besoins = req.body.besoins
    const types_activites = req.body.types_activites
    const categories_objets = req.body.categories_objets
    const categories_intermediaires = req.body.categories_intermediaires
    const objets = req.body.objets
    console.log(postArticles);

    connection.beginTransaction(function (err) {
        if (err) { throw err; }
        connection.query("INSERT INTO articles SET ? ", postArticles, (error, results) => {
            if (error) {
                return connection.rollback(function () {
                    res.send("erreur lors de l'ajout de l'article").status(500);
                });
            }
            else {
                articleId = results.insertId
                if (initiatives.length != 0) {
                    initiatives.map((elem, index) =>
                        connection.query(`INSERT INTO articles_has_initiatives (articles_id, initiatives_id) VALUES ( ${articleId}, ${elem})`, (err, results) => {
                            if (err) {
                                return connection.rollback(function () {
                                    res.send("erreur lors de l'ajout de l'initiative").status(500);
                                });
                            }
                            else {
                                if (besoins.length != 0) {
                                    besoins.map((elem, index) =>
                                        connection.query(`INSERT INTO articles_has_besoins (articles_id, besoins_id) VALUES ( ${articleId}, ${elem})`, (err, results) => {
                                            if (err) {
                                                return connection.rollback(function () {
                                                    res.send("erreur lors de l'ajout du besoin").status(500);
                                                });
                                            }
                                            else {
                                                if (types_activites.length != 0) {
                                                    types_activites.map((elem, index) =>
                                                        connection.query(`INSERT INTO articles_has_types_activites (articles_id, types_activites_id) VALUES ( ${articleId}, ${elem})`, (err, results) => {
                                                            if (err) {
                                                                return connection.rollback(function () {
                                                                    res.send("erreur lors de l'ajout du types_activites").status(500);
                                                                });
                                                            }
                                                            else {
                                                                if (categories_objets.length != 0) {
                                                                    categories_objets.map((elem, index) =>
                                                                        connection.query(`INSERT INTO articles_has_categories_objets (articles_id, categories_objets_id) VALUES ( ${articleId}, ${elem})`, (err, results) => {
                                                                            if (err) {
                                                                                return connection.rollback(function () {
                                                                                    res.send("erreur lors de l'ajout de la categories_objets").status(500);
                                                                                });
                                                                            }
                                                                            else {
                                                                                if (categories_intermediaires.length != 0) {
                                                                                    categories_intermediaires.map((elem, index) =>
                                                                                        connection.query(`INSERT INTO articles_has_categories_intermediaires (articles_id, categories_intermediaires_id) VALUES ( ${articleId}, ${elem})`, (err, results) => {
                                                                                            if (err) {
                                                                                                return connection.rollback(function () {
                                                                                                    res.send("erreur lors de l'ajout du categories_intermediaires").status(500);
                                                                                                });
                                                                                            }
                                                                                            else {
                                                                                                if (objets.length != 0) {
                                                                                                    objets.map((elem, index) =>
                                                                                                        connection.query(`INSERT INTO articles_has_objets (articles_id, objets_id) VALUES ( ${articleId}, ${elem})`, (err, results) => {
                                                                                                            if (err) {
                                                                                                                return connection.rollback(function () {
                                                                                                                    res.send("erreur lors de l'ajout du objets").status(500);
                                                                                                                });
                                                                                                            }
                                                                                                            else {
                                                                                                                connection.commit(function (err) {
                                                                                                                    if (err) {
                                                                                                                        return connection.rollback(function () {
                                                                                                                            throw err;
                                                                                                                        });
                                                                                                                    }
                                                                                                                    res.send('giga query fonctionne').status(200)
                                                                                                                });

                                                                                                            }
                                                                                                        }))
                                                                                                }
                                                                                            }


                                                                                        }))
                                                                                }
                                                                            }
                                                                        }))
                                                                }
                                                            }
                                                        }))
                                                }
                                            }
                                        }))
                                }
                            }
                        }))
                }
            }
        })
    })
})



/////////////// créer un article informatif /////////////////
// post des données dans les input dans un tuple de la table article  ///  OK // bouton créer

router.post('/articles', (req, res) => {
    const postArticles = req.body.article
    const initiatives = req.body.initiatives
    const besoins = req.body.besoins
    const types_activites = req.body.types_activites
    const categories_objets = req.body.categories_objets
    const categories_intermediaires = req.body.categories_intermediaires
    const objets = req.body.objets
    console.log(postArticles);

    const tableBinding = (tab1, tab2, tab2value, id, lastTab) => {
        if (tab2value.length != 0) {
            tab2value.map((elem, index) =>
                connection.query(`INSERT INTO ${tab1}_has_${tab2} (${tab1}_id, ${tab2}_id) VALUES ( ${id}, ${elem})`, (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            res.send(`bug à l'ajout de ${elem} dans ${tab2}`).status(500)
                        });
                    }
                    else if (lastTab === 1) {
                        connection.commit(function (err) {
                            if (err) {
                                return connection.rollback(function () {
                                    res.send('ça bug');
                                });
                            }
                            res.send('success').status(200)  /// faut qu'on trouve un moyen de faire le res.status(200) après que les fonctions soient jouées
                        });
                    }
                }))
        }
    }

    connection.beginTransaction(function (err) {
        if (err) { throw err; }
        connection.query("INSERT INTO articles SET ? ", postArticles, (err, results) => {
            if (err) {
                return connection.rollback(function () {
                    throw err;
                });
            }
            else {
                const articleId = results.insertId

                tableBinding('articles', 'initiatives', initiatives, articleId, 0)
                tableBinding('articles', 'besoins', besoins, articleId, 0)
                tableBinding('articles', 'types_activites', types_activites, articleId, 0)
                tableBinding('articles', 'categories_objets', categories_objets, articleId, 0)
                tableBinding('articles', 'categories_intermediaires', categories_intermediaires, articleId, 0)
                tableBinding('articles', 'objets', objets, articleId, 1)


            }
        });
    });
});

/////////////////////// ESSAI TRANSCATION AVEC DES COMMITS A CHAQUE ETAGE /////////////////////////////
// connection.beginTransaction(function (err) {
//     if (err) { throw err; }
//     connection.query("INSERT INTO articles SET ? ", postArticles, (err, results) => {
//         if (err) {
//             return connection.rollback(function () {
//                 throw err;
//             });
//         }
//         const articleId = results.insertId
//         tableBinding('articles', 'initiatives', initiatives, articleId)
//         connection.commit(function (err) {
//             if (err) {
//                 return connection.rollback(function () {
//                     throw err;
//                 });
//             }
//             tableBinding('articles', 'besoins', besoins, articleId)
//             connection.commit(function (err) {
//                 if (err) {
//                     return connection.rollback(function () {
//                         throw err;
//                     });
//                 }
//                 tableBinding('articles', 'types_activites', types_activites, articleId)
//                 connection.commit(function (err) {
//                     if (err) {
//                         return connection.rollback(function () {
//                             throw err;
//                         });
//                     }
//                     tableBinding('articles', 'categories_objets', categories_objets, articleId)
//                     connection.commit(function (err) {
//                         if (err) {
//                             return connection.rollback(function () {
//                                 throw err;
//                             });
//                         }
//                         tableBinding('articles', 'categories_intermediaires', categories_intermediaires, articleId)
//                         connection.commit(function (err) {
//                             if (err) {
//                                 return connection.rollback(function () {
//                                     throw err;
//                                 });
//                             }
//                             tableBinding('articles', 'objets', objets, articleId)
//                             connection.commit(function (err) {
//                                 if (err) {
//                                     return connection.rollback(function () {
//                                         throw err;
//                                     });
//                                 }
//                                 res.status(200).send('success')  /// faut qu'on trouve un moyen de faire le res.status(200) après que les fonctions soient jouées
//                             });
//                         });
//                     });
//                 });
//             });
//         });



// connection.query("INSERT INTO articles SET ? ", postArticles, (err, results) => {
//     if (err) {
//         res.status(500).send("l'article n'a pas pu être créé")
//     } else {
//         const articleId = results.insertId
//         tableBinding('articles', 'initiatives', initiatives, articleId)
//         tableBinding('articles', 'besoins', besoins, articleId)
//         tableBinding('articles', 'types_activites', types_activites, articleId)
//         tableBinding('articles', 'categories_objets', categories_objets, articleId)
//         tableBinding('articles', 'categories_intermediaires', categories_intermediaires, articleId)
//         tableBinding('articles', 'objets', objets, articleId)
//         res.status(200).send('article créé')  /// faut qu'on trouve un moyen de faire le res.status(200) après que les fonctions soient jouées
//     }

// })
//     }
// )

//// afficher les objets et besoins dans les dropdown menu correspondants
// Get besoins et types d'activités //
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


// Get Catégories d'objets //
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


//// selectioner les critères à asssocier
// récupérer les articles selon les filtres sélectionnés //   // remplacer articles part initiatives et mettre des OR à la place des AND //
router.post('/filtre', (req, res) => {
    // const objectsList = req.body.objectsList
    // const besoinsList = req.body.besoinsList
    // console.log(req.body)
    // console.log(objectsList);
    // console.log(besoinsList);
    const liste = req.body
    liste.map(item => {
        if (item) {
            connection.query('SELECT articles.names, articles.publication FROM information_schema.tables ', item.table, (err, results) => {
                if (err) {
                    res.status(500).send('râté')
                } else {
                    res.status(200).send(results)
                }
            })
        }
    })
    connection.query('select * from articles', (err, results) => {
        if (err) {
            res.status(500).send('râté')
        } else {
            res.status(200).send(objectsList)
        }
    })
})    // à supprimer quand on va uncomment


//     objectsList.map(object => 

//         )
//     if(objectsList && besoinsList){
//         connection.query(
//             `SELECT besoins.besoins, articles.titre, articles.image, articles.id, categories_objets.categorie, types_activites.types_activites, objets.name, categories_intermediaires.name FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.catego  a v q0 ries_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id INNER JOIN types_activites ON types_activites.id = articles_has_types_activites.types_activites_id INNER JOIN articles_has_categories_intermediaires ON articles.id = articles_has_categories_intermediaires.articles_id INNER JOIN categories_intermediaires ON categories_intermediaires.id = articles_has_categories_intermediaires.categories_intermediaires_id INNER JOIN articles_has_objets ON articles.id = articles_has_objets.articles_id INNER JOIN objets ON objets.id = articles_has_objets.objets_id WHERE categories_objets.categorie = ? OR categories_intermediaires.name = ? OR objets.name = ? AND besoins.besoins = ? OR types_activites.types_activites = ? `,
//             [objectId,objectId, objectId, besoinId, besoinId] ,
//             (err, results) => {
//                 if (err) {
//                     console.log(err)
//                 res
//                     .status(500)
//                     .send(`Erreur lors de la récupération de la liste des users avec les 2 filtres !!`)
//                 } else {
//                 const filteredArticles = []
//                 results.map(article => {
//                     if (filteredArticles.length == 0) {

//                         const newArticle = {
//                             titre : article.titre,
//                             image : article.image,
//                             articleId : article.id 
//                         }
//                         filteredArticles.push(newArticle)
//                     }

//                     for (let i=0 ; i < filteredArticles.length ; ++i) {
//                         if (article.id != filteredArticles[i].articleId) {
//                             const newArticle = {
//                                 titre : article.titre,
//                                 image : article.image,
//                                 articleId : article.id 
//                             }
//                             filteredArticles.push(newArticle)
//                         }
//                     }
//                 })
//                 res.status(200).json(filteredArticles)
//             }
//             }
//         )
//     }
//     else if(besoinId){
//         connection.query(
//             `SELECT besoins.besoins, articles.titre, articles.image, articles.id, categories_objets.categorie, types_activites.types_activites, objets.name, categories_intermediaires.name FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.categories_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id INNER JOIN types_activites ON types_activites.id = articles_has_types_activites.types_activites_id INNER JOIN articles_has_categories_intermediaires ON articles.id = articles_has_categories_intermediaires.articles_id INNER JOIN categories_intermediaires ON categories_intermediaires.id = articles_has_categories_intermediaires.categories_intermediaires_id INNER JOIN articles_has_objets ON articles.id = articles_has_objets.articles_id INNER JOIN objets ON objets.id = articles_has_objets.objets_id WHERE besoins.besoins = ? ` ,
//            [besoinId],
//            (err, results) => {
//              if (err) {
//                res
//                  .status(500)
//                  .send(`Erreur lors de la récupération de la liste des users avec le filtre besoin/typesdactivites !!`)
//              } else {
//                 const filteredArticles = []
//                 results.map(article => {
//                     if (filteredArticles.length == 0) {

//                         const newArticle = {
//                             titre : article.titre,
//                             image : article.image,
//                             articleId : article.id 
//                         }
//                         filteredArticles.push(newArticle)
//                     }

//                     for (let i=0 ; i < filteredArticles.length ; ++i) {
//                         if (article.id != filteredArticles[i].articleId) {
//                             const newArticle = {
//                                 titre : article.titre,
//                                 image : article.image,
//                                 articleId : article.id 
//                             }
//                             filteredArticles.push(newArticle)
//                         }
//                     }
//                 })
//                 res.status(200).json(filteredArticles)
//                 }
//             }
//         )
//     }
//     else if(objectId){
//         connection.query(
//             ` SELECT besoins.besoins, articles.titre, articles.image, articles.id, categories_objets.categorie, types_activites.types_activites, objets.name, categories_intermediaires.name FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.categories_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id INNER JOIN types_activites ON types_activites.id = articles_has_types_activites.types_activites_id INNER JOIN articles_has_categories_intermediaires ON articles.id = articles_has_categories_intermediaires.articles_id INNER JOIN categories_intermediaires ON categories_intermediaires.id = articles_has_categories_intermediaires.categories_intermediaires_id INNER JOIN articles_has_objets ON articles.id = articles_has_objets.articles_id INNER JOIN objets ON objets.id = articles_has_objets.objets_id WHERE categories_objets.categorie = ? ` ,
//            [objectId],
//            (err, results) => {
//              if (err) {
//                res
//                  .status(500)
//                  .send(`Erreur lors de la récupération de la liste des users avec le filtre objet/catint/catobjet !!`)
//              } else {
//                 const filteredArticles = []
//                 results.map(article => {
//                     if (filteredArticles.length == 0) {

//                         const newArticle = {
//                             titre : article.titre,
//                             image : article.image,
//                             articleId : article.id 
//                         }
//                         filteredArticles.push(newArticle)
//                     }

//                     for (let i=0 ; i < filteredArticles.length ; ++i) {
//                         if (article.id != filteredArticles[i].articleId) {
//                             const newArticle = {
//                                 titre : article.titre,
//                                 image : article.image,
//                                 articleId : article.id 
//                             }
//                             filteredArticles.push(newArticle)
//                         }
//                     }
//                 })
//                res.status(200).json(filteredArticles)
//              }
//            }
//          )
//     }
//   })

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