import { loginResponseSchema } from '../schema/login-reponse.schema';
import type { LoginUserDto } from '../schema/login-request.schema';
import type { CreateUserDto } from '../schema/register.schema';
import requester from '../../../shared/api/axios';

export const authApi = {
  register: (data: CreateUserDto) => requester.post('/auth/register', data),

  login: async (data: LoginUserDto) => {
    const res = await requester.post('/auth/signin', data);
    return loginResponseSchema.parse(res.data);
  },
};
