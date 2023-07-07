import axios from "axios";

export const getHomeVideos = async () => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://youtube138.p.rapidapi.com/home/',
      params: {hl: 'en', gl: 'US' },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}