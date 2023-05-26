import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>VTS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div>
            <div className='flex justify-center mt-6 mb-10'>
                <picture>
                    <img
                        className="w-64 h-auto"
                        src="/images/logo.png"
                        alt="company logo"
                        draggable='false'
                        rel="preload"
                        as='image'
                    />
                </picture>
            </div>
            <div className='flex justify-center mb-4'>
                <h1 className='text-2xl font-medium'>Visit</h1>
            </div>
            <div className='flex justify-center mb-4'>
                <Link href='/user/login'>
                    <div className='bg-green-200 hover:bg-green-300 px-12 py-8 rounded-lg'>
                        <h1 className='text-green-950 text-lg font-medium'>Patient's Login Page</h1>
                    </div>
                </Link>
            </div>
            <div className='flex justify-center mb-4'>
                <Link href='/provider/login'>
                    <div className='bg-blue-200 hover:bg-blue-300 px-12 py-8 rounded-lg'>
                        <h1 className='text-blue-950 text-lg font-medium'>Healthcare Provider's Login Page</h1>
                    </div>
                </Link>
            </div>
            <div className='flex justify-center'>
                <Link href='/admin/login'>
                    <div className='bg-orange-200 hover:bg-orange-300 px-12 py-8 rounded-lg'>
                        <h1 className='text-orange-950 text-lg font-medium'>Admin's Login Page</h1>
                    </div>
                </Link>
            </div>
        </div>
      </main>
    </>
  )
}
