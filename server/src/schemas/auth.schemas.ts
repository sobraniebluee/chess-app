import {checkSchema} from "express-validator";

export const reginSchemaValidator = checkSchema({
    email: {
        notEmpty: { errorMessage: "EMPTY_EMAIL" },
        isEmail: { errorMessage: "VALID_EMAIL" },
    },
    first_name: {
        notEmpty: { errorMessage: "Please enter first name!" }
    },
    second_name: {
        notEmpty: { errorMessage: "Please enter second name!" }
    },
    username: {
        notEmpty: { errorMessage: "Please enter username!" }
    },
    password: {
        notEmpty: { errorMessage: "Please enter password" },
        isLength: { errorMessage: "Password must contain min 8 chars!", options: {min: 8} }
    }
});

export const loginSchemaValidator = checkSchema({
    email: {
        notEmpty: {errorMessage: "Please enter email!"},
    },
    password: {
        notEmpty: {errorMessage: "Please enter password!"}
    }
})


