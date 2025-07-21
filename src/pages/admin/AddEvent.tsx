import React from 'react'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { handleEventAdding } from '@/services/EventService'

export const AddEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    startDateTime: "",
    endDateTime: "",
    eventType: 0,
    capacity: 0,
    createdBy: "",
    eventImage: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSelect = (value: string) => {
    setForm({ ...form, eventType: Number.parseInt(value) })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, eventImage: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        const response = await handleEventAdding(form)
        console.log(response);
    } catch{

    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create New Event</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter event title" value={form.title} onChange={handleChange} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Event description" value={form.description} onChange={handleChange} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Event location" value={form.location} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="startDateTime">Start Date & Time</Label>
                <Input id="startDateTime" type="datetime-local" value={form.startDateTime} onChange={handleChange} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="endDateTime">End Date & Time</Label>
                <Input id="endDateTime" type="datetime-local" value={form.endDateTime} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="eventType">Event Type</Label>
                <Select onValueChange={handleSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Conference</SelectItem>
                    <SelectItem value="1">Workshop</SelectItem>
                    <SelectItem value="2">Seminar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" value={form.capacity} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="eventImage">Event Image</Label>
              <Input id="eventImage" type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <Button type="submit" className="w-full bg-purple-700 text-white hover:bg-purple-800">
              Submit Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
