"use client";
import { useAuth } from '@/contexts/auth-context';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './button';

function LogoutButton() {
  const router = useRouter();
  
  const { signOut } = useAuth();
  async function handleSignOut(){
    await signOut();
    router.push('/');
  }
  return (
    <Button
      onClick={handleSignOut}
      variant={'ghost'}
      color='black'
      className="p-2 rounded-full transition active:scale-90"
    >
      <LogOut  className='ml-2 pointer ' />
    </Button>
  )
}

export default LogoutButton