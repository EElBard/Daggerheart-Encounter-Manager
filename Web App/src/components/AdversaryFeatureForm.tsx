"use client"

import PocketBase from 'pocketbase';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { z } from "zod"

const pb = new PocketBase('http://127.0.0.1:8090')

const formSchema = z.object({
    name: z.coerce.string(),
    type: z.enum([
        "Action",
        "Reaction",
        "Passive"
    ]).optional(),
    range: z.enum([
        "Melee",
        "Very Close",
        "Close",
        "Far",
        "Very Far"
    ]).optional(),
    damage_type: z.enum([
        "Physical",
        "Magical"
    ]).optional(),
    desc: z.coerce.string()
})

export function AdversaryFeatureForm() {
    // 1. Form Definition
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: undefined,
            range: undefined,
            damage_type: undefined,
            desc: ""
        }
    })

    // 2. Submit Handler

    return (<>

    </>)
}