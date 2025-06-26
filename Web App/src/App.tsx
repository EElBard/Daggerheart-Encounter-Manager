import './App.css'
import { AdversaryFeatureForm } from './components/AdversaryFeatureForm'
import AdvFeaturesPage from './components/AdversaryFeaturesTable/page'
import { AdversaryForm } from './components/AdversaryForm'
import AdvPage from './components/AdversaryTable/page'
import { Card } from './components/ui/card'
import { Toaster } from './components/ui/sonner'

function App() {
  return (<>
  <div className='flex justify-evenly flex-wrap'>
      <Toaster />
      <Card className='max-w-lg mx-auto p-6 mt-5'>
        <AdversaryForm />
      </Card>
      <Card className='max-w-lg mx-auto p-6 mt-5'>
        <AdversaryFeatureForm />
      </Card>
      <Card className='max-w-lg mx-auto p-6 mt-5'>
        <AdvFeaturesPage />
      </Card>
      <Card className='max-w-lg mx-auto p-6 mt-5'>
        <AdvPage />
      </Card>
    </div>
  </>)
}

export default App
