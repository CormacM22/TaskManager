import TaskItem from "./taskItem";

function Tasks(props){

    return props.myTasks.map(
        (task)=>{
            return <TaskItem myTask={task} key={task._id} Reload={()=>{props.ReloadData();}}></TaskItem>
        }
    );

}

export default Tasks;