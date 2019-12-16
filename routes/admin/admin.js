const express = require('express')
const connection = require('../../conf')

const router = express.Router()

// route qui complète le dropdown menu des noms de table
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







module.exports = router