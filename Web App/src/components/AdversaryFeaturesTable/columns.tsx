"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { z } from "zod"

export const adversaryFeaturesSchema = z.object({
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
    ]).optional(),
    damage_type: z.enum([
        "Physical",
        "Magical"
    ]).optional(),
    desc: z.coerce.string()
})

export const columns: ColumnDef<z.infer<typeof adversaryFeaturesSchema>>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "type",
        header: "Type"
    },
    {
        accessorKey: "range",
        header: "Range"
    },
    {
        accessorKey: "damage_type",
        header: "Damage Type"
    },
    {
        accessorKey: "desc",
        header: "Description"
    }
]