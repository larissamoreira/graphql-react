const bcrpyt = require('bcryptjs');
const User = require('../../models/user');

module.exports = {
    createUser: args => {
        return User.findOne({ email: args.UserInput.email })
            .then(user => {
                if (user) {
                    throw new Error('User exists already!');
                }
                return bcrpyt.hash(args.UserInput.password, 12)
            })
            .then(hashedPassword => {
                const user = new User({
                    email: args.UserInput.email,
                    password: hashedPassword
                });
                return user.save();
            })
            .then(result => {
                return { ...result._doc, password: null, _id: result.id };
            })
            .catch(err => {
                throw err;
            })
    },
}