import axios from 'axios';

const apiConfig = {
  headers: {
    'X-RapidAPI-Key': process.env.API_TOKEN,
    'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
  }
};

export async function getData() {
  try {
    const response = await axios.get(
      'https://covid-19-statistics.p.rapidapi.com/regions',
      apiConfig
    );

    const data = response.data;
    localStorage.setItem('covid-data', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return null;
  }
}

export const dummyData = [
  {
    id: '1',
    country: "USA",
    confirmedCases: 5000000,
    deaths: 100000,
    recovered: 3000000,
    lastUpdated: "2024-05-03",
    coordinates: { lng: -74.005974, lat: 40.712776 }
  },
  {
    id: '2',
    country: "UK",
    confirmedCases: 3000000,
    deaths: 80000,
    recovered: 2000000,
    lastUpdated: "2024-05-03",
    coordinates: { lng: -3.435973, lat: 55.378051 }
  },
];
