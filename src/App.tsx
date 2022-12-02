import { AuthLoader } from 'components'
import { BrowserRouter } from 'react-router-dom'
import { Router } from 'router'

import ThemeProvider from 'theme'

function App() {
  return (
    <ThemeProvider>
      <AuthLoader>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthLoader>
    </ThemeProvider>
  )
}

export default App
