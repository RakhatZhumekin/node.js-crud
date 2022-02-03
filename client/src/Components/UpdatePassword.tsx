import React from 'react';
import { useState } from 'react';
import { UPDATE_PASSWORD } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';

export function UpdatePassword() {
    const [userName, setUserName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const[updatePassword, {error}] = useMutation(UPDATE_PASSWORD);

    if (error) {
        return <h1>{error}</h1>;
    }
    return (
        <div>
            <input type="text" placeholder='Username...' 
                onChange={(event) => {setUserName(event.target.value)}}/>
            <input type="password" placeholder='Current Password...'
                onChange={(event) => {setCurrentPassword(event.target.value)}}/>
            <input type="password" placeholder='New Password...'
                onChange={(event) => {setNewPassword(event.target.value)}}/>

            <button 
                onClick={() => updatePassword(
                    {variables: 
                        {userName: userName, 
                        currentPassword: currentPassword, 
                        newPassword: newPassword} 
                    })}>
                    Update Password
            </button>
        </div>
    );
}

export default UpdatePassword;
