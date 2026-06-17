import { ReactNode, Suspense } from 'react';

type AuthLayout = {
    children: ReactNode;
};

function AuthLayout(props: AuthLayout) {
    return <Suspense fallback={<p>Loading...</p>}>{props.children}</Suspense>;
}

export default AuthLayout;
