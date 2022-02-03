import { UserType } from "../TypeDefs/User";
import { GraphQLID, GraphQLString } from "graphql";
import { Users } from "../../Entities/Users";
import { MessageType } from "../TypeDefs/Messages";

export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        userName: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent:any, args:any) {
        const {name, userName, password} = args;
        await Users.insert({name, userName, password});
        return args;
    },
};

export const UPDATE_PASSWORD = {
    type: MessageType,
    args: {
        userName: { type: GraphQLString },
        currentPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
    },
    async resolve(parent:any, args:any) {
        const { userName, currentPassword, newPassword } = args;
        const user = await Users.findOne({userName: userName});

        if (!user) {
            return new Error("USERNAME DOESN'T EXIST");
        }

        const userPassword = user?.password;

        if (currentPassword === userPassword) {
            await Users.update({userName: userName}, {password: newPassword});
            return {successful:true, message: "PASSWORD UPDATED"};
        }
        else {
            throw new Error("PASSWORDS DO NOT MATCH");
        }
    },
}

export const DELETE_USER = {
    type: MessageType,
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent:any, args:any) {
        const id = args.id;
        await Users.delete(id);

        return {successful:true, message: "DELETE SUCCESSFUL"};
    },
};