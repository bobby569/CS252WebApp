const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

// add more Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existUser = await User.findOne({ googleID: profile.id });
			if (existUser) return done(null, existUser);

			const { givenName, familyName } = profile.name;
			const name = `${givenName[0]} ${familyName}`;
			const user = await new User({
				googleID: profile.id,
				name,
				phone: profile.photos[0].value,
				date: new Date()
			}).save();
			done(null, user);
		}
	)
);
