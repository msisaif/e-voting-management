<?php

namespace App\Http\Controllers;

use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ElectionController extends Controller
{
    public function index()
    {
        $elections = Election::query()
            ->latest('id')
            ->get();

        $elections = $elections->map(function ($election) {
            $user = request()->user();

            $count_voters = Vote::where('election_id', $election->id)->count();

            return [
                'id' => $election->id,
                'name' => $election->name,
                'description' => $election->description,
                'start_at' => $election->start_at?->format('d M Y h:ia') ?: '',
                'end_at' => $election->end_at?->format('d M Y h:ia') ?: '',
                'is_voter' => $election->isVoter($user),
                'is_active' => $election->isActive,
                'is_finished' => $election->isFinished ?: $count_voters == count($election->voters),
            ];
        });

        return Inertia::render('elections/index', [
            'elections' => $elections->toArray(),
        ]);
    }

    public function create()
    {
        $users = User::get([
            'id',
            'name',
        ]);

        return Inertia::render('elections/create', [
            'users' => $users->toArray(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'candidates' => 'required|array',
            'voters' => 'required|array',
        ]);

        $election = new Election();
        $election->user_id = $request->user()->id;
        $election->name = $request->name;
        $election->description = $request->description;
        $election->start_at = $request->start_at;
        $election->end_at = $request->end_at;
        $election->candidates = $request->candidates;
        $election->voters = $request->voters;
        $election->save();

        return to_route('elections.index')->with('success', 'Election created successfully.');
    }

    public function vote(Request $request, Election $election)
    {
        $user = $request->user();

        if(!$election->isVoter($user) || !$election->isActive) {
            return to_route('elections.index');
        }

        $candidates = User::query()
            ->whereIn('id', $election->candidates)
            ->whereNot('id', $user->id)
            ->get([
                'id',
                'name',
            ]);
        
        return Inertia::render('elections/vote', [
            'election' => [
                'id' => $election->id,
                'name' => $election->name,
                'description' => $election->description,
                'start_at' => $election->start_at?->format('d M Y h:ia') ?: '',
                'end_at' => $election->end_at?->format('d M Y h:ia') ?: '',
                'is_voter' => $election->isVoter($user),
                'is_active' => $election->isActive,
                'already_voted' => $this->alreadyVoted($election, $user),
            ],
            'candidates' => $candidates->toArray(),
        ]);
    }

    public function result(Request $request, Election $election)
    {
        $user = $request->user();

        $count_voters = Vote::where('election_id', $election->id)->count();

        if(!$election->isVoter($user) || !($election->isFinished ?: $count_voters == count($election->voters))) {
            return to_route('elections.index');
        }

        $candidates = User::query()
            ->whereIn('id', $election->candidates)
            ->get([
                'id',
                'name',
            ]);

        return Inertia::render('elections/result', [
            'election' => [
                'id' => $election->id,
                'name' => $election->name,
                'description' => $election->description,
            ],
            'candidates' => $candidates->toArray(),
            'result' => $this->getResult($election, $candidates),
        ]);
    }

    public function storeVote(Request $request, Election $election, User $candidate)
    {
        $user = $request->user();

        if ($user->id != $candidate->id && $election->isVoter($user) && $election->isActive) {
            
            if (!$this->alreadyVoted($election, $user)) {
                $vote = new Vote();
                $vote->election_id = $election->id;
                $vote->voter_id = Hash::make($user->id);
                $vote->candidate_id = Hash::make($candidate->id);
                $vote->save();
            }
        }

        return to_route('elections.vote', [
            'election' => $election->id,
        ])->with('success', 'Your vote has been cast successfully.');
    }

    private function alreadyVoted($election, $user)
    {
        $votes = $election->votes()
            ->get([
                'id',
                'election_id',
                'voter_id',
            ]);

        $alreadyVoted = false;

        foreach ($votes as $vote) {
            if (Hash::check($user->id, $vote->voter_id)) {
                $alreadyVoted = true;
                break;
            }
        }

        return $alreadyVoted;
    }

    private function getResult($election, $candidates)
    {
        $votes = $election->votes()
            ->get([
                'id',
                'election_id',
                'candidate_id',
            ]);

        $results = [];

        foreach ($votes as $vote) {
            foreach ($candidates as $candidate) {
                if (Hash::check($candidate->id, $vote->candidate_id)) {

                    if (!isset($results[$candidate->id])) {
                        $results[$candidate->id] = 0;
                    }

                    $results[$candidate->id]++;

                    break;
                }
            }
        }

        return $results;
    }
}
