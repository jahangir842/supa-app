import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to SupaApp</h1>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
          A modern task management application built with Next.js and Supabase
        </p>
        <div className="space-x-4">
          <Link
            href="/auth/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    )
  }

  return redirect('/dashboard')
}
