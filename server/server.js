require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'overview' });
const app = express();
const fetch = require('node-fetch');




app.use('/', express.static(__dirname + '/../public/dist'));
app.use('/restaurant/:rid', express.static(__dirname + '/../public/dist'));

app.get('/api/restaurant/:rid', function (req, res) {
    const id = parseInt(req.params.rid)
    fetch('http://ec2-3-17-6-2.us-east-2.compute.amazonaws.com:3000/api/restaurant/'+id)
    .then(data => data.json())
    .then(result => res.header(200).send(result))
    .catch(err => res.header(400).send(err))

});

app.listen(port, function() {
  console.log(`4Group Overview Module listening on port ${port}`);
});
