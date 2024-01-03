import { Injectable } from "@nestjs/common";
import { exec } from "child_process";

@Injectable()
export class OSExecuterService {
    execute(command: string) {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            console.log(`stdout: ${stdout}`);

        })
    }
}