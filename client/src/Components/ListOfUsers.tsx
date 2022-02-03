import React from 'react';
import {GET_ALL_USERS} from '../GraphQL/Queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../GraphQL/Mutations';

function ListOfUsers() {
    const {data} = useQuery(GET_ALL_USERS);

    const [deleteUser, {error}] = useMutation(DELETE_USER);

    return ( 
        <div>
            {data && 
                data.getAllUsers.map((user: any) => {
                    return ( 
                        <div> 
                            {user.name} / {user.userName} 
                            <button onClick={ 
                                () => {deleteUser({variables: {id: user.id}})}}>
                                    Delete User
                            </button>
                        </div> 
                    );
            })}
        </div>
    )
}

export default ListOfUsers;
