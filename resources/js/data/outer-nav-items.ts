import { type NavItem } from '@/types';
import { ExternalLink, Facebook, Linkedin } from 'lucide-react';

const outerNavItems: NavItem[] = [
    {
        title: 'www.orbeetal.com',
        href: 'https://orbeetal.com',
        icon: ExternalLink,
    },
    {
        title: '/company/orbeetal',
        href: 'https://www.linkedin.com/company/orbeetal',
        icon: Linkedin,
    },
    {
        title: '/Orbeetal',
        href: 'https://www.facebook.com/Orbeetal',
        icon: Facebook,
    },
];

export default outerNavItems;
