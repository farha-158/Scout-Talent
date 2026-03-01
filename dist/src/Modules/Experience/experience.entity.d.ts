import { User } from "../Users/user.entity";
export declare class Experience {
    id: number;
    title: string;
    company: string;
    startDate: Date;
    endDate: Date;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
