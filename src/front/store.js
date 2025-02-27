export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    posts: [

    ],
    user: null,
    token: null || localStorage.getItem('token') // busca si estamos logueados
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    
    case 'add_post':
      return {
        ...store,
        posts: [ action.payload, ...store.posts]
      };
    
    case 'assign_user':
      return {
        ...store,
        user: action.payload
      };

    case 'set_token':
      return {
        ...store,
        token: action.payload
      };

    case 'load_posts':
      return {
        ...store,
        posts: action.payload
      };

    case 'remove_task':
      return {
        ...store,
        todos: store.todos.filter((todo) => todo.id !== action.payload.id)
      };
    default:
      throw Error('Unknown action.');
  }    
}
