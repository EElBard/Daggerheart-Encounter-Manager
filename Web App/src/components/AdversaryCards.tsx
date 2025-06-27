import ChromaGrid from "./ui/chroma-grid"
import PocketBase, { type RecordModel } from "pocketbase"
import placeholder from "@/assets/placeholder.png"
import { useEffect, useState } from "react"

const pb = new PocketBase('http://127.0.0.1:8090')

export function AdversaryCards() {
    const [adversaries, setAdversaries] = useState<RecordModel[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        const fetchAdversaries = async () => {
            try {
                const data = await pb.collection('adversaries').getFullList({
                    sort: '-name',
                    requestKey: null
                }).then()
                setAdversaries(data)
                console.log(data)
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

    return (<>
        <ChromaGrid
            items={adversaries.map((adv) => ({
                image: adv.image || placeholder,
                title: adv.name,
                subtitle: adv.desc,
            }))}
            className="max-w-4xl mx-auto mt-5 background-red-100"
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
        />
    </>)
}