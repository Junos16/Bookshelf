import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./User";
import { Department } from "../../types/department";
import { Year } from "../../types/year";

@Entity()
export class Doc extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(() => User, (owner) => owner.docs)
    owner: User

    @Column()
    department: Department

    @Column()
    year: Year

    @Column()
    language: string

    @CreateDateColumn()
    dateAdded: Date

    @UpdateDateColumn()
    dateUpdated: Date
}