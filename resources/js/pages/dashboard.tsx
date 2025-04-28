import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { internalNavItems } from '@/data';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    {internalNavItems.map((item) => (
                        <div
                            key={item.title}
                            className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-[3/1] overflow-hidden rounded-xl border"
                        >
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 opacity-50 dark:stroke-neutral-100/20" />
                            <Link href={item.href} className="absolute inset-0 flex items-center justify-center gap-2">
                                {item.icon && <item.icon className="size-8" />}
                                <span className="text-3xl">{item.title}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
