// happens once for each login
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

// happens on every request
passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({
        username
    }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return next(null, false, {
                message: "Incorrect username or password"
            });
        }

        return next(null, user);
    });
}));