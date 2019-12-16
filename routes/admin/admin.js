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