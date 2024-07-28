import { getUser, getAllUsers, UserProps, getUserCount } from '@/lib/api/user';
import { notFound } from 'next/navigation';
import Profile from '@/components/profile';
import Layout from '@/components/layout';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const user = await getUser(params.username);
  if (!user) {
    return {
      title: 'User Not Found',
      description: 'The requested user profile could not be found.',
    };
  }

  const ogUrl = `https://mongodb.vercel.app/${user.username}`;
  return {
    title: `${user.name}'s Profile | MongoDB Starter Kit`,
    description: user.bio || `${user.name}'s profile on MongoDB Starter Kit`,
    openGraph: {
      title: `${user.name}'s Profile | MongoDB Starter Kit`,
      description: user.bio || `${user.name}'s profile on MongoDB Starter Kit`,
      url: ogUrl,
      images: [`https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${user.name}'s Profile | MongoDB Starter Kit`,
      description: user.bio || `${user.name}'s profile on MongoDB Starter Kit`,
      images: [`https://api.microlink.io/?url=${ogUrl}&screenshot=true&meta=false&embed=screenshot.url`],
    },
  };
}

export default async function UserProfile({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }

  const results = await getAllUsers();
  const totalUsers = await getUserCount();

  return (
    <Layout results={results} totalUsers={totalUsers} username={user.username}>
      <Profile user={user} settings={false} />
    </Layout>
  );
}

export async function generateStaticParams() {
  const users = await getAllUsers();
  return users.flatMap(({ users }) =>
    users.map((user) => ({ username: user.username }))
  );
}

export const dynamicParams = true;