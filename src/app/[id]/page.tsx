"use client"
import { IFranchise } from "@/type/franchise.type";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const url = 'http://localhost:3006/api'
const FranchiseDescription = () => {
    const { id } = useParams();
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
        <div className="container mx-auto p-6 center font-serif">
            <h1 className="text-3xl font-bold mb-4">{franchise.name}</h1>
            <img src={franchise.logo} alt={franchise.name} className="w-64 h-64 object-contain mb-4" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";
            }} />
            <p className="text-gray-700">{franchise.description}</p>
            <h2 className="text-xl font-semibold mt-4">Industry: {franchise.industry}</h2>
            <p>Investment: ${franchise.investment_min} - ${franchise.investment_max}</p>
            <p>Franchise Fee: ${franchise.franchise_fee}</p>
            <p>Royalty Fee: {franchise.royalty_fee}%</p>
            <h3 className="text-lg font-semibold mt-4">Support Details:</h3>
            <p>{franchise.support_details}</p>
            <h3 className="text-lg font-semibold mt-4">Contact Information:</h3>
            <p>Email: {franchise.contact_email}</p>
            <p>Phone: {franchise.contact_phone}</p>
        </div>
    );
};

export default FranchiseDescription;
