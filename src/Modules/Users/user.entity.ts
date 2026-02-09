import { CURRENT_TIMESTAMP } from "src/utils/Constant/constant";
import { RoleUser } from "src/utils/Enums/user.enum";
import { Column, CreateDateColumn, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    @Column({type:'enum',enum:RoleUser ,default:RoleUser.APPLICANT})
    role:RoleUser
    
    @Column({default:false})
    isAccountVerified:boolean

    @Column({ nullable:true })
    verificationToken :string
    
    @Column({nullable:true})
    resetPasswordToken: string

    @CreateDateColumn({type:'timestamp' , default:()=>CURRENT_TIMESTAMP})
    createAt:Date
}