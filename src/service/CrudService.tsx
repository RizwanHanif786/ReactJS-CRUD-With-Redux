import axios from "axios";
import {API_TOURNAMENTS_URL} from "../constants/api"

export const getAllTournaments = async (queryParams?:any) => {
    const res = await axios.get(API_TOURNAMENTS_URL);
    return res.data;
}

export const getTournamentsBySearch = async (queryParams?:any) => {
    const res = await axios.get(`${API_TOURNAMENTS_URL}?q=${queryParams}`);
    return res.data;
}

export const addTournament = async (tournamentName:any) => {
    const res = await axios.post(API_TOURNAMENTS_URL, {
        name: tournamentName,
    });
    return res.data;
}

export const deleteTournament = async (id: string) => {
    const res = await axios.delete(`${API_TOURNAMENTS_URL}/${id}`);
    return res.data;
}

export const updateTournament = async (id: string, updatedTournamnet: any) => {
    const res = await axios.put(`${API_TOURNAMENTS_URL}/${id}`, updatedTournamnet );
    return res.data;
}