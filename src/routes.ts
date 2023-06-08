import { body, param } from "express-validator"
import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation:[]
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [
        param('id').isInt(),
    ]
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    validation: [
        body('firstName').isString(),
        body('lastName').isString(),
        body('age').isInt({ min: 0}).withMessage('not sure if this person can type if not older than 0 years old')
    ]
}, 
{
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update",
    validation: [
        body('firstName').isString(),
        body('lastName').isString(),
        body('age').isInt({ min: 0}).withMessage('not sure if this person can type if not older than 0 years old')
    ]
},
{
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    validation: [
        param('id').isInt()
    ]
}]