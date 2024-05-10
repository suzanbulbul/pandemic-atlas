This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tailwind Integration

Install Tailwind to your project:

```bash
 npm install tailwindcss
 npx tailwindcss init
 npm install autoprefixer
```

In the styles.scss file, import Tailwind:

```bash
//Tailwind
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## ReactQueryDevtools Integration

Install ReactQueryDevtools to your project:

```bash
npm install @tanstack/react-query-devtools
```

In the \_app.js file, import ReactQueryDevtools:
We wrap it with QueryClientProvider.

```bash
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

 <QueryClientProvider client={queryClient}>
     ...
 </QueryClientProvider>
```

## react-icon Integration

Install react-icon to your project:

```bash
npm install @tanstack/react-query-devtools

```

We choose icon from react icon website

```bash
https://react-icons.github.io/react-icons/

```

In the anyone file, import react-icon:

```bash
import { FaArrowLeft } from "react-icons/fa";

 <FaArrowLeft className="w-5 h-5" />
```

## Redux && Redux Saga Integration

Install Redux && Redux Saga to your project:

```bash
npm install redux
npm install @reduxjs/toolkit
npm install redux redux-saga
```

Create folder and file structure

- src
  - redux
    - sagas.js
    - slice.js
    - store.js

sagas.js

```bash
'fetchDataSaga():' This is a saga function responsible for fetching data asynchronously. It uses getData() from the ../api/data module to fetch data. Once the data is fetched successfully, it dispatches a fetchDataRequest action with the received data. If an error occurs during the data fetching process, it logs the error to the console.

'rootSaga():' This is the root saga function. It uses takeLatest from Redux Saga to watch for the FETCH_DATA action type. When the action is dispatched, it calls the fetchDataSaga function.

```

slice.js

```bash
'loadFromLocalStorage():' This function attempts to load data from the local storage. If data exists, it parses and returns it; otherwise, it returns undefined.
saveToLocalStorage(state): This function serializes the state and saves it to the local storage.
initialState: This variable holds the initial state of the Redux slice. It either loads the data from local storage using 'loadFromLocalStorage()' or initializes with null if no data exists.
dataSlice: This is created using createSlice from @reduxjs/toolkit. It defines the name of the slice ('data'), its initial state, and the fetchDataRequest reducer. When fetchDataRequest action is dispatched, it updates the state with the payload data and saves the updated state to local storage.
'fetchDataRequest and selectData:' These are exported as named exports. fetchDataRequest is an action creator for the fetchDataRequest action, and selectData is a selector function to access the data from the Redux store.
```

store.js

```bash
It imports configureStore and getDefaultMiddleware from @reduxjs/toolkit, as well as createSagaMiddleware from 'redux-saga'.
It imports the dataReducer from slice.js and rootSaga from sagas.js.
It creates sagaMiddleware using createSagaMiddleware().
The Redux store is configured using configureStore, where the reducer is set to dataReducer, and middleware includes the default middleware along with sagaMiddleware.
It then runs the saga middleware with sagaMiddleware.run(rootSaga).
Finally, it exports the configured store.
```

## Note:

It's recommended to test these libraries on a sample page before implementing them throughout the entire project.

# pandemic-atlas
