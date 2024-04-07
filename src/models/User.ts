import { UserRole } from "../../types/userRole";
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

    @Column()
    role: UserRole

    @Column()
    department: string

    @Column()
    year: number

    @OneToMany(() => Doc, (doc) => doc.owner)
    docs: Doc[]

    @Column()
    dateOfBirth: Date

    @CreateDateColumn()
    dateAdded: Date

    @UpdateDateColumn()
    dateUpdated: Date

}