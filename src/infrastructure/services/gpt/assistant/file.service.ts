import { Injectable } from "@nestjs/common";
import { BaseGPTService } from "../base/base-gpt.service";
import { FileCreateParams } from "openai/resources";

@Injectable()
export class FileService extends BaseGPTService {

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