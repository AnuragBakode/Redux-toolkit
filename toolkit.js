const store = require("./app/store");
const cakeActions = require("./app/features/cake/cakeSlice").cakeActions;
const icecreamActions = require("./app/features/icecream/iceCreamSlice");
const fetchUsers = require("./app/features/user/UserSlice").fetchUsers;

console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.restocked(3));
// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.restocked(5));

store.dispatch(fetchUsers());

// unsubscribe();
