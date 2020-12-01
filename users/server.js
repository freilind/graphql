const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Listening in port:',PORT);
});
