import { type NavItem } from '@/types';
import { TextSelect, Users } from 'lucide-react';

const mainNavItems: NavItem[] = [
    { title: 'Users', href: '/users', icon: Users },
    { title: 'Elections', href: '/elections', icon: TextSelect },
];

export default mainNavItems;
