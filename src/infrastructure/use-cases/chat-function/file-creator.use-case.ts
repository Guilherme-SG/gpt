import { Injectable, OnModuleInit } from "@nestjs/common";
import { UseCase } from "@interfaces/use-case.interface";
import { ChatShellUseCase } from "@use-case/chat-templates/chat-shell.use-case";
import { OSExecuterService } from "@services/os/os-executer.service";
import { PromptResponse } from "@core-types/prompt.dto";

import * as readline from 'readline';

@Injectable()
export class FileCreatorUseCase implements UseCase, OnModuleInit {
    private rl: readline.Interface;


    constructor(
        private readonly chatShellUseCase: ChatShellUseCase,
        private readonly osExecuterService: OSExecuterService
    ) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });


    }
    onModuleInit() {
        this.stdin("[Sistema] - Insira um comando: ");
    }

    public async execute(prompt: string): Promise<any> {
        console.log("Prompt: ", prompt);
        const shellResponse = await this.chatShellUseCase.execute({
            prompt,
            stream: false
        }) as PromptResponse;

        this.osExecuterService.execute(shellResponse.content);
        console.log(shellResponse)
        return shellResponse;
    }

    public async stdin(question: string = "") {
        this.rl.question(question, async (answer) => {
            if (answer === "exit") {
                this.rl.close();
                process.exit(0);
            }

            this.chatShellUseCase.log()
            this.rl.write(`[Você]: ${answer}\n`);
            let processing = this.execute(answer);
            this.loadingEffect(processing);

            await processing;
            this.stdin(question)
        })
    }

    private loadingEffect(promiseToWait: Promise<any>) {
        const P = ['\\', '|', '/', '-'];
        let x = 0;
        const loader = setInterval(() => {
            process.stdout.write(`\r${P[x++]}`);
            x %= P.length;
        }, 250);

        promiseToWait.then(() => {
            clearInterval(loader);
        });
    }
}