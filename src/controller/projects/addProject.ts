import { APIGatewayProxyHandler } from 'aws-lambda';
import { Project } from '../../entity';
import { success, funcToHandler } from '../../util';

interface Body {
  id: string;
  name: string;
  description?: string;
}
const addProject: APIGatewayProxyHandler = async (event) => {
  const { body } = event;
  const { id, name, description = '' } = body as unknown as Body;
  const project = new Project();
  project.id = id;
  project.name = name;
  project.description = description;
  await project.save();
  return success({ project });
};

export const handler = funcToHandler(addProject);
