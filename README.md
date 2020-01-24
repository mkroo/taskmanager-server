# Task Manager
사내 일정관리를 위한 툴입니다.

team - member

team - project - task 

## 작업단위
1. Project (b2b, crm, b2c, ...) = epic
2. Task (crm-092, b2b-031, ...)
3. SubTask ()


user (member, leader)

getProjects
getProject
addProject
updateProject

addTask
getTasks (해당 유저의 task만 불러옴)
getTask
changeTaskStatus

develop

handleRequest

handleOtherWork

fixBug

setWeelyPlan
getWeeklyReport
exportWeeklyReport

addMember

## admin
addTeam             POST    /teams
setTeamLeader       POST    /teams/:teamId/leader

## TeamLeader
addMember           POST    /teams/:teamId/member
getWeeklyReport     GET     /reports?year=2020&month=1&week=4
exportWeeklyReport  GET     /reports?year=2020&month=1&week=4 (header / Accept: 'application/vnd.ms-excel' ) OR handle on client-side
createProject       POST    /projects
createTask          POST    /tasks
updateTask          PATCH   /tasks/:taskId
changeTaskStatus    PATCH   /tasks/:taskId/status (자동으로 변할수 있도록 설계해야함)
addTaskWorker       POST    /tasks/:taskId/members
removeTaskWorker    DELETE  /tasks/:taskId/member/:memberId
getTeamTasks        GET     /teams/:teamId/tasks

## Employee
setWeeklyPlan       POST    /plans?year=2020&month=1&week=4
getWeeklyTasks      GET     /plans?year=2020&month=1&week=4
getTask             GET     /tasks/:taskId
getTasks            GET     /tasks (header / authorization)
develop             POST    /works?type=develop
fixBug              POST    /works?type=bugFix
handleRequest       POST    /works?type=request
handleOtherWork     POST    /works?type=other
getProjects         GET     /projects
getProject          GET     /projects/:projectId
login               POST    /login

## all
register            POST    /register
