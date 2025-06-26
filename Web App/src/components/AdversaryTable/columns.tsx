"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { z } from "zod"

export const adversarySchema = z.object({

    name: z.coerce.string().min(1),
    // image: z.file().min(1).max(1024 * 1024).mimeType("image/png"),
    desc: z.coerce.string().optional(),
    motives_tactics: z.coerce.string(),
    tier: z.coerce.number().int().min(1).max(4),
    type: z.enum([
        "Bruiser",
        "Colossus",
        "Colossus Segment",
        "Horde",
        "Leader",
        "Minion",
        "Ranged",
        "Skulk",
        "Social",
        "Solo",
        "Standard",
        "Support"
    ]),
    difficulty: z.coerce.number().int().min(1).max(25),
    major_threshold: z.coerce.number().int().optional(),
    severe_threshold: z.coerce.number().int().optional(),
    max_hp: z.coerce.number().int(),
    max_stress: z.coerce.number().int(),
    atk_mod: z.coerce.number().int(),
    atk_name: z.coerce.string(),
    atk_range: z.enum([
        "Melee",
        "Very Close",
        "Close",
        "Far",
        "Very Far"
    ]),
    atk_dmg: z.coerce.string()
})

export const columns: ColumnDef<z.infer<typeof adversarySchema>>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "desc",
        header: "Description"
    },
    {
        accessorKey: "motives_tactics",
        header: "Motives & Tactics"
    },
    {
        accessorKey: "major_threshold",
        header: "Major Threshold"
    },
    {
        accessorKey: "severe_threshold",
        header: "Severe Threshold"
    },
    {
        accessorKey: "atk_mod",
        header: "Attack Modifier"
    },
    {
        accessorKey: "type",
        header: "Type"
    },
    {
        accessorKey: "tier",
        header: "Tier"
    },
    {
        accessorKey: "difficulty",
        header: "Difficulty"
    },
    {
        accessorKey: "atk_name",
        header: "Attack Name"
    },
    {
        accessorKey: "atk_range",
        header: "Attack Range"
    },
    {
        accessorKey: "atk_dmg",
        header: "Attack Damage"
    },
    {
        accessorKey: "max_hp",
        header: "Max HP"
    },
    {
        accessorKey: "max_stress",
        header: "Max Stress"
    }
]