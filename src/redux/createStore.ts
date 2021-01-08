import { Reducer, Action, State, Store, Listener } from './types';

/*
O que um reducer?

  Reducer é uma funcao pura, que de aconto com o tipo de evento, ele retorna um mesmo dado.
  Recebe como entrada sempre duas coisas:
  - State
  - Action (Evento)
    - type: "string" // "CART-ADD"
    - payload: ""    //  123
*/

// 

function createStore<T>(reducer: Reducer<T>): Store<T> {
  let state: State<T>;
  let listeners: Listener[] = [];

  function subscribe(listener: Listener) {
    listener(state);
    listeners.push(listener);
  }

  const dispatch = (action: Action) => {
    console.info("STORE_DISPATCH: " + action.type);
    state = reducer(state, action);
    listeners.forEach((fn) => fn(state));
  }

  const getState = () => state;

  dispatch({
    type: "@INIT"
  });

  return {
    subscribe,
    dispatch,
    getState,
  }
}

export default createStore;