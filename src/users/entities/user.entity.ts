import { Role } from "src/common/enums/rol.enums"
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    Name: string

    @Column({nullable: false})
    Email: string

    @Column({nullable: false})
    Password: string

    @Column({type: 'enum',  default: Role.USER , enum: Role })
    rol: Role

    @DeleteDateColumn()
    deleteAt: Date
}
