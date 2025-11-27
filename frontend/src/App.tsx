import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Navigation } from './components/Navigation'
import { HomePage } from './pages/HomePage'
import { TasksPage } from './pages/TasksPage'
import { StatisticsPage } from './pages/StatisticsPage'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="md:pl-64">
            <main className="pb-20 md:pb-0">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/stats" element={<StatisticsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
