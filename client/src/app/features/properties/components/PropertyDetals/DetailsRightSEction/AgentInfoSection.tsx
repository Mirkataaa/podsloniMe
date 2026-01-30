import type { Property } from '@/app/shared/types/property.types';

type Props = {
  user: Property['createdBy'];
};

export default function AgentInfoSenction({ user }: Props) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-200">
        <span className="text-blue-600 font-bold text-lg">
          {user.username[0].toUpperCase()}
        </span>
      </div>

      <div>
        <p className="font-bold text-gray-900">{user.username}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-500">{user.role}</p>
      </div>
    </div>
  );
}
