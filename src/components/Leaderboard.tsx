import { ReactElement, useEffect, useState } from "react";

interface playerJson {
  player_uuid: string,
  total: number
}

function LoadingScreen(): ReactElement {
  return (
    <div className="flex">
      <svg className="animate-spin size-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    </div>
  )
}

function LeaderboardRow({playerJson, count}: {playerJson: playerJson, count: number}): ReactElement {
  const [name, setName] = useState<string>("-");
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
      <td><img src={`https://mc-heads.net/avatar/${uuid}`} alt={name} className="size-8 border border-gray-400/50"/></td>
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
    <div className="flex justify-center items-center grow bg-[url('/mc_home.png')] bg-cover bg-center">
      <div className="bg-white/50 p-1 rounded-lg">
        {loading 
          ? <LoadingScreen /> 
          : 
          <table className="table-auto border-separate place-items-center border-spacing-x-5 border-spacing-y-4">
            <thead className="">
              <tr className="">
                <th className="">Rank</th>
                <th className=""></th>
                <th className="">Name</th>
                <th className="">Levels</th>
              </tr>
            </thead>
            <tbody className="text-lg font-dosis font-semibold text-center">
              {leaderboard}
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}