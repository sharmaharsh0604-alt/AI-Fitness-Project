import { currentUser } from '@clerk/nextjs/server';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProfileForm } from '@/components/profile/ProfileForm';

export default async function ProfilePage() {
  const user = await currentUser();

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : user?.firstName?.[0] || 'U';

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Profile Settings</h2>
        <p className="text-slate-400">
          Manage your personal information and fitness preferences
        </p>
      </div>

      {/* User Info Card */}
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex items-center gap-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-1">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-slate-400 mb-2">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
            <Badge className="bg-green-600/10 text-green-500 hover:bg-green-600/20">
              Active Member
            </Badge>
          </div>
        </div>
      </Card>

      {/* Profile Form */}
      <ProfileForm />
    </div>
  );
}
