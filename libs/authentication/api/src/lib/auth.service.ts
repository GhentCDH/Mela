import {Injectable} from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor( ) {}

    async validateUser(username: string, pass: string): Promise<any> {
             return {user: 'me'};

    }
}
