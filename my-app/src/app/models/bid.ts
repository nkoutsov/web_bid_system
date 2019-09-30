import { User } from './user';

export class Bid {
    id: string;
    time: Date;
    amount: number;
    user: User;
}