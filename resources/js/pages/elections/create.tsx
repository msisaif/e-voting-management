import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ELection List',
        href: '/elections',
    },
    {
        title: 'Create Election',
        href: '/create',
    },
];

type ProfileForm = {
    name: string;
    email: string;
};

export default function ELectionIndex({ users }: { users: Array<object> }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: '',
        start_at: '',
        end_at: '',
        candidates: [],
        voters: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('elections.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Election" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PlaceholderPattern className="absolute inset-0 z-0 size-full stroke-neutral-900/20 opacity-20 dark:stroke-neutral-100/20" />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form onSubmit={submit} className="grid w-full max-w-3xl gap-x-4 gap-y-8 p-4 lg:grid-cols-2">
                        <div className="col-span-full grid gap-2">
                            <Label htmlFor="name">Election Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full max-w-3xl bg-white dark:bg-gray-800"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="off"
                                placeholder="Election Name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="start_at">Start At</Label>

                            <Input
                                id="start_at"
                                type="datetime-local"
                                className="mt-1 block w-full bg-white dark:bg-gray-800"
                                value={data.start_at}
                                onChange={(e) => setData('start_at', e.target.value)}
                                required
                                autoComplete="off"
                            />

                            <InputError className="mt-2" message={errors.start_at} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="end_at">End At</Label>

                            <Input
                                id="end_at"
                                type="datetime-local"
                                className="mt-1 block w-full max-w-3xl bg-white dark:bg-gray-800"
                                value={data.end_at}
                                onChange={(e) => setData('end_at', e.target.value)}
                                required
                                autoComplete="off"
                            />

                            <InputError className="mt-2" message={errors.end_at} />
                        </div>
                        <div className="space-y-4 rounded-lg border p-4">
                            <h2 className="flex items-center justify-start gap-2 text-xl font-semibold">
                                Candidates
                                <Input
                                    type="checkbox"
                                    className="size-4"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setData(
                                                'candidates',
                                                users.map((user: object) => user.id),
                                            );
                                        } else {
                                            setData('candidates', []);
                                        }
                                    }}
                                    checked={data.candidates.length === users.length}
                                    autoComplete="off"
                                />
                                <span className="text-sm text-gray-500">All</span>
                            </h2>
                            <ul className="space-y-4">
                                {users.map((candidate: object) => (
                                    <li key={candidate.id} className="flex items-center justify-start gap-2">
                                        <Input
                                            id={`candidate-${candidate.id}`}
                                            type="checkbox"
                                            className="size-4"
                                            value={candidate.id}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setData('candidates', [...data.candidates, candidate.id]);
                                                } else {
                                                    setData(
                                                        'candidates',
                                                        data.candidates.filter((id: number) => id !== candidate.id),
                                                    );
                                                }
                                            }}
                                            checked={data.candidates.includes(candidate.id)}
                                            autoComplete="off"
                                        />
                                        <Label htmlFor={`candidate-${candidate.id}`}>{candidate.name}</Label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4 rounded-lg border p-4">
                            <h2 className="flex items-center justify-start gap-2 text-xl font-semibold">
                                Voters
                                <Input
                                    type="checkbox"
                                    className="size-4"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setData(
                                                'voters',
                                                users.map((user: object) => user.id),
                                            );
                                        } else {
                                            setData('voters', []);
                                        }
                                    }}
                                    checked={data.voters.length === users.length}
                                    autoComplete="off"
                                />
                                <span className="text-sm text-gray-500">All</span>
                            </h2>
                            <ul className="space-y-4">
                                {users.map((voter: object) => (
                                    <li key={voter.id} className="flex items-center justify-start gap-2">
                                        <Input
                                            id={`voter-${voter.id}`}
                                            type="checkbox"
                                            className="size-4"
                                            value={voter.id}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setData('voters', [...data.voters, voter.id]);
                                                } else {
                                                    setData(
                                                        'voters',
                                                        data.voters.filter((id: number) => id !== voter.id),
                                                    );
                                                }
                                            }}
                                            checked={data.voters.includes(voter.id)}
                                            autoComplete="off"
                                        />
                                        <Label htmlFor={`voter-${voter.id}`}>{voter.name}</Label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-full flex items-center justify-end gap-4">
                            <Button disabled={processing} className="cursor-pointer">
                                Save
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
