const ExpressCassandra = require('express-cassandra');
const models = ExpressCassandra.createClient({
    clientOptions: {
        contactPoints: ['127.0.0.1'],
        protocolOptions: { port: 9042 },
        keyspace: 'overview',
        queryOptions: {consistency: ExpressCassandra.consistencies.one}
    },
    ormOptions: {
        defaultReplicationStrategy : {
            class: 'SimpleStrategy',
            replication_factor: 1
        },
        migration: 'safe',
    }
});

var listModel = models.loadSchema('posts', {
    fields:{
        id:"int",
        name: "text",
        description: "text",
        photos: "text",
        tags: "text",
        cuisines: "text",
        reviews: "text",
        priceStart: "text",
        priceEnd: "text",
    },
    key:["id"]
});

// MyModel or models.instance.Person can now be used as the model instance
console.log(models.instance.posts === listModel);

// sync the schema definition with the cassandra database table
// if the schema has not changed, the callback will fire immediately
// otherwise express-cassandra will try to migrate the schema and fire the callback afterwards
listModel.syncDB(function(err, result) {
    if (err) throw err;

    console.log(result);
    // result == true if any database schema was updated
    // result == false if no schema change was detected in your models


    // COPY overview.posts (id,name,description,photos,tags,cuisines,reviews,"priceStart","priceEnd") FROM '/home/basti/overview-module/database/files/data.csv' WITH DELIMITER = "|" AND  HEADER = TRUE;

});