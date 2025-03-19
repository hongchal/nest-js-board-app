import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new  Logger('BoardsController');
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoards(
        @GetUser() user: User
    ): Promise<Board[]> {
        this.logger.verbose(`User "${user.username}" retrieving all boards`);
        return this.boardsService.getAllBoards(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User
    ): Promise<Board> {
        this.logger.verbose(`User "${user.username}" creating a new board. Data: ${JSON.stringify(createBoardDto)}`);   
        return this.boardsService.createBoard(createBoardDto, user);  
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User   
    ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }   
    
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: BoardStatus
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }   

}
