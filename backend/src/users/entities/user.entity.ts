import { Role } from "src/common/enums/rol.enums"
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    password: string

    @Column({type: 'enum',  default: Role.USER , enum: Role })
    rol: Role

    @DeleteDateColumn()
    deleteAt: Date
}
