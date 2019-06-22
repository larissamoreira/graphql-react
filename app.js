const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }
        
        type RootMutation {
            createEvent(EventInput: EventInput): Event
        }

        schema {
            query: RootQuery 
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find()
                .then(events => {
                    return events.map(event => {
                        return { ...event._doc, _id: event.id };
                    });
                })
                .catch(err => {
                    throw err;
                });
        },
        createEvent: args => {
            const event = new Event({
                title: args.EventInput.title,
                description: args.EventInput.description,
                price: +args.EventInput.price,
                date: new Date(args.EventInput.date)
            })
            return event
                .save()
                .then(result => {
                    console.log(result);
                    return { ...result._doc, _id: event.id };
                })
                .catch(err => {
                    console.log(err)
                    throw err;
                });
        }
    },
    graphiql: true
}));

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-q1b2l.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})