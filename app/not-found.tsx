import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | MongoDB Starter Kit',
  description: 'User not found',
};

export default function NotFound() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <h1 className="text-2xl font-light text-white">
        404 <span className="mx-3 text-4xl">|</span> User Not Found
      </h1>
    </div>
  );
}