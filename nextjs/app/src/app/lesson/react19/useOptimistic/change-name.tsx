'use client';

import { useOptimistic } from 'react';

export default function ChangeName({ currentName, onUpdateName }: { currentName: string; onUpdateName: (name: string) => void }) {
    const [optimisticName, setOptimisticName] = useOptimistic(currentName);

    const submitAction = async (formData: FormData) => {
        const newName = formData.get('name') as string;
        setOptimisticName(newName);
        const updatedName = await updateName(newName);
        onUpdateName(updatedName);
    };

    return (
        <form action={submitAction}>
            <p>Your name is: {optimisticName}</p>
            <input type="text" name="name" disabled={currentName !== optimisticName} />
            <button type="submit">Submit</button>
        </form>
    );
}

async function updateName(newName: string): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve(newName), 1000));
}
