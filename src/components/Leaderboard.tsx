import { ReactElement, useEffect, useState } from "react";

interface playerJson {
  player_uuid: string,
  total: number
}

function LoadingScreen(): ReactElement {
  return (
    <div className="flex">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-32 animate-spin">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    </div>
  )
}

function LeaderboardRow({playerJson, count}: {playerJson: playerJson, count: number}): ReactElement {
  const [name, setName] = useState<string>("Test");
  const uuid = playerJson.player_uuid;
  const total = playerJson.total;
  useEffect(() => {
    const fetchName = async () => {

      const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}api/mojang/${uuid}`, { method: "GET"});
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
      const json = await response.json();
      if (!ignore) {
        setName(json.username);
      }
      
    }
    let ignore = false;
    fetchName();
    return () => {
      ignore = true;
    }
  }, [uuid]);
  return (
    <tr className="">
      <td>{count}</td>
      <td><img src={`https://mc-heads.net/avatar/${uuid}`} alt={name} className="size-8"/></td>
      <td>{name}</td>
      <td>{total}</td>
    </tr>
  )
}

export function Leaderboard(): ReactElement {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<ReactElement[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}api/leaderboard`, { method: "GET"});
        if (!response.ok) {
          throw new Error(`HTTP error. status: ${response.status}`);
        } else {
          const json = await response.json();
          const entries = [];
          let count = 1;
          for (const player of json as Array<playerJson>) {
            entries.push(<LeaderboardRow playerJson={player} count={count} key={count}/>)
            count++;
          }
          if (!ignore) {
            setLeaderboard(entries);
            setLoading(false);
          }

        }
      } catch (error) {
        console.log(error);
      }
    };
    let ignore = false;
    fetchData();
    return () => {
      ignore = true;
    }
  }, []);
  return (
    <div className="flex justify-center items-center grow">
      {loading 
        ? <LoadingScreen /> 
        : 
        <table className="table-auto border-collapse border border-black place-items-center">
          <thead className="">
            <tr className="">
              <th className="">Rank</th>
              <th className=""></th>
              <th className="">Name</th>
              <th className="">Levels</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard}
          </tbody>
        </table>}
    </div>
  )
}