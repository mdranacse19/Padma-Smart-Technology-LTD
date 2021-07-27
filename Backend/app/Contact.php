<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $guarded;

    public function contactDetails(){
        return $this->hasMany(ContactDetails::class);
    }

    public function groups(){
        return $this->belongsToMany(Group::class)->withTimestamps();
    }
}
