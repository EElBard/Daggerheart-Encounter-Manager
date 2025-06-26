import { columns, adversaryFeaturesSchema } from "./columns"
import { DataTable } from "@/components/ui/data-table"

import PocketBase from "pocketbase"
import { useEffect, useState } from "react"

import { z } from "zod"

const pb = new PocketBase('http://127.0.0.1:8090')

async function getData(): Promise<z.infer<typeof adversaryFeaturesSchema>[]> {
    try {
        const records = await pb.collection('adversary_features').getFullList({
            sort: 'name',
            requestKey: null
        })

        const rawData = records.map(record => ({
            name: record.name,
            type: record.type,
            desc: record.desc,
            range: record.range,
            damage_type: record.damage_type
        }))

        const validatedData = z.array(adversaryFeaturesSchema).parse(rawData)

        return validatedData
    } catch (error) {
        console.error("Error fetching or parsing data:", error)
        throw error
    }
}

export default function DemoPage() {
    const [data, setData] = useState<z.infer<typeof adversaryFeaturesSchema>[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const fetchedData = await getData()
                setData(fetchedData)
            } catch (err: any) {
                setError(err.message || "An unknown error occurred.")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto py-10">
                <p>Loading data...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto py-10 text-red-500">
                <p>Error loading data: {error}</p>
                <p>Please check Pocketbase server and network connection.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}