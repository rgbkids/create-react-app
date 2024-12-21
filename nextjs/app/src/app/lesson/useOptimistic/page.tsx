'use client';

import { useState } from 'react';
import ChangeName from './change-name';

export default function Page() {
    const [name, setName] = useState('Smith');

    return (
        <ChangeName
            currentName={name}
            onUpdateName={(updatedName) => setName(updatedName)}
        />
    );
}
