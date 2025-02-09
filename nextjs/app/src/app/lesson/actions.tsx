"use server";

import { exec } from "child_process";
import { promisify } from "util";

const stat = promisify(exec) as (command: string) => Promise<{ stdout: string; stderr: string }>;

export async function action(): Promise<string> {
    try {
        const { stdout } = await stat("uptime");
        return stdout.trim();
    } catch (error) {
        return "Error";
    }
}
