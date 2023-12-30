import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class ThreadRunService {    
    protected readonly openai: OpenAI = new OpenAI();

    run(threadId: string, assistantId: string) {
        return this.openai.beta.threads.runs.create(
            threadId,
            {  assistant_id: assistantId }
        );
    }

    retrieve(threadId: string, threadRunId: string) {
        return this.openai.beta.threads.runs.retrieve(threadId, threadRunId);
    }

    list(threadId: string) {
        return this.openai.beta.threads.runs.list(threadId);
    }

    cancel(threadId: string, threadRunId: string) {
        return this.openai.beta.threads.runs.cancel(threadId, threadRunId);
    }
}