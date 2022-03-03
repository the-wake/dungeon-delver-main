import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      campaigns {
        name
        is_active
        dungeons {
          name
        }
      }
    }
  }
`;