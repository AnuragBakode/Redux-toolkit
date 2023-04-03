const redux = require("redux");
const produce = require("immer").produce;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
};

const restockCake = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};

const orderIcecream = () => {
  return {
    type: ICECREAM_ORDERED,
    payload: 1,
  };
};

const restockIcecream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
};

const cakeState = {
  numOfCakes: 10,
};

const icecreamState = {
  numOfIcecreams: 20,
};

const cakeReducer = (state = cakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };

    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = icecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      //   return {
      //     ...state,
      //     numOfIcecreams: state.numOfIcecreams - action.payload,
      //   };

      // Immer is used  to  simplyfy the nested state ex = draft.address.street
      return produce(state, (draft) => {
        draft.numOfIcecreams = state.numOfIcecreams - action.payload;
      });

    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      };

    case CAKE_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer,
});

const store = createStore(rootReducer);
console.log("Initial state ", store.getState());
const unsubscribe = store.subscribe(() => {console.log(store.getState())});
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3))

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
store.dispatch(orderIcecream());
store.dispatch(orderIcecream());
store.dispatch(restockIcecream(10));
unsubscribe();
