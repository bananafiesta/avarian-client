import { ReactElement, useEffect, useState } from "react";
import { Select } from "@headlessui/react";
import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";

interface playerJson {
  player_uuid: string,
  total: number
}

const skills = [
  "agility",
  "alchemy",
  "archery",
  "defense",
  "enchanting",
  "excavation",
  "farming",
  "fighting",
  "fishing",
  "foraging",
  "mining",
  "total"
]

async function fetchLeaderboard(skill: string) {
  const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}api/leaderboard/${skill}`, {method: "GET"});
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
}

async function fetchName(uuid: string) {
  const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}api/mojang/${uuid}`, { method: "GET"});
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
}

function LoadingScreen(): ReactElement {
  return (
    <div className="flex grow justify-center">
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
  const result = useQuery({queryKey: ['mc_uuid', uuid], queryFn: () => fetchName(uuid), staleTime: 1000*60*5});
  useEffect(() => {
    if (!result.isPending && !result.isError) {
      setName(result.data.username);
    }
  }, [result])

  return (
    <tr className="">
      <td>{count}</td>
      <td><img src={`https://mc-heads.net/avatar/${uuid}`} alt={name} className="size-8 border border-gray-400/50"/></td>
      <td>{name}</td>
      <td>{total}</td>
    </tr>
  )
}

function LeaderboardTable({leaderboardMap}: {leaderboardMap: Map<string, UseQueryResult>}): ReactElement {
  const [skill, setSkill] = useState<string>("total");
  const currentQuery = leaderboardMap.get(skill);
  if (!currentQuery) {
    return <span>Error: Map pairing undefined.</span>
  }
  return (
    <>
    <div className="flex flex-row justify-between mt-1 font-dosis">
      <p className="px-5 self-end text-xl font-medium">Leaderboard</p>
      <LeaderboardDropdown skill={skill} setSkill={setSkill} />
    </div>
    
    <LeaderboardLoader currentQuery={currentQuery} />
    </>
  )
}

function LeaderboardLoader({currentQuery}: {currentQuery: UseQueryResult}): ReactElement {
  if (currentQuery.isPending) {
    return <LoadingScreen />
  }
  if (currentQuery.error) {
    return <span>Error: {currentQuery.error.message}</span>
  }
  const entries = [];
  let count = 1;
  for (const player of currentQuery.data as Array<playerJson>) {
    entries.push(<LeaderboardRow playerJson={player} count={count} key={count}/>)
    count++;
  }
  return (
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
      {entries}
    </tbody>
  </table>
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
  const [leaderboards, setLeaderboards] = useState<Map<string, UseQueryResult>>(new Map());

  const leaderboardQueries = useQueries({
    queries: skills.map((skill) => {
      return {
        queryKey: ['leaderboard', skill],
        queryFn: () => fetchLeaderboard(skill),
        staleTime: 1000 * 60 * 5,
      }
    })
  })
  useEffect(() => {
    const leaderboardMap = new Map();
    for (let i = 0; i < skills.length; i++) {
      leaderboardMap.set(skills[i], leaderboardQueries[i])
    }
    setLeaderboards(leaderboardMap);
  
  }, [leaderboardQueries])

  return (
    <div className="flex justify-center items-center grow bg-[url('/mc_home.png')] bg-cover bg-center">
      <div className="bg-white/50 py-1 mb-1 rounded-lg">
        <LeaderboardTable leaderboardMap={leaderboards} />
      </div>
    </div>
  )
}