import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { CreateBoardDto} from './dto/create-board.dto';
import { BoardStatus } from "./board.status.enum";
import { User } from "src/auth/user.entity";

@Injectable()    
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }   

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const {title, description} = createBoardDto;
        
        const board =  this.create({
            user,
            title,
            description,
            status: BoardStatus.PUBLIC,
        })

        await this.save(board);
        return board;
    }
}