import { funcToHandler } from './src/util';

import * as Auth from './src/controller/auth';
import * as Project from './src/controller/projects';
import * as Task from './src/controller/tasks';
import * as Ticket from './src/controller/tickets';
import * as User from './src/controller/users';

export const login = funcToHandler(Auth.login);

export const addProject = funcToHandler(Project.addProject);
export const getProjects = funcToHandler(Project.getProjects);

export const addTask = funcToHandler(Task.addTask);
export const deleteTask = funcToHandler(Task.deleteTask);
export const getTasks = funcToHandler(Task.getTasks);

export const addTicket = funcToHandler(Ticket.addTicket);
export const closeTicket = funcToHandler(Ticket.closeTicket);
export const getTicket = funcToHandler(Ticket.getTicket);
export const getTickets = funcToHandler(Ticket.getTickets);

export const addTeamMember = funcToHandler(User.addTeamMember);
export const getTeamMembers = funcToHandler(User.getTeamMembers);
