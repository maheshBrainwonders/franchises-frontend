"use client"
import { IFranchise } from "@/type/franchise.type";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const url = 'http://localhost:3006/api'

const FranchiseDescription = () => {
    const { id } = useParams();
    const router = useRouter();
    const [franchise, setFranchise] = useState<IFranchise | null>(null);

    useEffect(() => {
        const fetchFranchise = async () => {
            try {
                const response = await axios.get(`${url}/franchises/${id}`)
                setFranchise(response.data.data);
            } catch (error) {
                console.error("Error fetching franchise details:", error);
            }
        };

        if (id) fetchFranchise();
    }, [id]);

    if (!franchise) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-serif flex justify-center items-center">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4 text-center">{franchise.name}</h1>
                <img 
                    src={franchise.logo} 
                    alt={franchise.name} 
                    className="w-64 h-64 object-contain mb-4 mx-auto" 
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";
                    }} 
                />
                <p className="text-gray-700 mb-4">{franchise.description}</p>
                <h2 className="text-xl font-semibold mt-4">Industry: {franchise.industry}</h2>
                <p>Investment: ₹{franchise.investment_min} - ₹{franchise.investment_max}</p>
                <p>Franchise Fee: ₹{franchise.franchise_fee}</p>
                <p>Royalty Fee: {franchise.royalty_fee}%</p>
                <h3 className="text-lg font-semibold mt-4">Support Details:</h3>
                <p>{franchise.support_details}</p>
                <h3 className="text-lg font-semibold mt-4">Contact Information:</h3>
                <p>Email: {franchise.contact_email}</p>
                <p>Phone: {franchise.contact_phone}</p>
                <div className="mt-6 text-center">
                    <Button 
                        className="cursor-pointer"
                        onClick={() => router.back()}
                    >
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FranchiseDescription;