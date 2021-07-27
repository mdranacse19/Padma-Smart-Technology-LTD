<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $guarded;

    public function contact(){
        return $this->belongsToMany(Contact::class)->withTimestamps();
    }
}
