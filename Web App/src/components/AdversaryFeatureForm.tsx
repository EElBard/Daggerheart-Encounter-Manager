"use client"

import PocketBase from 'pocketbase';

import { z } from "zod"

const pb = new PocketBase('http://127.0.0.1:8090')

const formSchema = z.object({
    name: z.coerce.string(),
    type: z.enum([
        "Action",
        "Reaction",
        "Passive"
    ]),
    range: z.enum([
        "Melee",
        "Very Close",
        "Close",
        "Far",
        "Very Far"
    ]),
    damage_type: z.enum([
        "Physical",
        "Magical"
    ]),
    desc: z.coerce.string()
})

export function AdversaryFeatureForm() {
    return (<>

    </>)
}