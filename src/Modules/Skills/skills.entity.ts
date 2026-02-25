import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn,ManyToOne } from "typeorm";
import { CURRENT_TIMESTAMP } from "src/utils/Constant/constant";
import { User } from "../Users/user.entity";

@Entity({name:'skills'})
export class Skill{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @CreateDateColumn({type:'timestamp' , default:()=>CURRENT_TIMESTAMP})
    createdAt:Date

    @CreateDateColumn({type:'timestamp' , default:()=>CURRENT_TIMESTAMP, onUpdate:CURRENT_TIMESTAMP})
    updatedAt:Date

    @ManyToOne(()=>User,(user)=>user.skills)
    user:User
}