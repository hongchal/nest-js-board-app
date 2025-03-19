import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC]

    transform(value: any, metadata: ArgumentMetadata) {
        console.log('value', value);
        console.log('metadata', metadata);

        if(!this.isStatusValid(value)) {
            throw new Error(`${value} is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.StatusOptions.indexOf(status);
        return idx !== -1;
    }
}