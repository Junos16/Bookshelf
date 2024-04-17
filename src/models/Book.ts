import { Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryColumn } from "typeorm";
import { Department } from "../../types/department";

@Entity()
export class Book extends BaseEntity {
    @PrimaryColumn()
    isbn: number

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    publisher: string

    @Column()
    language: string

    @Column()
    department: Department

    @Column()
    dateReleased: Date

    @Column()
    edition: number

    @Column()
    filename: string;

    @Column()
    filepath: string;

    @CreateDateColumn()
    dateAdded: Date

    @UpdateDateColumn()
    dateUpdated: Date
}