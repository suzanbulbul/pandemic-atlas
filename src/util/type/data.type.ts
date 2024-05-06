export interface CountryData {
    continent: string;
    country: string;
    population: number;
    cases: {
      new: null | number;
      active: number;
      critical: number;
      recovered: number;
      "1M_pop": string;
      total: number;
    };
    deaths: {
      new: null | number;
      "1M_pop": string;
      total: number;
    };
    tests: {
      "1M_pop": string;
      total: number;
    };
    day: string;
    time: string;
}

