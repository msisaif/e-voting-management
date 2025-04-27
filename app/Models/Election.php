<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    protected $guarded = [];

    protected function casts()
    {
        return [
            'start_at' => 'datetime',
            'end_at' => 'datetime',
            'candidates' => 'array',
            'voters' => 'array',
        ];
    }

    public function isActive(): Attribute
    {
        return Attribute::make(
            get: fn () => now()->between($this->start_at, $this->end_at),
        );
    }

    public function isFinished(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->end_at <= now(),
        );
    }

    public function isVoter($user)
    {
        return in_array($user->id, $this->voters);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
