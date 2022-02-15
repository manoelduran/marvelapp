import axios from "axios";
const { PUBLIC_KEY } = process.env;

export const api = axios.create({
    baseURL: 'https://gateway.marvel.com:443/'
})


export async function GetCharacters(): Promise<Characters> {
    const timestamp = '1644612940';
    const hash = '82f7f9e585228211211e427d03f830f1';
    const response = await api.get<Characters>(`v1/public/characters?orderBy=name&limit=100&ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`);
    return response.data;
};

export async function searchCharacter(name: string): Promise<Characters> {
    const timestamp = '1644612940';
    const hash = '82f7f9e585228211211e427d03f830f1';
    const response = await api.get<Characters>(`v1/public/characters?name=${name}&ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`);
    return response.data;
};

export async function getCharacter(id: number): Promise<Character> {
    const timestamp = '1644612940';
    const hash = '82f7f9e585228211211e427d03f830f1';
    const response = await api.get<Character>(`v1/public/characters/${id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`);
    return response.data;
};