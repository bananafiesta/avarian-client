import { ReactElement, useEffect, useState } from "react";
import { Select } from "@headlessui/react";

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

function LeaderboardDropdown({skill, setSkill}: {skill: string, setSkill: (arg0: string) => void}): ReactElement {
  return (
    <Select value={skill} onChange={option => setSkill(option.target.value)} className="mr-3 text-center font-medium rounded-full bg-gray-100/60 data-[hover]:bg-gray-100/90 w-2/5">
      <option value="total">Total</option>
      <option value="agility">Agility</option>
      <option value="alchemy">Alchemy</option>
      <option value="archery">Archery</option>
      <option value="defense">Defense</option>
      <option value="enchanting">Enchanting</option>
      <option value="excavation">Excavation</option>
      <option value="farming">Farming</option>
      <option value="fighting">Fighting</option>
      <option value="fishing">Fishing</option>
      <option value="foraging">Foraging</option>
      <option value="mining">Mining</option>
    </Select>
  )
}

export function Leaderboard(): ReactElement {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<ReactElement[]>([]);
  const [skill, setSkill] = useState<string>("total");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}api/leaderboard/${skill}`, { method: "GET"});
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
  }, [skill]);
  return (
    <div className="flex justify-center items-center grow bg-[url('/mc_home.png')] bg-cover bg-center">
      <div className="bg-white/50 py-1 mb-1 rounded-lg">
        {loading 
          ? <LoadingScreen /> 
          : 
          <>
          <div className="flex flex-row justify-between mt-1 font-dosis">
            <p className="px-5 self-end text-xl font-medium">Leaderboard</p>
            <LeaderboardDropdown skill={skill} setSkill={setSkill} />
          </div>
          <table className="table-auto border-separate place-items-center border-spacing-x-5 border-spacing-y-4">
            <thead className="">
              <tr className="font-dosis">
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
          </>
        }
      </div>
    </div>
  )
}