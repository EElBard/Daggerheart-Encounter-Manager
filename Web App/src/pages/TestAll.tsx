import { Toaster } from 'sonner'
import '@/App.css'
import { Card } from '@/components/ui/card'
import { AdversaryFeatureForm } from '@/components/AdversaryFeatureForm'
import AdvFeaturesPage from '@/components/AdversaryFeaturesTable/page'
import AdvPage from '@/components/AdversaryTable/page'
import { AdversaryCards } from '@/components/AdversaryCards'

function TestAll() {
  return (<>
  <Toaster className='justify-top justify-center'/>
  <div className='flex flex-row justify-evenly'>
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
  <AdversaryCards className="flex-auto"/>
  </>)
}

export default TestAll