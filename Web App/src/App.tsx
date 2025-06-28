import './App.css'
import { AdversaryCards } from './components/AdversaryCards'
import { AdversaryFeatureForm } from './components/AdversaryFeatureForm'
import AdvFeaturesPage from './components/AdversaryFeaturesTable/page'
import { AdversaryForm } from './components/AdversaryForm'
import AdvPage from './components/AdversaryTable/page'
import { Card } from './components/ui/card'
import { Toaster } from './components/ui/sonner'

function App() {
  return (<>
  <Toaster className='justify-top justify-center'/>
  <AdversaryCards/>
  <div className='flex flex-row justify-evenly'>
      <Card className='max-w-lg mx-auto p-6 mt-5'>
        <AdversaryForm />
      </Card>
      <Card className='max-w-lg mx-auto p-6 mt-5'>
        <AdversaryFeatureForm />
      </Card>
      <div className='flex flex-col'>
        <Card className='max-w-md mx-auto p-6 mt-5'>
          <AdvFeaturesPage />
        </Card>
        <Card className='max-w-md mx-auto p-6 mt-5'>
          <AdvPage />
        </Card>
      </div>
  </div>
  </>)
}

export default App
