import { AppDataSource } from "src/config/data-source";
import { Doc } from "src/models/Doc";
import { UpdateResult } from "typeorm";

export class DocService {
    private docRepository = AppDataSource.getRepository(Doc);

    async createDoc(docData: Partial<Doc>): Promise<Doc> {
        const newDoc = this.docRepository.create(docData);
        return await this.docRepository.save(newDoc);
    }

    async getDocByID(docID: number): Promise<Doc | null> {
        return await this.docRepository.findOneBy({id: docID});
    }

    async updateDoc(docID: number, newData: Partial<Doc>): Promise<Doc | null> {
        const updatedDoc: UpdateResult = await this.docRepository.update(docID, newData);
        if(updatedDoc.affected === 0) return null;
        return await this.docRepository.findOneBy({id: docID});
    }

    async deleteDoc(docID: number): Promise<void> {
        await this.docRepository.delete(docID);
    }
}