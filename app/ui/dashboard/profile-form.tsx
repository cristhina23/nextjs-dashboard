'use client';

import { User } from '@/app/lib/definitions';
import { PencilIcon, UserCircleIcon, EnvelopeIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { updateUser } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function ProfileForm({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const initialState = { message: '', errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  // @ts-ignore
  const [state, dispatch] = useFormState(updateUserWithId, initialState);
  
  const handleCancel = () => {
      setIsEditing(false);
  }

  // If update is successful, switch back to view mode
  if (state.message === 'Profile Updated Successfully' && isEditing === true) {
      setIsEditing(false);
  }

  return (
    <div className="rounded-xl bg-gray-50 p-6 md:p-12 relative">
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 transition-colors bg-white shadow-sm border border-gray-100"
          aria-label="Edit Profile"
        >
          <PencilIcon className="w-5 h-5 text-gray-600" />
        </button>
      )}

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
        <div className="flex items-center justify-center rounded-full bg-blue-100 p-4">
          <UserCircleIcon className="w-24 h-24 text-blue-600" />
        </div>

        <div className="flex-grow space-y-4">
          {isEditing ? (
            <form action={dispatch} className="space-y-4 max-w-md">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={user.name}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {state.errors?.name && (
                        <p className="mt-2 text-sm text-red-500">{state.errors.name[0]}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                     <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={user.email}
                           className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                         <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                     {state.errors?.email && (
                        <p className="mt-2 text-sm text-red-500">{state.errors.email[0]}</p>
                    )}
                </div>
                
                 <div>
                     <label className="block text-sm font-medium text-gray-500 mb-1">ID (Read Only)</label>
                      <div className="flex items-center gap-2 text-gray-500 bg-gray-100 p-2 rounded border border-gray-200">
                         <IdentificationIcon className="w-5 h-5" />
                         <span className="font-mono text-sm">{user.id}</span>
                     </div>
                 </div>

                 <div className="flex gap-4 mt-6">
                    <SaveButton />
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                 </div>
                 {state.message && state.message !== 'Profile Updated Successfully' && (
                     <p className="text-sm text-red-500 mt-2">{state.message}</p>
                 )}
            </form>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <UserCircleIcon className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <IdentificationIcon className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p className="text-base font-mono text-gray-700">{user.id}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SaveButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="mt-0" aria-disabled={pending}>
            {pending ? 'Saving...' : 'Save Changes'}
        </Button>
    )
}
