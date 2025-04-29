import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ELection List',
        href: '/elections',
    },
];

export default function ELectionIndex({ elections }: { elections: Array }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ELection List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PlaceholderPattern className="absolute inset-0 z-0 size-full stroke-neutral-900/20 opacity-20 dark:stroke-neutral-100/20" />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full table-auto border-collapse text-left text-sm text-gray-500 dark:text-gray-400">
                            <thead className="border-b border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 text-center">ID</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Start At</th>
                                    <th className="px-6 py-3">End At</th>
                                    <th className="px-6 py-3 text-center">
                                        <div className="flex gap-2 items-center justify-center">
                                            <span>Action</span>
                                            <Link href="/elections/create">
                                                <Plus className="h-4 w-4 text-sky-700" />
                                            </Link>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {elections.map((election) => (
                                    <tr key={election.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 text-center">{election.id}</td>
                                        <td className="px-6 py-4">{election.name}</td>
                                        <td className="px-6 py-4">{election.start_at}</td>
                                        <td className="px-6 py-4">{election.end_at}</td>
                                        <td className="px-6 py-4 text-center">
                                            {!election.is_finished && election.is_active && election.is_voter && (
                                                <Link
                                                    href={`/elections/${election.id}/vote`}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-700"
                                                >
                                                    Vote
                                                </Link>
                                            )}
                                            {election.is_finished && (
                                                <Link
                                                    href={`/elections/${election.id}/result`}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-700"
                                                >
                                                    Result
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
