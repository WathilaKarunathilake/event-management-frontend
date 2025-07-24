import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export const defaultForm = {
  title: "",
  description: "",
  location: "",
  startDateTime: "",
  endDateTime: "",
  eventType: 0,
  capacity: 0,
  imageUrl: "",
};

type FormType = typeof defaultForm;

type EventFormProps = {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  submitText: string;
  title: string;
};

export function EventForm({
  form,
  setForm,
  loading,
  onSubmit,
  submitText,
  title,
}: EventFormProps) {
  const [fileName, setFileName] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSelect = (value: string) => {
    setForm({ ...form, eventType: Number.parseInt(value) });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (setFileName) setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(",")[1];
      setForm({ ...form, imageUrl: base64String });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 mt-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter event title"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write a short description about the event"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter venue or address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="startDateTime">Start Date & Time</Label>
                <Input
                  id="startDateTime"
                  type="datetime-local"
                  value={form.startDateTime}
                  onChange={handleChange}
                  placeholder="Select start date and time"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="endDateTime">End Date & Time</Label>
                <Input
                  id="endDateTime"
                  type="datetime-local"
                  value={form.endDateTime}
                  onChange={handleChange}
                  placeholder="Select end date and time"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="eventType">Event Type</Label>
                <Select
                  onValueChange={handleSelect}
                  defaultValue={form.eventType.toString()}
                >
                  <SelectTrigger className="cursor-pointer w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Conference",
                      "Workshop",
                      "Seminar",
                      "Meetup",
                      "Webinar",
                      "Concert",
                      "Festival",
                      "Competition",
                      "Exhibition",
                    ].map((label, idx) => (
                      <SelectItem
                        key={idx}
                        className="cursor-pointer"
                        value={idx.toString()}
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={form.capacity}
                  onChange={handleChange}
                  placeholder="Enter max number of attendees"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="imageUrl">Event Image</Label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="imageUrl"
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded cursor-pointer"
                >
                  Choose File
                </label>

                {fileName ? (
                  <span className="text-sm text-gray-700">{fileName}</span>
                ) : form.imageUrl?.startsWith("http") ? (
                  <a
                    href={form.imageUrl}
                    className="text-blue-600 underline text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                ) : (
                  <span className="text-gray-500 text-sm">No file chosen</span>
                )}
              </div>

              <input
                id="imageUrl"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-purple-700 text-white hover:bg-purple-800 flex items-center justify-center gap-2"
            >
              {loading && (
                <Loader2 className="h-6 w-6 animate-spin stroke-[2.5]" />
              )}
              {loading ? `${submitText}...` : submitText}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
