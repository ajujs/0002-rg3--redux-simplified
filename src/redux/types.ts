

export type Reducer<T> = (state: State<T>, action: Action) => State<T>;

export interface Action {
  type: string,
  payload?: any,
};

export type State<T> = T;

export interface Store<T> {
  subscribe(listener: Function): void,
  getState(): State<T>,
  dispatch(action:Action): void,
}

export interface Listener extends Function { };


export interface Product {
  id: number,
  price: number,
  title: string,
}

export interface CartState {
  products: Product[],
  cart: Product[],
}