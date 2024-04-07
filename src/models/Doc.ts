import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Doc extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(() => User, (owner) => owner.docs)
    owner: User

    @Column()
    department: string

    @Column()
    language: string

    @CreateDateColumn()
    dateAdded: Date

    @UpdateDateColumn()
    dateUpdated: Date
}