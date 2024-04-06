import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity()
export class Doc extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: "cancert" })
    title: string

    @Column({ default: "cancer" })
    author: string

    @Column({ default: "cencer" })
    department: string

    @Column({ default: "ccner" })
    language: string

    @CreateDateColumn()
    dateAdded: Date

    @UpdateDateColumn()
    dateUpdated: Date
}