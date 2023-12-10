import { Injectable } from "@nestjs/common";
import { ChatTemplateGPTUseCase } from "../../../use-cases/chat-templates/chat-template-gpt.use-case";

@Injectable()
export abstract class BaseAgentService extends ChatTemplateGPTUseCase{
    constructor() {
        super()
    }

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