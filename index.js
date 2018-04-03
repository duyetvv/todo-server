const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const Connection = require('./connection');

const con = new Connection()

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

router.route('/todos')
  .post((req, res) => {
    const todo = req.body;

    if (todo) {
      con.insertOne(todo).then(result => {
        res.json(result);
      }).catch(error => {
        res.json({ error: 1, msg: 'Add error' })
      });
    }
  })
  .get((req, res) => {
    con.getALl().then(todos => {
      res.json(todos);
    })
    .catch(error => {
      res.json([]);
    })
  });

router.route('/todos/:id')
  .delete((req, res) => {
    const id = req.params.id;

    con.deleteOne(id).then(result => {
      res.json(result);
    })
    .catch(error => {
      res.json({ error: 1, msg: 'Add error' })
    })
  })
  .post((req, res) => {
    const id = req.params.id;


  })

app.use('/api', router);

app.listen(80, () => {
  console.log('Example app listening on port 80!')
})
