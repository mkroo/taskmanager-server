import { APIGatewayProxyHandler } from 'aws-lambda';
import { error, success, funcToHandler } from '../../util';
import { Team, User } from '../../entity';

const getTeamMembers: APIGatewayProxyHandler = async (event) => {
  const { pathParameters } = event;
  if (!pathParameters) {
    return error('INTERNAL_SERVER_ERROR');
  }
  const { teamId } = pathParameters;
  const team = await Team.findOne(teamId);
  if (!team) {
    return error('NOT_FOUND', 'TEAM_NOT_FOUND');
  }
  const users = await User.find({ where: { team } });
  return success({ users });
};

export const handler = funcToHandler(getTeamMembers);
