<?php

namespace App\Http\Controllers;

use App\Contact;
use App\ContactDetails;
use App\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Exception;

class ContactController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $response['contacts'] = Contact::with('contactDetails')->with('groups')->get();
        return response()->json($response);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $response['groups'] = Group::all();
        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //return $request;

        $contact_data = [
            'name' => $request->name,
            'is_favourite' => $request->is_favourite,
        ];
        DB::beginTransaction();
        try {
            if (!$request->id) {
                //add contact
                $contact = Contact::create($contact_data);

                //add contact details
                foreach ($request->email as $key => $value){
                    $data = [
                        'contact_id'  => $contact->id,
                        'phone'  => $request->phone[$key],
                        'email'  => $value,
                    ];
                    //return $data;
                    ContactDetails::create($data);
                }

                //add contact group
                $contact->groups()->attach($request->group_id);

                DB::commit();
                $response['message'] = 'Data saved successfully!!';
            } else {

                //add contact
                $contact = Contact::where('id', $request->id)->first();
                $contact->update($contact_data);

                //add contact details
                //first delete all data depend on contact_id then insert
                ContactDetails::where('contact_id', $request->id)->delete();
                foreach ($request->email as $key => $value){
                    $data = [
                        'contact_id'  => $request->id,
                        'phone'  => $request->phone[$key],
                        'email'  => $value,
                    ];
                    //return $data;
                    ContactDetails::where('contact_id', $request->id)->updateOrCreate($data);
                }

                //add contact group
                $contact->groups()->sync($request->group_id);


                DB::commit();
                $response['message'] = 'Data updated successfully!!';
                //return $contact;
            }

        } catch (\Exception $e) {
            DB::rollBack();
            $response['message'] = response()->json($e->getMessage());
        }

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $response['groups'] = Group::all();
        $response['formData'] = Contact::with('contactDetails')->with('groups')->where('id', $id)->first();
        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = Contact::find($id);
        DB::beginTransaction();
        try {
            $contact->delete();
            $contact->groups()->detach();
            //$contact->contactDetails()->detach();
            ContactDetails::where('contact_id', $id)->delete();

            DB::commit();
            $response['message'] = 'Data deleted successfully!!';
        } catch (\Exception $e) {
            DB::rollBack();
            $response['message'] = response()->json($e->getMessage());
        }

        return response()->json($response);
    }


    //search contacts
    public function search(Request $request){
        //return $request;
        $search_key  = $request->input('searchValue');

        $contacts = DB::table('contacts')
                                ->join('contact_details', 'contact_details.contact_id', 'contacts.id')
                                ->join('contact_group', 'contact_group.contact_id', 'contacts.id')
                                ->join('groups', 'groups.id', 'contact_group.group_id')
                                ->select('contacts.id','contacts.name', 'contacts.is_favourite')
                                ->where(function ($query) use ($search_key){
                                    if ($search_key){
                                        $query->where('contacts.name', 'like', '%'.$search_key.'%')
                                            ->orWhere('contact_details.phone', 'like', '%'.$search_key.'%')
                                            ->orWhere('contact_details.email', 'like', '%'.$search_key.'%')
                                            ->orWhere('groups.name', 'like', '%'.$search_key.'%');
                                    }
                                })
                                ->get();

        $contact_details = ContactDetails::get()->groupBy('contact_id')->all();

        $groups = collect(DB::table('contact_group')
                ->join('groups', 'groups.id', 'contact_group.group_id')
                ->get())->groupBy('contact_id')->all();

        //return $contact_details;

        $contact_data = [];
        $contact_ids = [];
        foreach ($contacts as $value){
            if (!in_array($value->id, $contact_ids)){
                $value->contact_details = (array_key_exists($value->id, $contact_details )) ? $contact_details[$value->id] : [];
                $value->groups = (array_key_exists($value->id, $groups )) ? $groups[$value->id] : [];
                $contact_ids[] = $value->id;
                $contact_data[] = $value;
            }
        }

        $response['contacts'] = $contact_data;

        return response()->json($response);
    }
}
