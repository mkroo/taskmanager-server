# Database
## User
- id
- email
- password
- name
- teamId
- isLeader
## Ticket
- id
- name
- description
- type (development, issue, bug)
- priority
- openedAt
- closedAt
## Task
- id
- content
- time
- createdAt
- completedAt
- time
- ticketId(Ticket)
- userId
## Project
- id
- name
- description
- createdAt
## Team
- id
- name

# API
## User
`GET` /users
`POST`  /teams/:teamId/users

# Project
`POST`  /projects
`GET`   /projects

## Ticket:
`GET` /tickets
`GET` /teams/:teamId/tickets?status=working,pending,close
`GET` /tickets/:ticketId
`POST`  /projects/:projectId/tickets
`POST`  /tickets/:ticketId/close
`PATCH` /tickets/:ticketId

## Task: 1시간 ~ 하루 이내에 완료가능한 혼자 가능한 일
`GET` /tasks
`GET` /users/:userId/tasks
`GET` /teams/:teamId/tasks?complete=true,false
`POST`  /tickets/:ticketId/tasks
`PATCH` /tasks/:taskId