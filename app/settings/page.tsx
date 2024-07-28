import { redirect } from 'next/navigation';
import Profile from '@/components/profile';
import { defaultMetaProps } from '@/components/layout/meta';
import { getUser, getAllUsers, UserProps, getUserCount } from '@/lib/api/user';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  ...defaultMetaProps,
  title: 'Settings | MongoDB Starter Kit'
};

export default async function Settings() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }

  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const user = await getUser(session.user?.name as string);

  return <Profile settings={true} user={user} />;
}