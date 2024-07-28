import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }
  redirect(`/${session.user?.name}`);
}