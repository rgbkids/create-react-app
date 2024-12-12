import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const baseNextjsDir = path.join(process.cwd(), 'app/');

export async function POST(req, { params }) {
    const { id } = params;

    const dirPath = path.join(baseNextjsDir, id);
    const filePath = path.join(dirPath, 'page.tsx');

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
        const template = `
export default function Page() {
  return (
    <div>
      <h1>Page ${id}</h1>
    </div>
  );
}
`;
        fs.writeFileSync(filePath, template, 'utf8');
    }

    return NextResponse.json({ message: `Page ${id} created.` });
}