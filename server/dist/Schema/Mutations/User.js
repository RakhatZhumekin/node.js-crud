"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_USER = exports.UPDATE_PASSWORD = exports.CREATE_USER = void 0;
const User_1 = require("../TypeDefs/User");
const graphql_1 = require("graphql");
const Users_1 = require("../../Entities/Users");
const Messages_1 = require("../TypeDefs/Messages");
exports.CREATE_USER = {
    type: User_1.UserType,
    args: {
        name: { type: graphql_1.GraphQLString },
        userName: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, userName, password } = args;
            yield Users_1.Users.insert({ name, userName, password });
            return args;
        });
    },
};
exports.UPDATE_PASSWORD = {
    type: Messages_1.MessageType,
    args: {
        userName: { type: graphql_1.GraphQLString },
        currentPassword: { type: graphql_1.GraphQLString },
        newPassword: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, currentPassword, newPassword } = args;
            const user = yield Users_1.Users.findOne({ userName: userName });
            if (!user) {
                return new Error("USERNAME DOESN'T EXIST");
            }
            const userPassword = user === null || user === void 0 ? void 0 : user.password;
            if (currentPassword === userPassword) {
                yield Users_1.Users.update({ userName: userName }, { password: newPassword });
                return { successful: true, message: "PASSWORD UPDATED" };
            }
            else {
                throw new Error("PASSWORDS DO NOT MATCH");
            }
        });
    },
};
exports.DELETE_USER = {
    type: Messages_1.MessageType,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = args.id;
            yield Users_1.Users.delete(id);
            return { successful: true, message: "DELETE SUCCESSFUL" };
        });
    },
};
