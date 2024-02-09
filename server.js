var bodyParser = require('body-parser');
const express = require("express");
const app = express();
const port = 8080;
const {Pool} = require('pg');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.get("/", async (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
const pool = new Pool({
    user: 'root',
    host: 'postgres',
    database: 'root',
    password: 'root',
    port: 5432,
})
pool.connect().then(() => {
    pool.query('SELECT NOW()', (err, res) => {
      console.log(res.rows)
    });
  });
// async function createAlbumsTable() {
//     try {
//       const query = `
//         CREATE TABLE IF NOT EXISTS students (
//           id SERIAL PRIMARY KEY,
//           namee VARCHAR(255) NOT NULL,
//           password VARCHAR(255) NOT NULL,
//         );
//       `;
  
//       await pool.query(query);
//       console.log('Albums table created');
//     } catch (err) {
//       console.error(err);
//       console.error('Albums table creation failed');
//     }
//   }
  
//   createAlbumsTable();
// routes
var id=0;
app.get('/getstudents',(req,res)=>{
  pool.query('SELECT * from students', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});
app.post('/add', async (req, res) => {
    // Validate the incoming JSON data
    const namee=req.body.namee;
    const password=req.body.password;
    console.log(req.body);
    if (!namee || !password) {
      return res.status(400).send('One of the title, or artist, or price is missing in the data');
    }
    try {
      // try to send data to the database
      const query = `
        INSERT INTO students (namee, password)
        VALUES ($1,$2)
      `;
      console.log(query);
      const values = [namee, password];
        console.log(values);
        const result = await pool.query(query, values)
      res.status(201).send({ id: id+1 });
    } catch (err) {
      console.error(err);
      res.status(500).send('some error has occured');
    }
  });
app.listen(8080, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});