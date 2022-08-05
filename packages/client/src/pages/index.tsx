import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-amber-400 w-screen h-screen'>
      <h1 className='text-white font-black text-6xl my-4'>Hello web3.0!</h1>
      <h2 className='text-teal-600 font-bold text-4xl '>
        Next.js + solidity + hardhat + ethers.js
      </h2>
      <p className='text-white text-3xl'>starter</p>
    </div>
  );
};

export default Home;
