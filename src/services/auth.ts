import { databaseService } from ".";
import { userDto } from "../dto/user";
import bcrypt from "bcrypt"
import jwt, {} from 'jsonwebtoken'

export class AuthenticationService {
    private readonly saltRounds = 8;
    private readonly secretKey: string;

    constructor() {
        this.secretKey = process.env.SECRET_KEY || 'default_secret_key';
    }

    public verify(token: string) {
        return jwt.verify(token, this.secretKey)
    }

    public async register(user: userDto) {
        user.password = await bcrypt.hash(user.password, this.saltRounds);
        await databaseService.createUser(user)
    }

    public async login(email: string, password: string) {
        const user = await databaseService.getUser(email);
        if(!user || !bcrypt.compareSync(password, user.password))
            throw new Error("invalid email or password")
        const token = jwt.sign({email: user.email.toString()}, this.secretKey , {
            expiresIn: '2 days'
        });
        return {user, token};
    }
}