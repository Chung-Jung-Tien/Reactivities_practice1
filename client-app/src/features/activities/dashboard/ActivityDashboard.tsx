import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityDatails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

/* 改用 MobX 存在 activityStore 裡面
interface Props{
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity:() =>void;
    editMode:boolean;
    openForm:(id:string) => void;
    closeForm:()=>void;
    createOrEdit:(activity:Activity) =>void;
    activities:Activity[];
    deleteActivity:(id: string) => void;
    submitting: boolean;
}
*/

// export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting}:Props){
//用一個 observer() 把全部包起來
export default observer(function ActivityDashboard(){
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
   
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDatails />}   
                {editMode &&
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})