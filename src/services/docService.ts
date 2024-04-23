import { AppDataSource } from "../config/data-source";
import { Doc } from "../models/Doc";
import { UpdateResult } from "typeorm";

export class DocService {
    private docRepository = AppDataSource.getRepository(Doc);

    async createDoc(docData: Partial<Doc>): Promise<Doc> {
        const newDoc = this.docRepository.create(docData);
        return await this.docRepository.save(newDoc);
    }

    async getDocByID(docID: number): Promise<Doc | null> {
        return await this.docRepository.findOneBy({ id: docID });
    }
    
    async getDocs(
        filterByKey?: string, 
        filterByValue?: string | number,
        sortBy?: string, 
        sortOrder?: "ASC" | "DESC", 
        limit?: number, 
        offset?: number
    ): Promise<Doc[] | null> {
        const queryBuilder = this.docRepository.createQueryBuilder("Doc");
        if(filterByKey !== "" && filterByValue !== "" && filterByKey !== undefined && filterByValue !== undefined) {
            const filterBy = filterByKey + " = :value";
            queryBuilder.where(filterBy, { value: filterByValue });
        }
        if(sortBy !== undefined && sortOrder) queryBuilder.orderBy(sortBy, sortOrder);
        if(limit !== undefined && offset !== undefined) queryBuilder.skip(offset).take(limit);
        return await queryBuilder.getMany();
    }

    async updateDoc(docID: number, newData: Partial<Doc>): Promise<Doc | null> {
        const updatedDoc: UpdateResult = await this.docRepository.update(docID, newData);
        if(updatedDoc.affected === 0) return null;
        return await this.docRepository.findOneBy({ id: docID });
    }

    async deleteDoc(docID: number): Promise<void> {
        await this.docRepository.delete(docID);
    }
}