"use server";

import { exec } from "child_process";
import util from "util";

const stat = util.promisify(exec);

export async function action(): Promise<string> {
    try {
        const { stdout } = await stat("uptime");
        return stdout.trim();
    } catch (error) {
        return "Error";
    }
}
