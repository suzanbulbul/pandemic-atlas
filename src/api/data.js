import axios from 'axios';

const apiConfig = {
  headers: {
    'X-RapidAPI-Key': process.env.API_TOKEN,
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
  }
};

export async function getData() {
  try {
    const response = await axios.get(
      'https://covid-193.p.rapidapi.com/statistics',
      apiConfig
    );

    const data = response.data.response;
    localStorage.setItem('covid-data', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return null;
  }
}


