import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ELection List',
        href: '/elections',
    },
    {
        title: 'Vote',
        href: '/vote',
    },
];

export default function ELectionIndex({ election, candidates }: { election: object; candidates: Array<object> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={election.name} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PlaceholderPattern className="absolute inset-0 z-0 size-full stroke-neutral-900/20 opacity-20 dark:stroke-neutral-100/20" />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="w-full p-4">
                        {election.already_voted && (
                            <div className="mb-4 rounded bg-green-100 p-4 text-sm text-green-700 dark:bg-green-900 dark:text-green-300">
                                "Thank you! Your vote has been successfully submitted."
                            </div>
                        )}
                        <h1 className="text-2xl font-bold">{election.name}</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{election.description}</p>
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold">Candidates</h2>
                            <ul className="list-disc pl-5">
                                {candidates.map((candidate: object) => (
                                    <li key={candidate.id} className="mt-2">
                                        {candidate.name}
                                        {!election.already_voted && election.is_active && election.is_voter && (
                                            <Link
                                                href={`/elections/${election.id}/vote/${candidate.id}`}
                                                className="ml-2 inline-block rounded bg-blue-600 px-3 py-0.5 text-xs text-white hover:bg-blue-700 lg:text-sm"
                                            >
                                                Vote
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
