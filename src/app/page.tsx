"use client"
import { Button } from "@/components/ui/button";
import { IFranchise } from "@/type/franchise.type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const router = useRouter()
  const [franchises, setFranchises] = useState<IFranchise[] | null>(null)


  const getAllFranchises = async () => {
    try {
      const response = await axios.get(`http://localhost:3006/api/franchises`)
      console.log(response.data)
      setFranchises(response.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    getAllFranchises()
  }, [])
  if (!franchises) {
    return <h1>Loading....</h1>
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-serif center">
      <nav className="bg-gray-600 p-4 text-white text-center text-xl font-bold">
        Franchise Listings  
      </nav>
      <div className="container mx-auto mt-6">
        <h1 className="text-2xl font-semibold text-black text-center mb-4">Available Franchises</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {franchises!.map((franchise, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <img src={franchise.logo} alt={franchise.name} className=" h-34 mx-auto" width="250" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";
              }} />
              <h2 className="text-lg font-bold mt-2">{franchise.name}</h2>
              <p className="text-gray-600">Industry: {franchise.industry}</p>
              <p className="text-gray-600">Investment: ₹{franchise.investment_min} - ₹{franchise.investment_max}</p>
              <p className="text-gray-600">Franchise Fee: ₹{franchise.franchise_fee}</p>
              <p className="text-gray-600">Royalty Fee: {franchise.royalty_fee}%</p>
              <p className="text-gray-600">Locations: {franchise.locations.join(", ")}</p>
              <p className="text-gray-600">Support: {franchise.support_details}</p>
              <p className="text-gray-600">Contact: {franchise.contact_email} | {franchise.contact_phone}</p>
              
              <Button className="cursor-pointer" onClick={() => {
                router.push(`/${franchise._id}`)
              }}>Explore</Button>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
