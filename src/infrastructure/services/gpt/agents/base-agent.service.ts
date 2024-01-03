import { Injectable } from "@nestjs/common";
import { PromptWithToolGPTService } from "../prompt/prompt-with-tool-gpt.service";

@Injectable()
export abstract class BaseAgentService extends PromptWithToolGPTService {

    public countNonSystemMessages() {
        return this.messages.length -  this.systemMessages.length;
    }

    public getMessages()
    {
        return this.messages;
    }

    public getLastMessage()
    {
        return this.messages[this.messages.length - 1];
    }
   
}