"use client"

import PocketBase from 'pocketbase';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Input } from "@/components/ui/input"
import NumberCounter from '@/components/NumberCounter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from './ui/slider';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';

const pb = new PocketBase('http://127.0.0.1:8090')

const formSchema = z.object({
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

export function AdversaryForm() {
    // 1. Form Definition
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            // image: idk,
            desc: "",
            motives_tactics: "",
            tier: 1,
            type: "Standard",
            difficulty: 10,
            major_threshold: 5,
            severe_threshold: 10,
            max_hp: 5,
            max_stress: 0,
            atk_mod: 0,
            atk_name: "",
            atk_range: "Melee",
            atk_dmg: ""
        }
    })

    // 2. Submit Handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const record = await pb.collection('adversaries').create(values)
        .then(() => form.reset())
        .then(() => toast("This adversary has been successfully created."))
    }

return (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h1>Create a New Adversary</h1>
                <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adversary Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Giant Scorpion" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex justify-around'>

                    <FormField 
                        control={form.control}
                        name="tier"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='justify-center'>Tier</FormLabel>
                                <FormControl>
                                    <NumberCounter {...field} min={1} max={4}/>
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
                                <FormLabel className='justify-center'>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Bruiser">Bruiser</SelectItem>
                                        <SelectItem value="Colossus">Colossus</SelectItem>
                                        <SelectItem value="Colossus Segment">Colossus Segment</SelectItem>
                                        <SelectItem value="Horde">Horde</SelectItem>
                                        <SelectItem value="Leader">Leader</SelectItem>
                                        <SelectItem value="Minion">Minion</SelectItem>
                                        <SelectItem value="Ranged">Ranged</SelectItem>
                                        <SelectItem value="Skulk">Skulk</SelectItem>
                                        <SelectItem value="Social">Social</SelectItem>
                                        <SelectItem value="Solo">Solo</SelectItem>
                                        <SelectItem value="Standard">Standard</SelectItem>
                                        <SelectItem value="Support">Support</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <FormField 
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea className="resize-none" placeholder="A human-sized insect with tearing claws and a stinging tail." {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name="motives_tactics"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Motives & Tactics</FormLabel>
                            <FormControl>
                                <Input className="resize-none" placeholder="Ambush, feed, grapple, poison" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Difficulty: {(field.value)}</FormLabel>
                            <FormControl>
                                <Slider
                                    defaultValue={[10]}
                                    max={25}
                                    step={1}
                                    value={[field.value]}
                                    onValueChange={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div id='thresholds' className='flex justify-evenly'>

                    <FormField 
                        control={form.control}
                        name="major_threshold"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='justify-center'>Major Threshold</FormLabel>
                                <FormControl>
                                    <NumberCounter {...field} min={0} max={30}/>
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name="severe_threshold"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='justify-center'>Severe Threshold</FormLabel>
                                <FormControl>
                                    <NumberCounter {...field} min={0} max={30}/>
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <div className='flex justify-between'>

                    <FormField 
                        control={form.control}
                        name="max_hp"
                        render={({ field }) => (
                            <FormItem className='flex-1/3'>
                                <FormLabel>Max HP: {(field.value)}</FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[10]}
                                        max={25}
                                        step={1}
                                        value={[field.value]}
                                        onValueChange={field.onChange}
                                    />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex-1/8'></div>

                    <FormField 
                        control={form.control}
                        name="max_stress"
                        render={({ field }) => (
                            <FormItem className='flex-1/3'>
                                <FormLabel>Max Stress: {(field.value)}</FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[10]}
                                        max={25}
                                        step={1}
                                        value={[field.value]}
                                        onValueChange={field.onChange}
                                    />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <div id="attack_details" className='flex justify-between'>

                <FormField 
                    control={form.control}
                    name="atk_mod"
                    render={({ field }) => (
                        <FormItem className='mr-3'>
                            <FormLabel>Modifier</FormLabel>
                            <FormControl>
                                <NumberCounter {...field} max={25} min={-25}/>
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name="atk_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Pincers" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name="atk_range"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Range</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a type" />
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
                    name="atk_dmg"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Damage</FormLabel>
                            <FormControl>
                                <Input placeholder="1d4+3" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                </div>
                
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </>)
}