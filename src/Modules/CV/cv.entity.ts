import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn, ManyToOne} from "typeorm";
import { CURRENT_TIMESTAMP } from "src/utils/Constant/constant";
import { User } from "../Users/user.entity";

@Entity({name:'CV'})
export class CV{
    
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({nullable:false})
    fileUrl:string

    @CreateDateColumn({type:'timestamp' , default:()=>CURRENT_TIMESTAMP})
    createdAt:Date

    @ManyToOne(()=>User,(user)=>user.Cvs)
    applicant:User

}