import React from 'react'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { handleEventAdding } from '@/services/EventService'
import { showErrorToast, showSuccessToast } from '@/components/files/toast'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export const AddEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    startDateTime: "",
    endDateTime: "",
    eventType: 0,
    capacity: 0,
    imageUrl: "",
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSelect = (value: string) => {
    setForm({ ...form, eventType: Number.parseInt(value) })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onloadend = () => {
    const base64String = (reader.result as string).split(',')[1]  
setForm({ ...form, imageUrl: base64String })
  }
  reader.readAsDataURL(file) 
}

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    const startDate = new Date(form.startDateTime)
    const endDate = new Date(form.endDateTime)

    const formattedForm = {
      ...form,
      startDateTime: startDate.toISOString(),
      endDateTime: endDate.toISOString(),
    }

    const response = await handleEventAdding(formattedForm)
    showSuccessToast(response)
    navigate("/admin/events")
  } catch (err: any) {
    showErrorToast(err.message)
  } finally {
    setLoading(false)
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
                  <SelectTrigger className='cursor-pointer w-full'>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                   <SelectItem className="cursor-pointer" value="0">Conference</SelectItem>
                    <SelectItem className="cursor-pointer" value="1">Workshop</SelectItem>
                    <SelectItem className="cursor-pointer" value="2">Seminar</SelectItem>
                    <SelectItem className="cursor-pointer" value="3">Meetup</SelectItem>
                    <SelectItem className="cursor-pointer" value="4">Webinar</SelectItem>
                    <SelectItem className="cursor-pointer" value="5">Concert</SelectItem>
                    <SelectItem className="cursor-pointer" value="6">Festival</SelectItem>
                    <SelectItem className="cursor-pointer" value="7">Competition</SelectItem>
                    <SelectItem className="cursor-pointer" value="8">Exhibition</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" value={form.capacity} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="imageUrl">Event Image</Label>
              <Input id="imageUrl" type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-purple-700 text-white hover:bg-purple-800 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading && <Loader2 className="h-6 w-6 animate-spin stroke-[2.5]" />}
              {loading ? "Adding..." : "Add Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
