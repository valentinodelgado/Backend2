import UserRepository from "../../repositories/user.repository.js";
import CartManagerFs from "./carts.managers.js";
import { isValidPassword, createHash } from "../../utils/util.js";


const userRepository = new UserRepository()
const cartService = new CartManagerFs()

class UserManager{
    async registerUser(userData){
        const { user, email, last_name, age, password } = userData;
        const userExists = await userRepository.getUserByEmail(email)
        
        if(userExists) throw new Error("El usuario ya existe")

        const newCart = await cartService.createCart({products: []})
        if (!newCart) {
            return res.status(500).send("Error creando el carrito");
        }

        await userRepository.createUser({
            user,
            email,
            last_name,
            age,
            cartId: newCart._id,
            password: createHash(password)
        })
    }

    async loginUser(email,password){
        const user = await userRepository.getUserByEmail(email)
        if(!user || !isValidPassword(password,user)) throw new Error ("Credenciales incorrectas")
        return user
    }
}

export default UserManager