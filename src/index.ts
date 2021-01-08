import { render } from './helpers'
import { createStore } from './redux';
import { Reducer, CartState, State } from './redux/types';

import productsList from './products';

const INITIAL_STATE: CartState = {
  products: productsList,
  cart: [],
}

const cardReducer: Reducer<CartState> = (state = INITIAL_STATE, action) => {
  const { type, payload } = action; 
  switch (type) {
    case '@cart/ADD':
      return {
        ...state,
        cart: [
          ...state.cart,
          payload,
        ]
      }
    default:
      return state;
  }
} 

// typescript generics

const store = createStore<CartState>(cardReducer);

type Props = State<CartState>;

const titulo = (state:Props) => `
  <div>
    <h1>Carrinho de Compras</h1>
  </div>
`

const produtos = (state:Props) => `
  <div>
    <h2>Produtos</h2>
    <ul>
      <li>Sabão em pó R$ 10 <button>Add ao carrinho</button></li>
      <li>Sabão em pó R$ 10 <button>Add ao carrinho</button></li>
      <li>Sabão em pó R$ 10 <button>Add ao carrinho</button></li>
      <li>Sabão em pó R$ 10 <button>Add ao carrinho</button></li>
      <li>Sabão em pó R$ 10 <button>Add ao carrinho</button></li>
      <li>Sabão em pó R$ 10 <button>Add ao carrinho</button></li>
      <li>Sabão em pó R$ 10 <button>Add ao carrinho</button></li>
    </ul>
  </div>
`

const carrinho = (state:Props) => `
  <div>
    <h2>Carrinho</h2>
    <h4>Total de items: ${state.cart.length}</h4>
    <h4>Items</h4>
    ${state.cart.length === 0 ?
      `Carrinho vazio` :
      `<ul>
        ${state.cart.map(product => 
          `<li>${product.title} R$ ${product.price} <button>Remover do carrinho</button></li>`
        )}
      </ul>`
    }
    
    <h3>Total: R$ ${state.cart.reduce((prev, curr)=> prev + curr.price, 0)}</h3>
  </div>
`

store.subscribe((state) => render(`
  ${titulo(state)}
  ${produtos(state)}
  ${carrinho(state)}
`));
