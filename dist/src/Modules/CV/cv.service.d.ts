import { CV } from "./cv.entity";
import { Repository } from "typeorm";
import { UserService } from "../Users/user.service";
export declare class CVService {
    private cvRepository;
    private userService;
    constructor(cvRepository: Repository<CV>, userService: UserService);
    uploadCV(userId: number, fileUrl: string): Promise<{
        message: string;
        cvId: number;
    }>;
    findCV(id: number): Promise<CV | null>;
}
