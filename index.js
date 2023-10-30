// Gregory Tomchuk, Web Development Periods 7-8 Even, Due on 2/2/23.

/* Tools: code editor, browser, command line utility, 
application and server utility, API platform
*/

const http = require('http');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: "Pop"},
    {id: 2, name: "Hip Hop"},
    {id: 3, name: "Rap"},
    {id: 4, name: "Classical"},
    {id: 5, name: "Rock"},
    {id: 6, name: "Jazz"},
    {id: 7, name: "Blues"},
    {id: 8, name: "Electronic"},
];

app.listen(3000, () => {
    console.log('Listening on port 3000 ...');
})

//=========== ROUTES FOR HTTP GET REQUESTS ==========

app.get('/api/genres', (req,res)=>{
    res.send(genres);
});

app.get('/api/genres/:id', (req,res)=>{
    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if (!genre){
        res.status(404).send("The genre with the given ID was not found.");
        return;
    }
    res.send(genre);
});


//=========== ROUTES FOR HTTP POST REQUESTS ==========

app.post('/api/genres', (req,res) => {
    if (Object.values(req.body)[0].length >= 3) {
        const genre = {
            id: genres.length +1,
            name:req.body.name
        }
        genres.push(genre);
        res.send(genre);
        return 200;
    }
    else {
        res.status(404).send("Name is required and should be a minimum of three characters.");
        return;
    }   
});


//=========== ROUTES FOR HTTP PUT REQUESTS ==========

app.put('/api/genres/:id', (req,res)=>{
    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send("The genre with the given ID was not found.");
        return;
    }
    else if (Object.values(req.body)[1].length >= 3){
        const newGenre ={
            id: req.params.id,
            name:req.body.name    
        }
        const num = genres.indexOf(genre);
        genres[num] = newGenre;
        res.send(newGenre);
        return 200;
    }
    else {
        res.status(404).send("Name is required and should be a minimum of three characters.");
        return;
    }
});


//=========== ROUTES FOR HTTP DELETE REQUESTS ==========

app.delete('/api/genres/:id', (req,res)=>{
    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send("The genre with the given ID was not found");
        return;
    }
    else {
        const num = genres.indexOf(genre)
        genres.splice(num);
        res.send(genre);
        return 200;
    }
});

/* Reflection
    1) The POSTMAN app communicates with the local host from my JavaScript express.
    2) One thing I learned in this project is using HTTP requests and using an app like POSTMAN.
    3) One thing I can do to advance this project is build the front end of the music app.
*/