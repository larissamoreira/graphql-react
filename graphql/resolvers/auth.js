const bcrpyt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

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
    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrpyt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'somesupersecretkey',
            { expiresIn: '1h' }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 }
    }
}