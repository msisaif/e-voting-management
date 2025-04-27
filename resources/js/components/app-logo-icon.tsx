import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return <img {...props} src="/logo.png" alt="Logo" />;
}
