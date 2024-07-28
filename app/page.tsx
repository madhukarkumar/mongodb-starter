import Profile from '@/components/profile';
import Layout from '@/components/layout';
import {
  getAllUsers,
  getUserCount,
  getFirstUser
} from '@/lib/api/user';
import { Metadata } from 'next';
import clientPromise from '@/lib/mongodb';

export const revalidate = 10;

export const metadata: Metadata = {
  title: 'MongoDB Starter Kit',
  description: 'MongoDB Starter Kit built with Next.js, Vercel, and MongoDB Atlas.',
};

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

  return (
    <Layout results={results} totalUsers={totalUsers} username={user.username}>
      <Profile user={user} settings={false} />
    </Layout>
  );
}