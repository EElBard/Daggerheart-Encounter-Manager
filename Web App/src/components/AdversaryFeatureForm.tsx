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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

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
    ]).optional(),
    damage_type: z.enum([
        "Physical",
        "Magical"
    ]).optional(),
    desc: z.coerce.string()
})

interface AdversaryFeatureFormProps {
    onFeatureAdded?: () => void
}
export function AdversaryFeatureForm({ onFeatureAdded }: AdversaryFeatureFormProps) {
    // 1. Form Definition
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "Action",
            range: undefined,
            damage_type: undefined,
            desc: ""
        }
    })

    // 2. Submit Handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const record = await pb.collection('adversary_features').create(values)
        .then((res) => toast(JSON.stringify(res)))
        .then(() => form.reset())
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

                <FormField 
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea className="resize-none" placeholder="Make an attack against a target within Very Close range. On a success, spend a Fear to deal 1d4+4 physical damage and Poison them until their next rest or they succeed on a Knowledge Roll (16). While Poisoned, the target must roll a d6 before they make an action roll. On a result of 4 or lower, they must mark a Stress." {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                    <FormField 
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Action">Action</SelectItem>
                                        <SelectItem value="Reaction">Reaction</SelectItem>
                                        <SelectItem value="Passive">Passive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name="range"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Range</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a range" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Melee">Melee</SelectItem>
                                        <SelectItem value="Very Close">Very Close</SelectItem>
                                        <SelectItem value="Close">Close</SelectItem>
                                        <SelectItem value="Far">Far</SelectItem>
                                        <SelectItem value="Very Far">Very Far</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name="damage_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Damage Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a damage type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Physical">Physical</SelectItem>
                                        <SelectItem value="Magical">Magical</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    </>)
}