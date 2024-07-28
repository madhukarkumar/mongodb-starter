import { notFound } from 'next/navigation';
import { defaultMetaProps } from '@/components/layout/meta';
import { getUser, getAllUsers, getUserCount } from '@/lib/api/user';
import Profile from '@/components/profile';
import clientPromise from '@/lib/mongodb';

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    await clientPromise;
  } catch (e: any) {
    return [];
  }

  const results = await getAllUsers();
  return results.flatMap(({ users }) =>
    users.map((user) => ({ username: user.username }))
  );
}

export async function generateMetadata({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);
  if (!user) {
    return {};
  }

  const ogUrl = `https://mongodb.vercel.app/${user.username}`;
  return {
    ...defaultMetaProps,
    title: `${user.name}'s Profile | MongoDB Starter Kit`,
    openGraph: {
      images: [`https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`],
      url: `https://mongodb.vercel.app/${user.username}`
    }
  };
}

export default async function UserProfile({ params }: { params: { username: string } }) {
  try {
    await clientPromise;
  } catch (e: any) {
    if (e.code === 'ENOTFOUND') {
      return <div>Cluster is still provisioning. Please try again later.</div>;
    } else {
      throw new Error(`Connection limit reached. Please try again later.`);
    }
  }

  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }

  const results = await getAllUsers();
  const totalUsers = await getUserCount();

  return <Profile user={user} settings={false} />;
}

export const revalidate = 10;