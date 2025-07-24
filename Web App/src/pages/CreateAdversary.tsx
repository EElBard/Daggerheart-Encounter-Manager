import { AdversaryForm } from "@/components/AdversaryForm"

function CreateAdversary() {
    return (<>
        <div className="m-10">
            <AdversaryForm showFeatureForm={false} setShowFeatureForm={() => {}} />
            
        </div>
    </>)
}

export default CreateAdversary