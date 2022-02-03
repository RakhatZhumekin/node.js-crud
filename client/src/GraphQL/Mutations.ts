import {gql} from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser(
        $name: String!
        $userName: String! 
        $password: String!
        ) {
        createUser(
            name: $name 
            userName: $userName 
            password: $password
            ) {
                id
                name
                userName
            }
        }
`;

export const DELETE_USER = gql`
    mutation deleteUser(
        $id: ID!
        ) {
        deleteUser(
            id: $id
            ) {
                message
            }
        }
`;

export const UPDATE_PASSWORD = gql`
    mutation updatePassword(
        $userName: String!
        $currentPassword: String!
        $newPassword: String!
        ) {
        updatePassword(
            userName: $userName
            currentPassword: $currentPassword
            newPassword: $newPassword
            ) {
                message
            }
        }
`;