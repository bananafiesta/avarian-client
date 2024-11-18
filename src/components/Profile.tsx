import { ReactElement, useState, useEffect } from "react";
import { supabase } from "./supabase";

interface economy_obj {
  balance: number,
  uid: string
}

function LoadingScreen(): ReactElement {
  return (
    <div className="flex">
      <svg className="animate-spin size-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    </div>
  )
}

function Wallet({economy_obj} : {economy_obj: economy_obj}): ReactElement {
  const uuid = economy_obj.uid;
  const balance = economy_obj.balance;
  const [name, setName] = useState("");

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
      <td><img src={`https://mc-heads.net/avatar/${uuid}`} alt={name} className="size-8"/></td>
      <td>{name}</td>
      <td>${balance}</td>
    </tr>
  )
}

export function Profile(): ReactElement {
  const [loading, setLoading] = useState(true);
  const [wallets, setWallets] = useState<ReactElement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        if (data.session?.access_token) {
          const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}api/profile/wallet`, {
            method: "GET",
            headers: {
              'Authorization' : data.session.access_token
           }
          
          });
          if (!response.ok) {
            throw new Error(`HTTP error. status: ${response.status}`);
          } else {
            const json = await response.json();
            const entries = [];
          
            for (const wallet of json as Array<economy_obj>) {
              entries.push(<Wallet economy_obj={wallet} />)
            }
            if (!ignore) {
              setWallets(entries);
              setLoading(false);
            }
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
              <th className=""></th>
              <th className="">Name</th>
              <th className="">Balance</th>
            </tr>
          </thead>
          <tbody>
            {wallets}
          </tbody>
        </table>}
    </div>
  )
}