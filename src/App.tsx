import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './Components/AddItemForm';
import {ButtonAppBar} from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import {addTodolistAC, changeFilterValueAC, removeTodoListAC, todolistsReducer} from './Reducers/todolistsReducer';
import {addTaskAC, taskReducer} from './Reducers/taskReducer';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  // @ts-ignore
  let [todolists, dispatchTodolist] = useReducer(todolistsReducer, [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ]);

  let [tasks, dispatchTask] = useReducer(taskReducer, {
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: v1(), title: 'SCSS', isDone: true},
      {id: v1(), title: 'Angular', isDone: false},
      {id: v1(), title: 'JS', isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'React Book', isDone: true}
    ]
  });


  function removeTask(id: string, todolistId: string) {
    // //достанем нужный массив по todolistId:
    // let todolistTasks = tasks[todolistId];
    // // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
    // tasks[todolistId] = todolistTasks.filter(t => t.id != id);
    // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    // setTasks({...tasks});
  }

  function addTask(title: string, todolistId: string) {
    // let task = {id: v1(), title: title, isDone: false};
    // //достанем нужный массив по todolistId:
    // let todolistTasks = tasks[todolistId];
    // // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
    // tasks[todolistId] = [task, ...todolistTasks];
    // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    // setTasks({...tasks});
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    // //достанем нужный массив по todolistId:
    // let todolistTasks = tasks[todolistId];
    // // найдём нужную таску:
    // let task = todolistTasks.find(t => t.id === id);
    // //изменим таску, если она нашлась
    // if (task) {
    //   task.isDone = isDone;
    //   // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    //   setTasks({...tasks});
    // }
  }


  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchTodolist(changeFilterValueAC(value, todolistId))
  }

  function removeTodolist(todolistId: string) {
    dispatchTodolist(removeTodoListAC(todolistId))
    //СДЕЛАТЬ ДИСПАТЧ НА ТАСКИ В ДРУГОМ РЕДЬЮСЕРЕ
    delete tasks[todolistId]



    // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
    //setTodolists(todolists.filter(tl => tl.id != id));
    // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    // delete tasks[todolistId]; // удаляем св-во из объекта... значением которого являлся массив тасок
    // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    // setTasks({...tasks});
  }

  console.log(todolists)
  function addTodoList(title: string) {

    let todolistId = v1()
    dispatchTodolist(addTodolistAC(title, todolistId))
    dispatchTask(addTaskAC(todolistId))

    // let newTodoList: TodolistType = {id: todolistId, title: title, filter: 'all'}
    // //   setTodolists([...todolists, newTodoList]);

  }

  function updateTaskTitle(taskId: string, title: string, todolistId: string) {
    // setTasks({
    //   ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId
    //     ? {...el, title: title}
    //     : el)
    // });
  }

  function changeTitleTodoList(id: string, title: string) {
    // setTodolists([...todolists.map(el => el.id === id
    // ? {...el, title: title}
    // : el
    // )]
    // )
  }

  return (
    <div className="App">

      <ButtonAppBar/>

      <Container fixed>
        <Grid container style={{padding: '10px'}}>
          <AddItemForm callback={addTodoList}/>
        </Grid>


        <Grid container spacing={3}>
          {todolists.map(tl => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === 'active') {
              tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
            }
            return <Grid item key={tl.id}>
              <Paper elevation={5} style={{padding: '10px'}}>
                <Todolist
                  id={tl.id}
                  title={tl.title}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                  updateTaskTitle={updateTaskTitle}
                  changeTitleTodoList={changeTitleTodoList}
                />
              </Paper>
            </Grid>
          })
          }
        </Grid>


      </Container>
    </div>
    );
}

export default App;
