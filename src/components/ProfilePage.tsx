import { ReactElement, useState, useEffect } from "react";
import { supabase } from "./supabase";
import { useQuery } from "@tanstack/react-query";
import { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { fetchName } from "../utils/fetching";
import { skills } from "../utils/auraskills";

enum status {
  Loading,
  Done,
  NotFound,
  Error
}

interface profileData {
  [index: string]: string | number;
  uuid: string,
  balance: number,
  agility: number,
  alchemy: number,
  archery: number,
  defense: number,
  enchanting: number,
  excavation: number,
  farming: number,
  fighting: number,
  fishing: number,
  foraging: number,
  mining: number,
  total: number,
}

async function fetchProfiles(accessToken: string): Promise<Array<profileData>> {
  const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}api/profile/all`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function LoadingScreen(): ReactElement {
  return (
    <div className="flex grow justify-center items-center">
      <svg className="animate-spin size-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  )
}

function NotFoundScreen(): ReactElement {
  return (
    <div className="flex">
      <p>No associated accounts found. Please log in or request for your account to be linked.</p>
    </div>
  )
}

function Profile({data}: {data: profileData}): ReactElement {
  const [name, setName] = useState<string>("-");

  const result = useQuery({queryKey: ['mc_uuid', data.uuid], queryFn: () => fetchName(data.uuid), staleTime: 1000*60*5});
  useEffect(() => {
    if (!result.isPending && !result.isError) {
      setName(result.data.username);
    }
  }, [result])
  const skillComponent = [];
  let ignoreFlag = true;
  for (const skill of skills) {
    if (ignoreFlag) {
      ignoreFlag = false;
    } else {
      skillComponent.push(<div className="h-px bg-gray-300" />)
    }
    const temp = (
      <div className="flex flex-row justify-between">
        <p>{skill.charAt(0).toUpperCase() + skill.slice(1)}:</p>
        <p>{data[skill]}</p>
      </div>
    )
    skillComponent.push(temp);
  }
  return (
    <div className="flex flex-col text-white bg-gray-700/70 p-1 rounded-lg mt-5">
      {/* identifying info */}
      <div className="flex flex-row items-center gap-5">
        <img src={`https://mc-heads.net/head/${data.uuid}`} alt={`${name}`} className="size-32" />
        <div className="flex flex-col font-nunito">
          <span className="text-2xl font-semibold">{name}</span>
          <p className="flex flex-row items-center gap-2 text-xl">
            <span>Balance:</span>
            <div className="flex flex-row items-center gap-0.5">
              {data.balance}
              <img src="/Ether_drop_icon.png" title="Ether Drop" alt="Ether Drop" className="size-6 md:size-8"/>
            </div>
          </p>
          <p className=""><span>Level:</span> {data.total}</p>
        </div>
      </div>
      {/* Stats */}
      <div className="text-sm md:text-xl select-none font-nunito font-semibold flex grow flex-col content-between">

        {skillComponent}
        {/* <p>Agility: {data.agility}</p>
        <p>Alchemy: {data.alchemy}</p>
        <p>Archery: {data.archery}</p>
        <p>Defense: {data.defense}</p>
        <p>Enchanting: {data.enchanting}</p>
        <p>Excavation: {data.excavation}</p>
        <p>Farming: {data.farming}</p>
        <p>Fighting: {data.fighting}</p>
        <p>Fishing: {data.fishing}</p>
        <p>Foraging: {data.foraging}</p>
        <p>Mining: {data.mining}</p> */}
      </div>
    </div>
  )
}

function StatusSwitch({currentStatus, profiles}: {currentStatus: status, profiles: Array<profileData>}): ReactElement {
  const [index, setIndex] = useState(-1);
  const [uuid, setUuid] = useState("");
  switch (currentStatus) {
    case status.Loading:
      return <LoadingScreen />
    case status.Done:
      if (index == -1 || index >= profiles.length || profiles[index].uuid !== uuid) {
        setIndex(0);
        setUuid(profiles[0].uuid);
      }

      return (
        <div className="flex flex-row">
          <Profile data={profiles[index]} />
        </div>

      )
    case status.Error:
      return (
        <span>Error detected. Check console for more details.</span>
      )
    default:
      return <NotFoundScreen />
  }
}

export function ProfilePage(): ReactElement {
  const [loading, setLoading] = useState<status>(status.Loading);
  const [session, setSession] = useState<Session | null>(null);
  const [profiles, setProfiles] = useState<profileData[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      setSession(data.session);
    };
    fetchSession();
    const { data } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, updatedSession: Session | null) => {
        setSession(updatedSession);
      }
    );
    return () => {data.subscription.unsubscribe()};
  }, []);
  let accessToken = "";
  if (session?.access_token) {
    accessToken = session.access_token;
  }
  const result = useQuery({
    queryKey: ['profiles', accessToken],
    queryFn: () => fetchProfiles(accessToken),
    staleTime: 1000 * 60,
    enabled: !!accessToken
  })

  useEffect(() => {
    if (result.error) {
      console.log(result.error);
      setLoading(status.Error);
    } else if (!result.isPending) {
      setProfiles(result.data);
      if (result.data.length > 0) {
        setLoading(status.Done);
      } else {
        setLoading(status.NotFound);
      }
    }

  }, [result.error, result.isPending, result.data, accessToken]);

  return (
    <div className="flex justify-center items-center grow bg-[url('/mc_home.png')] bg-cover bg-center w-screen h-full">
      <StatusSwitch currentStatus={loading} profiles={profiles} />
    </div>
  )
}