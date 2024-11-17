import  bcrypt  from "bcrypt";

const salt = 10

export function hashPassword(password:string) {
    return bcrypt.hashSync(password,salt)
}

export function comparePassword(password:string,hashedPassword:string) {
    return bcrypt.compare(password,hashedPassword)
}