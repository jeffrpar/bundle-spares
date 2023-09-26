import gql from 'graphql-tag';

export const QUERY_ME = gql`

query me {
    me {
      _id
      username
      email
      savedItems {
        _id
        name
        serialKey
        img
        stock
        category {
            category
        }
      }
      cart {
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
  }
`;


export const QUERY_ALL_ITEMS = gql`

query allItems {
    items {
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

export const QUERY_FIND_ITEM = gql`

query findItem($itemName: String!){
    item(itemName: $itemName) {
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

export const QUERY_ALL_CATEGORIES = gql`

query allCategories {
    category {
        _id
        category
    }
}
`;

export const QUERY_FIND_CATEGORIES = gql`

query findCategory($categoryName: String!){
    category(categoryName: $categoryName) {
        _id
        category
    }
}
`; 