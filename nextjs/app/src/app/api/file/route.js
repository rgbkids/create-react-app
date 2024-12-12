import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const HOME_DIR = path.join(process.cwd(), './');

export async function POST(req) {
    const { filepath, content } = await req.json();

    if (!filepath || !content) {
        return NextResponse.json({ error: 'Filepath and content are required.' }, { status: 400 });
    }

    const fullPath = path.join(HOME_DIR, filepath);

    try {
        fs.writeFileSync(fullPath, content);
        console.log(`File written at ${fullPath}`);
        return NextResponse.json({ message: 'File written successfully.' });
    } catch (err) {
        console.error('Error writing file:', err);
        return NextResponse.json({ error: 'Failed to write file.' }, { status: 500 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const filepath = searchParams.get('filepath');

    if (typeof filepath !== 'string') {
        return NextResponse.json({ error: 'Filepath must be a single string value.' }, { status: 400 });
    }

    const fullPath = path.join(HOME_DIR, filepath);

    try {
        const data = fs.readFileSync(fullPath, 'utf8');
        console.log(`File read from ${fullPath}`);
        return NextResponse.json({ content: data });
    } catch (err) {
        console.error('Error reading file:', err);
        return NextResponse.json({ error: 'Failed to read file.' }, { status: 500 });
    }
}