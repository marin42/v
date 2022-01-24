import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

const API_KEY = 'mwNNiwFuJ30GqpuYwQHSW0XQx93E2rIS7NRSfxwLz4XI5Yoo5aSP8wvyibhVO8aYeaVLYsCJcFP9V0uzo95ph66qktQwE'

type Dimension =
  | 'date'
  | 'country'
  | 'format'
  | 'os'
  | 'game'
  | 'placement'

type Aggregate =
  | 'views'
  | 'conversions'
  | 'revenue'

type Data = {
  date?: string;
  country?: string;
  format?: string;
  os?: string;
  game?: string;
  placement?: string;
  views?: string;
  conversions?: string;
  revenue?: number;
}

const fetchWithAuth = (start: string, end: string, dimensions: Dimension[], aggregates: Aggregate[]) => {
  const endpoint = 'http://mock-api.voodoo.io/monetization'

  const url = `${endpoint}?start=${start}&end=${end}&dimensions=${dimensions}&aggregates=${aggregates}`

  return fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
}

function App() {
  const [count, setCount] = useState()

  const start = '2020-01-01'
  const end = '2020-12-12'
  const dimensions: Dimension[] = ['os', 'game'];
  const aggregates: Aggregate[] = ['revenue'];

  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    const rawData = await fetchWithAuth(start, end, dimensions, aggregates);
    const { data } = await rawData.json();
    console.log({ data })
    setData(data)
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      <button onClick={fetchData}>FETCH</button>
      <h1>Length {data.length}</h1>
      <pre>
        {JSON.stringify(data, null, 2)}

      </pre>
    </div>
  )
}

export default App
