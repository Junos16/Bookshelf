import { UserRole } from "../../types/userRole";
import { Department } from "../../types/department";
import { Year } from "../../types/year";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Doc } from "./Doc";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @Column({ default: UserRole.STUDENT })
    role: UserRole

    @Column()
    department: Department

    @Column()
    year: Year

    @OneToMany(() => Doc, (doc) => doc.owner, { eager: true })
    docs: Doc[]

    @CreateDateColumn()
    dateAdded: Date

    @UpdateDateColumn()
    dateUpdated: Date

}