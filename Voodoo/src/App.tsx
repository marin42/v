import './App.css'

//import { useApi } from './api/useApi'

import { useFakeApi } from './api/useFakeApi'
import { useSearch } from './search/useSearch'

import { SearchView } from './search/Search'
import { MonetisationList } from './visualization/List'

function App() {
  // Uncomment to use the Real API
  // const api = useApi();
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
