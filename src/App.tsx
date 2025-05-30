import {useEffect, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axois';

interface CrashData {
  app_version: string;
  'crash.count': number[];
  timestamp: number[];
}

interface ParsedData {
  time: string;
  [key: string]: number | string;
}

// TODO:TASK1 remove rawData object once API call is added to retreive 
// app crash data
const rawData = { 
  'end': '2025-03-17T12:30:00Z',
  'start': '2025-03-16T12:30:00Z',  
  'step': 600,  
  'data': 
  [
    {
      'app_version': '25.11.0.1',
      'crash.count': [
        2,
        1,
        0
      ],
      'timestamp': [
        1742143800,
        1742161800,
        1742111900
      ]    
    }, 
    {
      'app_version': '25.11.0.2',
      'crash.count': [
        2,
        1,
        2
      ],
      'timestamp': [
        1742143700,
        1742161900,
        1742111900
      ]    
    }, 
    {
      'app_version': '25.11.0.3',
      'crash.count': [
        6,
        2,
        1
      ],
      'timestamp': [
        1742143700,
        1742161900,
        1742111900
      ]    
    },
  ]
};

function parseCrashData(data: CrashData[]): ParsedData[] {
  const timestamps = data[0].timestamp;
  return timestamps.map((timestamp, i) => {
    const item: ParsedData = {
      time: new Date(timestamp * 1000).toLocaleString()
    }
    data.forEach(entry => {
      const safeKey = entry.app_version.replaceAll('.', '_')
      item[safeKey] = entry['crash.count'][i];
    })
    return item;
  })
}

function App() {
  const [chartData, setChartData] = useState<ParsedData[]>([]);

  useEffect(() => {
    // TODO: TASK1 replace with API call when app crash data URL is available
    // axios.get('/api/crash-data').then(response => {
    // const parsed = parseCrashData(response.data);
    // setChartData(parsed);
    // });
    console.log(rawData.data);
    const parsed = parseCrashData(rawData.data);
    setChartData(parsed);
    console.log(parsed);
  }, []);

  const versions = rawData.data.map(d => d.app_version.replaceAll('.', '_'));
  return (
    <div className='px-4'>
      <h1>Crash Count by App Version</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey='time' />
          <YAxis />
          <Tooltip />
          <Legend />
          {versions.map((version) => (
            <Line 
              key={version}
              dataKey={version.toString()}
              strokeWidth={2}
              stroke={`hsl(${Math.random() * 360}, 70%, 50%)`}
              />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )

}

export default App;