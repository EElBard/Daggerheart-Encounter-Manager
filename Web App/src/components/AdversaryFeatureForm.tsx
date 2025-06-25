"use client"

import PocketBase from 'pocketbase';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input';

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
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const record = await pb.collection('adversary_features').create(values)
        .then(() => form.reset())
        .then(() => toast("Adversary Feature successfully created."))
    }

    return (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Feature Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Venomous Stinger" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    </>)
}