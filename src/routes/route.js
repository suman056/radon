const express = require('express');

const underscore = require('underscore')
const movies=require('./../movieslist/movieslist')

const router = express.Router();



router.get('/films/:filmId', function(req, res){
    if(req.params.filmId>movies.filmlist.length){
        res.send('No movie exist with this Id')
    }
    for(let i=0;i<movies.filmlist.length;i++){
    if(req.params.filmId==i){
    res.send('the film is'+JSON.stringify(movies.filmlist[i]))
}
}

})

router.get('/films', function(req, res){
    let x=JSON.stringify(movies.filmlist)
    res.send(x)
});
router.get('/movies', function (req, res) {
    console.log('the movie names are' +JSON.stringify(movies.movielist))
    res.send('My third ever api!')
});
router.get('/movies/:indexNumber', function (req, res) {
    if(req.params.indexNumber>movies.movielist.length){
        res.send('invalid index number')
           console.log('error')
           
    }
    for (let i=0;i<movies.movielist.length;i++){
        if(req.params.indexNumber==i){
               
            res.send(movies.movielist)
            console.log( movies.movielist[req.params.indexNumber])
        }
    }
}
    
    
);
 
module.exports = router;
// adding this comment for no reason