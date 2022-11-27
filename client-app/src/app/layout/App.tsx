import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observable, observe } from 'mobx';
import { observer } from 'mobx-react-lite';


function App() {
  const {activityStore} = useStore();

/*都存在 MobX 的 activityStore 裡面
  // const [activities, setActivities] = useState<Activity[]>([]);
  // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined); 
  // const [editMode, setEditMode] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [submitting, setSubmitting] = useState(false);
*/

  useEffect(() => {
    activityStore.loadActivites();
    
    // agent.Activities.list().then(response => {
    //   let activities : Activity[] = [];
    //   response.forEach(activity => {
    //     activity.date = activity.date.split('T')[0];
    //     activities.push(activity);
    //   })
    //   setActivities(activities);
    //   setLoading(false);
    // })

    // axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
    //   setActivities(response.data);
    // })
  }, [activityStore])

  /* 用 MobX 改寫在 store.ts 裡面，取代這四個
  function handleSelectActivity(id :string){
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }
  */

  /* 用 MobX 改寫在 store.ts 裡面，取代這兩個
  function handleCreateOrEditActivity(activity : Activity){
    setSubmitting(true);

    if(activity.id)
    {
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else{
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    // 改寫成上面，就註解這段
    // activity.id 
    // ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    // : setActivities([...activities, {...activity, id: uuid()}]);
    // setEditMode(false);
    // setSelectedActivity(activity);
  }
  
  function handleDeleteActivity(id: string){
    setSubmitting(true);
    
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }
  */

  // if(loading) return <LoadingComponent content='loading app'/>
  if(activityStore.loadingInitial) return <LoadingComponent content='loading app'/>
  

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard />
      </Container>
    </>
  );

  // return (
  //   <>
  //   {/* <> is short cut of <Fragment>. instead of <div> */}
  //   {/* <Fragment> */}
  //     <NavBar openForm={handleFormOpen}/>
  //     <Container style={{marginTop: '7em'}}>
  //       <ActivityDashboard 
  //         // activities={activities}
  //         activities={activityStore.activities}
  //         selectedActivity={selectedActivity}
  //         selectActivity={handleSelectActivity}
  //         cancelSelectActivity={handleCancelSelectActivity}
  //         editMode={editMode}
  //         openForm={handleFormOpen}
  //         closeForm={handleFormClose}
  //         createOrEdit={handleCreateOrEditActivity}
  //         deleteActivity={handleDeleteActivity}
  //         submitting={submitting}
  //       />
  //     </Container>
  //   {/* </Fragment> */}
  //   </>
  // );
  // return (
  //   <>
  //   {/* <> is short cut of <Fragment>. instead of <div> */}
  //   {/* <Fragment> */}
  //     <NavBar />
  //     <Container style={{marginTop: '7em'}}>
  //       <List>
  //         {activities.map(activity => (
  //           <List.Item key={activity.id}>
  //             {activity.title}
  //           </List.Item>
  //         ))}
  //       </List>
  //     </Container>
  //   {/* </Fragment> */}
  //   </>
  // );
}

export default observer(App);
// export default App;
