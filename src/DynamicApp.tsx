import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DynamicApp = () => {
    const { id } = useParams<{ id: string }>();
    const [Component, setComponent] = useState<React.LazyExoticComponent<React.FC> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                const module = await import(`./pages/${id}/App`);
                setComponent(() => module.default);
            } catch (error) {
                await fetch(`https://localhost:4000/create/${id}`, { method: 'POST' });
                
                try {
                    const module = await import(`./pages/${id}/App`);
                    setComponent(() => module.default);
                } catch (finalError) {
                    console.error(`Failed to load component after creation for ID: ${id}`, finalError);
                }
            } finally {
                setLoading(false);
            }
        };

        loadComponent();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Component) {
        return <h1>Invalid App ID: {id}</h1>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component />
        </Suspense>
    );
};

export default DynamicApp;
