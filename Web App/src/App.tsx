import './App.css'
import { AdversaryForm } from './components/AdversaryForm'
import { Card } from './components/ui/card'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <>
      <Toaster />
      <Card className='max-w-lg mx-auto p-6 mt-5'>
        <AdversaryForm />
      </Card>
    </>
  )
}

export default App
