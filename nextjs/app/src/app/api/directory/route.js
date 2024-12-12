import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const HOME_DIR = path.join(process.cwd(), './');

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const dirPath = searchParams.get('dirPath');

    if (typeof dirPath !== 'string') {
        return NextResponse.json({ error: 'Directory path must be a single string value.' }, { status: 400 });
    }

    const fullPath = path.join(HOME_DIR, dirPath);

    const getDirectoryContents = (currentPath, level) => {
        if (level > 5) {
            return [];
        }

        try {
            const items = fs.readdirSync(currentPath, { withFileTypes: true });
            return items.map((item) => {
                const itemPath = path.join(currentPath, item.name);
                if (item.isDirectory()) {
                    return {
                        name: item.name,
                        type: 'directory',
                        contents: getDirectoryContents(itemPath, level + 1),
                    };
                } else {
                    return {
                        name: item.name,
                        type: 'file',
                    };
                }
            });
        } catch (err) {
            console.error('Error reading directory:', err);
            return [{ name: 'Error', type: 'file' }];
        }
    };

    const directoryContents = getDirectoryContents(fullPath, 1);

    if (!directoryContents) {
        return NextResponse.json({ error: 'Failed to read directory or depth exceeded.' }, { status: 500 });
    }

    return NextResponse.json({ contents: directoryContents });
}