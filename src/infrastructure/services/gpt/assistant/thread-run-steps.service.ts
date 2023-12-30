import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class ThreadRunStepsService {    
    protected readonly openai: OpenAI = new OpenAI();

    list(threadId: string, threadRunId: string) {
        return this.openai.beta.threads.runs.steps.list(threadId, threadRunId);
    }

    retrieve(threadId: string, threadRunId: string, threadRunStepId: string) {
        return this.openai.beta.threads.runs.steps.retrieve(threadId, threadRunId, threadRunStepId);
    }
}