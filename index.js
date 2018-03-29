const express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

let data = [
  { id: 0, name: 'duyet', status: true },
  { id: 1, name: 'duyet1', status: false }
]

router.get('/', (req, res) => res.send('Hello world server!'))

router.route('/todos')
  .post((req, res) => {
    console.log(req)
    const todo = req.body;
    let result = { error: 1, msg: 'Add error' };

    if (todo) {
      data.push(todo);
      result = todo;
    }

    res.json(result);
  })
  .get((req, res) => {
    console.log('GET');
    console.log(req)
    res.json(data);
  })
  .delete((req, res) => {
    console.log('DELETE')
    console.log(req)
    res.json({
      status: 1,
      msg: 'delete success'
    })
  })

router.route('/todos/:id')
.delete((req, res) => {
  console.log()
})

app.use('/api', router);

app.listen(80, () => console.log('Example app listening on port 80!'))
