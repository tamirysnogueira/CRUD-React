const { Prisma } = require('@prisma/client')



function validationPrismaClient(error){
    if (error instanceof Prisma.PrismaClientValidationError) {
        return "Failed to create user because some datas are type wrong. Please check your input and try again."
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if(error.code === 'P2025'){
            return 'This user not exists'
        }

        if(error.code === 'P2002'){
            return 'This email are ready exists. Please, insert another email.'
        }
    }

}

module.exports = {
    validationPrismaClient
}