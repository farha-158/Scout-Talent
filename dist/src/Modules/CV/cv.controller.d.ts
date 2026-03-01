import { CVService } from "./cv.service";
import type { JwtPayloadType } from "src/utils/type";
export declare class CVController {
    private cvService;
    constructor(cvService: CVService);
    uploadCV(user: JwtPayloadType, file: Express.Multer.File): Promise<{
        message: string;
        cvId: number;
    }>;
}
