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

// post des données dans les input dans un tuple de la table article
router.post('/articles', (req, res) => {
    const postArticles = req.body
    connection.query("INSERT INTO articles SET ? ", postArticles, (err, results) => {
        if (err) {
            res.status(500).send("l'aticle n'a pas pu être créé")
        } else {
            res.json(results)
        }
    })
    }
)







module.exports = router