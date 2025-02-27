"use client";

import { useParams } from 'next/navigation';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { StreakDay, StreakResponse } from '@/types/streak.type';
import { fetchData } from '@/services/api.service';
import { CardDay } from '@/components/CardDay';

const HomePage: NextPage = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState<StreakResponse | null>(null);
  
  useEffect(() => {
    if (!id) return;
  
    const handleFetch = async () => {
      try {
        const data = await fetchData(Number(id));
        setData(data);
      } catch (error) {
        throw error;
      }
    };
  
    handleFetch();
  }, [id]);

  return (
    <div className="body-container">

      <section>
        <h1>Your streak is {data?.total ?? 0} days</h1>

        <div className="streak-box">

          {data?.days?.map((day: StreakDay, index) => (
            <CardDay key={index} day={day} />
          ))}
          
        </div>
      </section>
    </div>
  );
};

export default HomePage;