import axios from "axios";
const { PUBLIC_KEY } = process.env;

export const api = axios.create({
    baseURL: 'https://gateway.marvel.com/'
})


async function GetCharacters() {
    const timestamp = '1644612940'
    const hash = '82f7f9e585228211211e427d03f830f1'

    const response = await api.get(`v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`);
    return response.data();
}

https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}