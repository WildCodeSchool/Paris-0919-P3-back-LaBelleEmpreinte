const express = require("express")
const connection = require('../../conf')

const router = express.Router()

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

// code non terminé //
router.post('/filtre', (req, res) => {
    const objectId = req.body.objectId
    const besoinId = req.body.besoinId
    console.log(req.body)
    if(objectId && besoinId){
        connection.query(
            `SELECT besoins.besoins, articles.titre, articles.image, articles.id, categories_objets.categorie, types_activites.types_activites, objets.name, categories_intermediaires.name FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.categories_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id INNER JOIN articles_has_types_activites ON articles_has_types_activites.articles_id = articles.id INNER JOIN types_activites ON types_activites.id = articles_has_types_activites.types_activites_id INNER JOIN articles_has_categories_intermediaires ON articles.id = articles_has_categories_intermediaires.articles_id INNER JOIN categories_intermediaires ON categories_intermediaires.id = articles_has_categories_intermediaires.categories_intermediaires_id INNER JOIN articles_has_objets ON articles.id = articles_has_objets.articles_id INNER JOIN objets ON objets.id = articles_has_objets.objets_id WHERE categories_objets.categorie = ? OR categories_intermediaires.name = ? OR objets.name = ? AND besoins.besoins = ? OR types_activites.types_activites = ? `,
            
           [objectId,objectId, objectId, besoinId, besoinId] ,
           (err, results) => {
             if (err) {
                 console.log(err)
               res
                 .status(500)
                 .send(`Erreur lors de la récupération de la liste des users !!`)
             } else {
                const filteredArticles = results.map(article => {
                    for (let i=0 ; i < filteredArticles.lenght ; i++) {
                        if (article.id != filteredArticles.newArticle[i].id) {
                            const newArticle = {
                                titre : article.titre,
                                image : article.image,
                                id : article.id
                            }
                            filteredArticles.push(filteredArticles)
                        }
                    }
                })
               res.status(200).json(results)
             }
           }
         )
    }
    else if(besoinId){
        connection.query(
            ` SELECT besoins.besoins, articles.titre, articles.image, articles.id, categories_objets.categorie FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.categories_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id WHERE besoins.besoins = ? ` ,
           [besoinId],
           (err, results) => {
             if (err) {
               res
                 .status(500)
                 .send(`Erreur lors de la récupération de la liste des users !!`)
             } else {
               res.status(200).json(results)
             }
           }
         )  
    }
    else if(objectId){
        connection.query(
            ` SELECT besoins.besoins, articles.titre, articles.image, articles.id, categories_objets.categorie FROM articles_has_categories_objets INNER JOIN categories_objets ON articles_has_categories_objets.categories_objets_id = categories_objets.id INNER JOIN articles on articles.id = articles_has_categories_objets.articles_id INNER JOIN articles_has_besoins INNER JOIN besoins ON articles_has_besoins.besoins_id = besoins.id WHERE categories_objets.categorie = ? ` ,
           [objectId],
           (err, results) => {
             if (err) {
               res
                 .status(500)
                 .send(`Erreur lors de la récupération de la liste des users !!`)
             } else {
               res.status(200).json(results)
             }
           }
         )

    }
    
  })

module.exports = router