const { Prisma } = require('@prisma/client')
const argon2 = require('argon2')

function validationPrismaClient(error){
    if (error instanceof Prisma.PrismaClientValidationError) {
        return "Failed to create user because some datas are type wrong or is missing field. Please check your input and try again."
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if(error.code === 'P2025'){
            return 'This user not exists'
        }

        if(error.code === 'P2002'){
            return 'This email are ready exists. Please, insert another email.'
        }
    }

    return 'Error'

}

function hasEmptyValues(data){
    const emptyValue =  Object.values(data).every(value => String(value).trim() !== '')

    const validEmail = () => {
        if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            return false
        }

        return true
    }

    if(!emptyValue || !validEmail()){
        return false
    }

    return true
    
}

async function userAndPasswordExist(user, password){
    if(!user) throw new Error("User not found")

    const passwordAndUserMatch = await argon2.verify(user.password, password)

    if(!passwordAndUserMatch) throw new Error("The password don't match with the email")

    return
}

async function verifyAdmin(email){
    if(email === 'admin@hotmail.com'){
        return true
    }

    return false
}

module.exports = {
    validationPrismaClient,
    hasEmptyValues,
    userAndPasswordExist,
    verifyAdmin
}