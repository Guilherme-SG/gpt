import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class ThreadService {    
    protected readonly openai: OpenAI = new OpenAI();
    
    create() {        
        return this.openai.beta.threads.create();
    }

    retrieve(threadId: string) {        
        return this.openai.beta.threads.retrieve(threadId);
    }
}