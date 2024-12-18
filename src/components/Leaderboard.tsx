import { ReactElement, useEffect, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchName } from "../utils/fetching";

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

function LoadingScreen(): ReactElement {
  return (
    <div className="flex grow justify-center items-center">
      <svg className="animate-spin size-24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
  }, [result.data, result.isPending, result.isError])

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
    <div className="flex flex-row w-2/3 justify-between mt-1">
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
    <div className="overflow-y-auto h-screen">
      <table className="table-auto border-separate place-items-center border-spacing-x-5 border-spacing-y-4">
        <thead className="">
          <tr className="">
            <th className="">Rank</th>
            <th className=""></th>
            <th className="">Name</th>
            <th className="">Levels</th>
          </tr>
        </thead>
        <tbody className="text-lg font-semibold text-center">
          {entries}
        </tbody>
      </table>
    </div>
  )
}

function LeaderboardDropdown({skill, setSkill}: {skill: string, setSkill: (arg0: string) => void}): ReactElement {
  return (
    <Listbox value={skill} onChange={setSkill}>
      <ListboxButton className="bg-gray-700/70 rounded-xl mb-1 flex flex-row justify-between font-nunito text-white items-center px-2 text-lg hover:bg-gray-700/50 w-2/5">
        {skill.charAt(0).toUpperCase() + skill.slice(1)}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </ListboxButton>
      <ListboxOptions transition anchor="bottom start" className="w-[var(--button-width)] border border-gray-500/5 [--anchor-gap:2px] rounded-xl transition ease-in duration-150 data-[closed]:opacity-0 bg-gray-600 p-1">
        <ListboxOption key={"total"} value={"total"} className="flex flex-row font-nunito text-white items-center gap-4 px-2 data-[focus]:bg-white/10 rounded-xl">
          Total
        </ListboxOption>
        {skills.map((currSkill) => (
          <ListboxOption key={currSkill} value={currSkill} className="flex flex-row font-nunito text-white items-center gap-4 px-2 data-[focus]:bg-white/10 rounded-xl">
            {currSkill.charAt(0).toUpperCase() + currSkill.slice(1)}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
 
  )
}

const leaderboardMap = new Map();

export function Leaderboard(): ReactElement {

  const leaderboardQueries = useQueries({
    queries: skills.map((skill) => {
      return {
        queryKey: ['leaderboard', skill],
        queryFn: () => fetchLeaderboard(skill),
        staleTime: 1000 * 60 * 5,
      }
    })
  })

  for (let i = 0; i < skills.length; i++) {
    leaderboardMap.set(skills[i], leaderboardQueries[i])
  }

  return (
    <div className="flex justify-center items-center grow bg-[url('/mc_home.png')] bg-cover bg-center relative">
      <div className="bg-gray-700/50 text-white font-nunito mb-1 rounded-lg flex flex-col items-center absolute top-[2%] bottom-[5%] px-5 md:w-1/3 min-w-80">
        <LeaderboardTable leaderboardMap={leaderboardMap} />
      </div>
    </div>
  )
}