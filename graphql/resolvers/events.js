const { dateToString } = require('../../helpers/date');
const { user } = require('./merge');
const Event = require('../../models/event');

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event._doc.creator)
    }
};

module.exports = {
    events: () => {
        return Event.find()
            .then(events => {
                return events.map(event => {
                    return transformEvent(event);
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
            date: dateToString(args.EventInput.date),
            creator: '5d0e9fa075983a0a70c0b8ef'
        })
        let createdEvent
        return event
            .save()
            .then(result => {
                createdEvent = transformEvent(result);
                return User.findById('5d0e9fa075983a0a70c0b8ef')
            })
            .then(user => {
                if (!user) {
                    throw new Error('User not found!');
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then(result => {
                return createdEvent;
            })
            .catch(err => {
                throw err;
            });
    }
}

exports.transformEvent = transformEvent;