"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const adversarySchema = z.object({

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