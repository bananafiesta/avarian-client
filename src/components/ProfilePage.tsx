import { ReactElement, useState, useEffect } from "react";
import { supabase } from "./supabase";
import { useQuery } from "@tanstack/react-query";
import { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { fetchName } from "../utils/fetching";
import { skills } from "../utils/auraskills";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";

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
      <div className="bg-gray-600/70 text-white p-4 rounded-xl">
        <svg className="animate-spin size-24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
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
  }, [result.isPending, result.isError, result.data])
  const skillComponent = [];
  for (const skill of skills) {
    skillComponent.push(<div className="h-px bg-gray-300" />)
    const temp = (
      <div className="flex flex-row justify-between">
        <p>{skill.charAt(0).toUpperCase() + skill.slice(1)}:</p>
        <p>{data[skill]}</p>
      </div>
    )
    skillComponent.push(temp);
  }
  return (
    <div className="flex flex-col text-white bg-gray-700/70 p-1 rounded-lg mt-1">
      {/* identifying info */}
      <div className="flex flex-row grow items-center gap-5 mx-3">
        <img src={`https://mc-heads.net/head/${data.uuid}`} alt={`${name}`} className="size-24 md:size-32" />
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
        <p className="text-center mt-1">Skills</p>
        {skillComponent}
      </div>
    </div>
  )
}

function ProfileDropdown({profiles, index, setIndex}: {profiles: Array<profileData>, index: number, setIndex: (arg0: number) => (void)}): ReactElement{
  let count = 0;
  return (
  <>
  <Listbox value={index} onChange={setIndex}>
    <ListboxButton className="bg-gray-700/70 rounded-xl mb-1 flex flex-row justify-between font-nunito text-white items-center px-2 text-lg hover:bg-gray-700/50">
      Select account ...
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>

    </ListboxButton>
    <ListboxOptions transition anchor="bottom start" className="w-[var(--button-width)] border border-gray-500/5 [--anchor-gap:2px] rounded-xl transition ease-in duration-150 data-[closed]:opacity-0 bg-gray-600 p-1">
      {profiles.map((profile) => (
        <ListboxOption key={profile.uuid} value={count++} className="flex flex-row font-nunito text-white items-center gap-4 px-2 data-[focus]:bg-white/10 rounded-xl">
          <DropdownRow profile={profile}/>
        </ListboxOption>
      ))}
    </ListboxOptions>
  </Listbox>
  </>
)
}

function DropdownRow({profile}: {profile: profileData}): ReactElement {
  const [name, setName] = useState('-');
  const result = useQuery({queryKey: ['mc_uuid', profile.uuid], queryFn: () => fetchName(profile.uuid), staleTime: 1000*60*5});
  useEffect(() => {
    if (!result.isPending && !result.isError) {
      setName(result.data.username);
    }
  }, [result.isPending, result.isError, result.data])
  return (
      <>
      <img src={`https://mc-heads.net/head/${profile.uuid}`} alt={`${name}`} className="size-12" />
      {name}
      </>
  )
}

function StatusSwitch({currentStatus, profiles}: {currentStatus: status, profiles: Array<profileData>}): ReactElement {
  const [index, setIndex] = useState(-1);
  const [uuid, setUuid] = useState("");
  switch (currentStatus) {
    case status.Loading:
      return (
        <LoadingScreen />
      )
    case status.Done:
      if (index == -1 || index >= profiles.length || profiles[index].uuid !== uuid) {
        setIndex(0);
        setUuid(profiles[0].uuid);
      }

      return (
        <div className="flex flex-col">
          {/* {profiles.length > 1 ? <ProfileDropdown profiles={profiles} index={index} setIndex={setIndex} /> : <></>} */}
          <ProfileDropdown profiles={profiles} index={index} setIndex={setIndex} />
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