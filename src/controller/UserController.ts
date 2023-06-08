import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { firstName, lastName, age } = request.body;
      
        try {
            const user = await this.userRepository.findOne({
                where: { id }
            })
      
          if (!user) {
            return response.status(404).json({ message: 'User not found' });
          }
      
          user.firstName = firstName;
          user.lastName = lastName;
          user.age = age;
      
          await this.userRepository.save(user);
      
          return response.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
          return response.status(500).json({ message: 'Internal server error' });
        }
      }
      

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user does not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}