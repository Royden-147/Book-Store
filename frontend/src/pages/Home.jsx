import React from 'react'
import Hol from "../components/Home/Hol";
import RecentlyAdded from '../components/Home/RecentlyAdded';

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
        <Hol />
        <RecentlyAdded />
    </div>
  );
};

export default Home;