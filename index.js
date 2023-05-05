import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

// Creation de l'application ........................................

const app = express()
const PORT =  process.env.PORT || 6001 ;
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Activation des modules ...........................................
// Lancement de l'application .......................................

app.listen(PORT, ()=> console.log(`Le serveur fonctionne à l'adresse http://localhost:${PORT}`))


// Connection à la db

const db = mysql.createConnection({
    host: "mysql-electionageis.alwaysdata.net",
    user: "279238_mignane",
    password: "passer123456",
    database: "electionageis_owasp"
  })
  db.connect((err) =>{
      if(err) throw err
      console.log("Connexion DB: OK")
  })

  // Les routes disponibles .................................................
app.get('/',(request,response)=>{
    db.query('SELECT * FROM membrepersonnel', (err,result)=>{
      if(err) throw err
      response.send(result)
  })
  })
  app.get('/:username',(request,response)=>{
    let values = [
      [request.params.username]
  ]
    db.query('SELECT * FROM membrepersonnel where id=?',[values], (err,result)=>{
      if(err) throw err
      response.send(result)
  })
  })