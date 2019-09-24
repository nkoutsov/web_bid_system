export class Auction {
    id: string;
    name: string;
    active: boolean;

    // maybe create another class for category
    category: string[]; 

    currently: number;
    buy_price: number;
    first_bid: number;
    number_of_bids: number;
    
    // maybe create a class with longtitude and latitude
    location: string;
    country: string;
    started: Date;
    ends: Date;
    description: string;
    winner: string;
}