import ChromaGrid from "./ui/chroma-grid"
import PocketBase, { type RecordModel } from "pocketbase"
import placeholder from "@/assets/placeholder.png"
import { useEffect, useState } from "react"

const pb = new PocketBase('http://127.0.0.1:8090')

export function AdversaryCards({...props}) {
    const [adversaries, setAdversaries] = useState<RecordModel[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)

    const generateRandomHexColor = (): string => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor.padStart(6, '0')}`; // Pad with leading zeros if needed
    };

    useEffect(() => {
        const fetchAdversaries = async () => {
            try {
                const data = await pb.collection('adversaries').getFullList({
                    sort: '-name',
                    requestKey: null
                }).then()
                setAdversaries(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchAdversaries()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error loading adversaries: {error instanceof Error ? error.message : 'Unknown error'}</div>
    }

    function randomGradient() {
        return 'linear-gradient(145deg, ' + generateRandomHexColor() + ', ' + generateRandomHexColor() + ')';
    }

    return (<>
        <ChromaGrid
            items={adversaries.map((adv) => ({
                image: adv.image || placeholder,
                title: adv.name,
                subtitle: adv.desc,
                borderColor: generateRandomHexColor(),
                gradient: randomGradient()
            }))}
            className="max-w-4xl mx-auto mt-5"
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            {...props}
        />
    </>)
}