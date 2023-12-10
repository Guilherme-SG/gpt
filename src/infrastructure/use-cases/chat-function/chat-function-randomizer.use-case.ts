import { Injectable } from "@nestjs/common";
import { ChatFunctionGPTBaseService } from "./chat-function-gpt-base.use-case.";

@Injectable()
export class ChatFunctionRandomNumber extends ChatFunctionGPTBaseService {
    constructor() {
        super();
        this.setupTemplate();
    }

    setTools(): void {
        this.pushTool(
            {
                type: "function",
                function: {
                    name: "getUsername",
                    description: "Retrive the username of the user",
                    parameters: {
                        type: "object",
                        properties: {}
                    }
                }
            },
            () => "John Doe"
        );
        this.pushTool(
            {
                type: "function",
                function: {
                    name: "randomNumber",
                    description: "Generate a random number between min and max",
                    parameters: {
                        type: "object",
                        properties: {
                            min: {
                                type: "number",
                                description: "The minimum value of the random number"
                            },
                            max: {
                                type: "number",
                                description: "The maximum value of the random number"
                            }
                        }
                    }
                }
            },
            (options: {
                min: number
                max: number
            }) => Math.floor(Math.random() * (options.max - options.min + 1) + options.max)
        );
       
    }
}