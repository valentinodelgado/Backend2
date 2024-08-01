import { Router } from "express";

const router = Router()

const users = [
    {id: "1", full_name: "user 1",email: "user1@gmail.com"  },
    {id: "2", full_name: "user 2",email: "user2@gmail.com"  },
    {id: "3", full_name: "user 3",email: "user3@gmail.com"  }
]

//render es el metodo para renderiza una plantilla

router.get("/", (req,res) => {
    const userLogin = {
        full_name: "Chelo",
        role: "admin"
    }

    res.render("layouts/index.handlebars", {
        user: userLogin,
        isAdmin: userLogin.role == "admin",
        users,
        title: "Home",
        styles: "styles.css"
    })
})

export default router