import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { CURRENT_TIMESTAMP } from "src/utils/Constant/constant";
import { User } from "../Users/user.entity";

@Entity({name:'CV'})
export class CV{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    fileUrl:string

    @CreateDateColumn({type:'timestamp' , default:()=>CURRENT_TIMESTAMP})
    createdAt:Date

    @OneToOne(()=>User)
    @JoinColumn({name:'userId'})
    user:User
}