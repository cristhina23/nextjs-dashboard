import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import ProfileForm from '@/app/ui/dashboard/profile-form';

export default async function Page() {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <UserCircleIcon className="w-12 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-700">Not Logged In</h2>
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  const user = await fetchUserByEmail(userEmail);

  if (!user) {
     return (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <UserCircleIcon className="w-12 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-700">User Not Found</h2>
          <p className="text-gray-500">Could not retrieve user details.</p>
        </div>
      );
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Profile</h1>
      </div>
      <div className="mt-8">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
