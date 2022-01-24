import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

import type { Data } from './api/types'
import { useApi } from './api/useApi'
import { useFakeApi } from './api/useFakeApi'
import { useSearch } from './search/useSearch'

import { SearchView } from './search/Search'
import { MonetisationList } from './visualization/List'

function App() {
  const api = useFakeApi();
  const search = useSearch(api);

  return (
    <div className="App">
      <SearchView search={search}/>
      <MonetisationList columns={[...search.selectedDimensions, ...search.selectedAggregates]} rows={search.result}/>
    </div>
  )
}

export default App
