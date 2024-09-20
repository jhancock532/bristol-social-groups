import { useEffect } from 'react';
import { useRouter } from 'next/router';

// A simple static page redirect so that you can navigate to
// https://bristol.social/groups and be redirected to the homepage.

const GroupsPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('/');
    }, [router]);

    return null;
};

export default GroupsPage;
