import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "./user.entity";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()    
export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }   

    async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = AuthCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);   
        const user = this.create({ username, password: hashedPassword });

        try{
            await this.save(user);
        } catch(error) {
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username already exists');
            } else {
            throw new InternalServerErrorException()
            }
        }
    }   
}