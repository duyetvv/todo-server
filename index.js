const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = require('./connection');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

let data = [
  { id: 0, name: 'duyet', status: true },
  { id: 1, name: 'duyet1', status: false }
];

router.get('/', (req, res) => {

})

router.route('/todos')
  .post((req, res) => {
    const todo = req.body;
    let result = { error: 1, msg: 'Add error' };

    if (todo) {
      data.push(todo);
      result = todo;
    }

    res.json(result);
  })
  .get((req, res) => {
    res.json(data);
  });

router.route('/todos/:id')
.delete((req, res) => {
  console.log(req.params.id)
  const index = data.findIndex(ele => ele.id === parseInt(req.params.id));
  let result = {
    status: 0,
    msg: `Can\'t delete the todo with id = ${req.params.id}`
  }
  console.log(index)
  if (index !== -1) {
    data.splice(index, 1);
    result = {
      status: 1,
      msg: `Removed the todo with id = ${req.params.id}`
    }
  }

  console.log(data.length);
  res.json(result);
});

app.use('/api', router);

app.listen(80, () => {
  console.log('Example app listening on port 80!')
})
