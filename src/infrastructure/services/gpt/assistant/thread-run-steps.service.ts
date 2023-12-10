import { Injectable } from "@nestjs/common";
import { BaseGPTService } from "../base/base-gpt.service";

@Injectable()
export class ThreadRunStepsService extends BaseGPTService {

    list(threadId: string, threadRunId: string) {
        return this.openai.beta.threads.runs.steps.list(threadId, threadRunId);
    }

    retrieve(threadId: string, threadRunId: string, threadRunStepId: string) {
        return this.openai.beta.threads.runs.steps.retrieve(threadId, threadRunId, threadRunStepId);
    }
}