import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

interface  Props{
    openForm:() => void;
}


export default function NavBar(){
    const {activityStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

// export default function NavBar({openForm}: Props){
//     return (
//         <Menu inverted fixed='top'>
//             <Container>
//                 <Menu.Item header>
//                     <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
//                     Reactivities
//                 </Menu.Item>
//                 <Menu.Item name="Activities"/>
//                 <Menu.Item>
//                     <Button onClick={openForm} positive content='Create Activity'/>
//                 </Menu.Item>
//             </Container>
//         </Menu>
//     )
// }