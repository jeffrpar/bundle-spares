import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ITEM = gql`
    mutation addItem(
        # -----------------------------------------------
        $name: String!, 
        $serialKey: String!, 
        $img: String!, 
        $stock: Int!, 
        $category: String!) 
        # -----------------------------------------------
        {
        addItem(name: $name, serialKey: $serialKey, img: $img, stock: $stock, genre: $category) {
            _id
            name
            serialKey
            img
            stock
            category {
                category
            }
        }
    }
`;

export const ADD_TO_CART = gql`
    mutation AddToCart($id: ID!) {
      addToCart(_id: $id) {
        email
        username
        cart {
          _id
          name
        }  
      }
    }
`;

export const REMOVE_FROM_CART = gql`
    mutation RemoveCartItem($id: ID!) {
      removeCartItem(_id: $id) {
        cart {
          name
    }
  }
}
`;

export const SAVE_ITEM = gql`
    mutation SaveItem($id: ID!) {
      saveItem(_id: $id) {
        _id
        email
        username
        savedItems {
          _id
          name
        }
      }
  }
`;

export const REMOVE_SAVED_ITEM = gql`
    mutation RemoveSavedItem($id: ID!) {
      removeSavedItem(_id: $id) {
        savedItems {
          name
        }
      }
    }
`;

