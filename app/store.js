const configureStore = require("@reduxjs/toolkit").configureStore;
const reduxLogger = require("redux-logger");
const cakeReducer = require("./features/cake/cakeSlice");
const iceCreamReducer = require("./features/icecream/iceCreamSlice");
const UserReducer = require('./features/user/UserSlice')

const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: iceCreamReducer,
    user : UserReducer
  },

    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

module.exports = store;
