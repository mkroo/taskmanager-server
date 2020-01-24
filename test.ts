import { readFileSync } from 'fs';

interface Task {
  readonly id: string;
  category: 'dev' | 'request';
  title: string;
  content: string;
  time: number;
  readonly createdAt: Date;
  readonly userId: string;
}

const list = JSON.parse(readFileSync('./data.json', 'utf8')) as Task[];



const smkData = list.filter(item => item.userId === 'kdk');

const arrMap = (key: string, list: any[]) => {
  if (list.length === 0 || !list[0][key]) {
    return {};
  }
  const res: NestObject = {};
  for (const obj of list) {
    const value = obj[key];
    delete obj[key];
    if (!res.hasOwnProperty(value)) {
      res[value] = [];
    }
    res[value].push(obj);
  }
  return res;
};

interface NestObject {
  [key: string]: any[];
}

const objMap = (pivot: string, obj: NestObject) => {
  const res: any = {};
  for (const key in obj) {
    res[key] = arrMap(pivot, obj[key]);
  }
  return res;
};

const d1 = arrMap('category', smkData);
const d2 = objMap('title', d1);
// console.log(JSON.stringify(d2));

/**
 * Develop
 * user - ticket - task - time
 * Request
 * user - issue - solution - time
 * 
 * GET /tasks?from&to
 * UPDATE /tasks/:taskId
 * DELETE /tasks/:taskId
 * 
 * POST /tickets/:ticketId/tasks 
 * 
 * GET /users/:userId/tickets
 * POST /tickets
 * UPDATE /tickets/:ticketId
 * 
 * GET /issues?status=(open | pending | close)
 * GET /issues/:issueId
 * POST /issues
 * UPDATE /issues/:issueId
 * DELETE /issues/:issueId
 * 
 * GET /users/:userId/tasks
 * 
 * POST /auth/login
 * UPDATE /users/:userId/password
 */

/**
 * User Type
 * 1. developer (Development Team)
 * 2. project manager (Planning Team)
 * 3. customer supporter (Support Team)
 */




const date = new Date(Date.UTC(2020, 1, 22));
const date2 = new Date('2020-01-22T00:00:00+09:00');
console.log(date, date2);
