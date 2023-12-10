import { Injectable } from "@nestjs/common";
import { BaseGPTService } from "../base/base-gpt.service";

@Injectable()
export class ThreadService extends BaseGPTService {
    
    create() {        
        return this.openai.beta.threads.create();
    }

    retrieve(threadId: string) {        
        return this.openai.beta.threads.retrieve(threadId);
    }
}