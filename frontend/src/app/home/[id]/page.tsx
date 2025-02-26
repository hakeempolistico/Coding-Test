"use client";

import { useParams } from 'next/navigation';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const HomePage: NextPage = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;
  
    const fetchData = async () => {
      try {
        console.log(`Fetching data from: http://localhost:5000/streaks/${id}`);
        const response = await fetch(`http://localhost:5000/streaks/${id}`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        setData(result);
        console.log("Fetched data:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [id]);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Dynamic ID: {id}</p>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default HomePage;