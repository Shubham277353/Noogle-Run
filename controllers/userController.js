import { prisma } from '../lib/prisma.js';


function getSignUpForm(req, res) {
    res.render("signup");
}

async function  postSignupForm(req, res) {
    const hashedPassword = bcrypt
    try{
        const user = prisma.user.create({
            data: {
                username: "GoluBoi1",
                email: "goluboi@gmail.com"

            }
        })
    }
    
}

export { getSignUpForm, postSignupForm};