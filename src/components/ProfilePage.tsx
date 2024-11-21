import { ReactElement, useState, useEffect } from "react";
import { supabase } from "./supabase";
import { useQuery } from "@tanstack/react-query";
import { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { fetchName } from "../utils/fetching";

interface economy_obj {
  balance: number,
  uid: string
}

enum status {
  Loading,
  Done,
  NotFound,
  Error
}

async function fetchWallet(accessToken: string): Promise<Array<economy_obj>> {
  const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}api/profile/wallet`, {
    method: "GET",
    headers: {
      'Authorization' : accessToken
    }
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok`);
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

function Profile({wallets}: {wallets: ReactElement[]}): ReactElement {
  return (
    <table className="table-auto border-separate place-items-center border-spacing-x-5 border-spacing-y-4">
      <thead className="">
        <tr className="font-semibold">
          <th className=""></th>
          <th className="">Name</th>
          <th className="">Balance</th>
        </tr>
      </thead>
      <tbody className="font-dosis text-lg font-semibold text-center">
        {wallets}
      </tbody>
    </table>
  )
}

function statusSwitch(currentStatus: status, wallets: Array<ReactElement>): ReactElement {
  switch (currentStatus) {
    case status.Loading:
      return <LoadingScreen />
    case status.Done:
      return (
        <Profile wallets={wallets} />
      )
    case status.Error:
      return (
        <span>Error detected. Check console for more details.</span>
      )
    default:
      return <NotFoundScreen />
  }
}

function Wallet({economy_obj} : {economy_obj: economy_obj}): ReactElement {
  const uuid = economy_obj.uid;
  const balance = economy_obj.balance;
  const [name, setName] = useState<string>("-");

  const result = useQuery({queryKey: ['mc_uuid', uuid], queryFn: () => fetchName(uuid), staleTime: 1000*60*5});
  useEffect(() => {
    if (!result.isPending && !result.isError) {
      setName(result.data.username);
    }
  }, [result])

  return (
    <tr className="">
      <td><img src={`https://mc-heads.net/avatar/${uuid}`} alt={name} className="size-8 border border-gray-400/50"/></td>
      <td>{name}</td>
      <td>${balance}</td>
    </tr>
  )
}

export function ProfilePage(): ReactElement {
  const [loading, setLoading] = useState<status>(status.Loading);
  const [wallets, setWallets] = useState<ReactElement[]>([]);

  const [session, setSession] = useState<Session | null>(null);

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
    queryKey: ['wallets', accessToken],
    queryFn: () => fetchWallet(accessToken),
    staleTime: 1000 * 60,
    enabled: !!accessToken
  })

  useEffect(() => {
    if (!accessToken) {
      setLoading(status.NotFound)
    } else if (result.error) {
      console.log(result.error);
      setLoading(status.Error);
    } else if (!result.isPending) {
      const entries = []
      let count = 1
      for (const wallet of result.data as Array<economy_obj>) {
        entries.push(<Wallet economy_obj={wallet} key={count} />);
        count++;
      }
      if (count > 1) {
        setWallets(entries);
        setLoading(status.Done);
      } else {
        setLoading(status.NotFound);
      }
    }

  }, [result.error, result.isPending, result.data, accessToken]);

  return (
    <div className="flex justify-center items-center grow bg-[url('/mc_home.png')] bg-cover bg-center">
      <div className="bg-white/50 p-1 rounded-lg">
        {statusSwitch(loading, wallets)}
      </div>
    </div>
  )
}