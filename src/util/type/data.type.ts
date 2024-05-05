export interface CountryData {
    id: string;
    countryCode: string;
    country: string;
    confirmedCases: number;
    deaths: number;
    recovered: number;
    lastUpdated: string;
    coordinates: { lng: number; lat: number };
}