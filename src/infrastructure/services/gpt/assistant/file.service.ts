import { Injectable } from "@nestjs/common";
import { FileCreateParams } from "openai/resources";
import OpenAI from "openai";

@Injectable()
export class FileService {    
    protected readonly openai: OpenAI = new OpenAI();

    list() {
        return this.openai.files.list();
    }

    create(params: FileCreateParams) {        
        return this.openai.files.create(params);
    }

    delete(fileId: string) {
        return this.openai.files.del(fileId);
    }

    retrieve(fileId: string) {
        return this.openai.files.retrieve(fileId);
    }

    retrieveContent(fileId: string) {
        return this.openai.files.retrieveContent(fileId);
    }

}