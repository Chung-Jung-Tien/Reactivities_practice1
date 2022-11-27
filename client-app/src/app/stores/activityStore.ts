import { makeAutoObservable, runInAction } from "mobx";
// import { action, makeAutoObservable, makeObservable, observable } from "mobx"; 用了 makeAutoObservable 就不用 import 一堆｀
import { StepTitle } from "semantic-ui-react";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';
import { format } from "path";

export default class ActivityStore{
    activityRegistry = new Map<string, Activity>(); //activities: Activity[] = []; 改用 Javastript 的 Map<T> object 來儲存 Activity
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    //用這個方法 按照日期排序 ActivityList
    get activityByDate()
    {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

    // loadActivites = () => {
    //     this.loadingInitial = true;
    // }
    loadActivites = async () => {
        try{
            const activitise = await agent.Activities.list();
            activitise.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                // this.activities.push(activity); 改用 Javascript 的 Map<T>
                this.activityRegistry.set(activity.id, activity);
            })
            this.setLoadingInitial(false);
        }
        catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state : boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id : string) => {
        // this.selectedActivity = this.activities.find(a => a.id == id); 改用 Javascript 的 Map<T>
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id? : string ) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity : Activity) => {
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(() => {
                // this.activities.push(activity); 改用 Javascript 的 Map<T>
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error)
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity:Activity) => {
        this.loading = true;
        try
        {
            await agent.Activities.update(activity);
            runInAction(() => {
                /* 改用 Javascript 的 Map<T>
                // this.activities.filter(a => a.id !== activity.id);
                // this.activities.push(activity);
                this.activities = [...this.activities.filter(a => a.id !== activity.id), activity]; //效果跟上面一樣
                */
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error)
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id : string) => {
        this.loading = true;
        try
        {
            await agent.Activities.delete(id);
            runInAction(() =>{
                // this.activities = [...this.activities.filter(a => a.id !== id)]; 改用 Javascript 的 Map<T>
                this.activityRegistry.delete(id);
                if(this.selectedActivity?.id === id)
                {
                    this.cancelSelectedActivity();
                }
                this.loading = false;
            })
        }
        catch(error)
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
