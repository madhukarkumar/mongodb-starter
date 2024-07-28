'use client';

import { UserProps } from '@/lib/api/user';
import { getGradient } from '@/lib/gradients';
import {
  CheckInCircleIcon,
  CheckIcon,
  EditIcon,
  GitHubIcon,
  LoadingDots,
  UploadIcon,
  XIcon
} from '@/components/icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TextareaAutosize from 'react-textarea-autosize';
import { MDXRemote } from 'next-mdx-remote';

export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';

export default function Profile({
  settings,
  user
}: {
  settings?: boolean;
  user: UserProps;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    username: user.username,
    image: user.image,
    bio: user.bio || '',
    bioMdx: user.bioMdx
  });

  if (data.username !== user.username) {
    setData(user);
  }

  const [error, setError] = useState('');
  const settingsPage = settings;

  const handleDismiss = useCallback(() => {
    if (settingsPage) router.push(`/${user.username}`);
  }, [router, settingsPage, user.username]);

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const bioMdx = await response.json();
        setData({
          ...data,
          bioMdx
        });
        router.push(`/${user.username}`);
      } else if (response.status === 401) {
        setError('Not authorized to edit this profile.');
      } else {
        setError('Error saving profile.');
      }
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const onKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleDismiss();
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      await handleSave();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="min-h-screen pb-20 bg-black text-white">
      <div className={`${profileWidth} mt-8`}>
        <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-20 w-20">
                <Image
                  className="rounded-full"
                  src={user.image}
                  alt={user.name}
                  width={80}
                  height={80}
                />
              </div>
              <div className="ml-5 flex-grow">
                <h3 className="text-2xl leading-6 font-medium text-white">{user.name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-400">@{user.username}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-400">Email address</dt>
                <dd className="mt-1 text-sm text-gray-200">{user.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-400">Followers</dt>
                <dd className="mt-1 text-sm text-gray-200">{user.followers}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-400">Bio</dt>
                <dd className="mt-1 text-sm text-gray-200">
                  <article className="prose prose-sm max-w-none prose-invert">
                    <MDXRemote {...data.bioMdx} />
                  </article>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { name: 'Profile' },
  { name: 'Work History' },
  { name: 'Contact' }
];