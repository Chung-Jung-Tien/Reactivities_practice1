import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activity:Activity | undefined;
    closeForm:()=> void;
    createOrEdit: (activity:Activity)=> void;
}

export default function ActivityForm({activity:selectedActivity, closeForm, createOrEdit}:Props){

    const initialState = selectedActivity ?? {
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit(){
        // console.log(activity);
        createOrEdit(activity);
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const{name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placrholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placrholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placrholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placrholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placrholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placrholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>

                <Button floated="right" positive type="submit" content="Sumbit" />
                <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}