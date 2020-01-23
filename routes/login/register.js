const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const connection = require('../../conf')

const router = express.Router()

/**
 * Route de register d'un utilisateur
 */

router.post('/', (req, res) => {

    /**
     * Verification du format de l'email fournit.
     */

    const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    if (!emailRegEx.test(req.body.email)) { //on test l'email fournit avec la regex 'emailRegEx'
        return res.status(401).send('Unauthorized user')
    }

    /**
     * Creation de l'utilisateur a rentrer en base
     */

    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password) //on chiffre le mot de passe grace a bcrypt
    }
    console.log(user)
    /**
     * Verification de l'absence de l'utilisateur dans la base
     */

    connection.query(`SELECT id FROM userbase WHERE email = ?`, user.email, (err, result) => {
        if (err) {
            return res.status(500).send('internal server error')
        }

        else if (result.length > 0) {
            return res.status(409).send('User already exists') // si on a un resultat, l'email est deja enregistre on renvoie une 409
        }

        /**
         * Insertion de l'utilisateur en base
         */

        connection.query(`INSERT INTO userbase (email, password) VALUES ( ?, ? )`, [user.email, user.password], (err, result) => {
            if (err) {
                return res.status(500).send('Cannot register the user')
            }

            /**
             * Renvoie de l'utilisateur enregistre au front
             */

            connection.query(`SELECT email FROM userbase WHERE id =?`, result.insertId, (err, result) => { //on ne renvoie JAMAIS le mot de passe au front.
                if (err) {
                    return res.status(500).send('Internal server error at the end')
                }
                res.status(200).send(result)
            })
        })
    })
})

module.exports = router