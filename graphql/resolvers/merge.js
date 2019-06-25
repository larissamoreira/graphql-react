const Event = require('../../models/event');
const User = require('../../models/user');

const events = eventIds => {
    return Event.find({ _id: { $in: eventIds } })
        .then(events => {
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event.id,
                    creator: user.bind(this, event.creator)
                }
            })
        })
        .catch(err => {
            throw err;
        });
};

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event)
    } catch (err) {
        throw err;
    }
}

const user = userId => {
    return User.findById(userId)
        .then(user => {
            return {
                ...user._doc,
                _id: user.id,
                createdEvents: events.bind(this, user._doc.createdEvents)
            }
        })
        .catch(err => {
            throw err;
        });
}

exports.user = user;
exports.events = events;
exports.singleEvent = singleEvent;