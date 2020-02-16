import { APIGatewayProxyHandler } from 'aws-lambda';
import { Project } from '../../entity';
import { success, funcToHandler } from '../../util';

export const getProjects: APIGatewayProxyHandler = async (event) => {
  const projects = await Project.find();
  return success({ projects });
};

export const handler = funcToHandler(getProjects);
