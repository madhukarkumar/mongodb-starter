import Profile from '@/components/profile';
import {
  getAllUsers,
  UserProps,
  getUserCount,
  getFirstUser
} from '@/lib/api/user';
import { defaultMetaProps } from '@/components/layout/meta';
import clientPromise from '@/lib/mongodb';

export const revalidate = 10;

export default async function Home() {
  try {
    await clientPromise;
  } catch (e: any) {
    if (e.code === 'ENOTFOUND') {
      return <div>Cluster is still provisioning. Please try again later.</div>;
    } else {
      throw new Error(`Connection limit reached. Please try again later.`);
    }
  }

  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const user = await getFirstUser();

  return <Profile user={user} settings={false} />;
}

export async function generateMetadata() {
  return defaultMetaProps;
}