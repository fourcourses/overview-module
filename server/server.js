require('newrelic');
const express = require('express');
// const bodyParser = require('body-parser');
const port = 3000;
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'overview' });
const app = express();


// app.use(express.urlencoded());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));


app.use('/', express.static(__dirname + '/../public/dist'));
app.use('/restaurant/:rid', express.static(__dirname + '/../public/dist'));

app.get('/api/restaurant/:rid', function (req, res) {
    const id = parseInt(req.params.rid)
    client.execute('SELECT * FROM posts where id = ? limit 1',[id], {prepare: true}, (err, result) => {
        if(err)
          res.header(400).send(err);

        res.header(200).send(result.rows[0])
    })

});

app.listen(port, function() {
  console.log(`4Group Overview Module listening on port ${port}`);
});
