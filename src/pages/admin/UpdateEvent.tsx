import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleEventGettingById,
  handleEventUpdating,
} from "@/services/EventService";
import { showErrorToast, showSuccessToast } from "@/components/files/toast";
import { defaultForm, EventForm } from "@/components/ui/event-form";
import { toLocalDateTimeString } from "@/lib/helpers";
import { useBoolean } from "@/context/hooks/useBoolean";

export const UpdateEvent = () => {
  const { id } = useParams();
  const [form, setForm] = useState(defaultForm);
  const loading = useBoolean()
  const navigator = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        loading.setTrue()
        const data = await handleEventGettingById(id!);

        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          location: data.location ?? "",
          startDateTime: toLocalDateTimeString(data.startDateTime ?? ""),
          endDateTime: toLocalDateTimeString(data.endDateTime ?? ""),
          eventType: data.eventType ?? 0,
          capacity: data.capacity ?? 0,
          imageUrl: data.imageUrl ?? "",
        });
        console.log(data.eventType);
      } catch (error) {
        console.log(error);
      } finally {
        loading.setFalse()
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    loading.setTrue();
    try {
      const payload = {
        ...form,
        startDateTime: new Date(form.startDateTime).toISOString(),
        endDateTime: new Date(form.endDateTime).toISOString(),
      };
      const res = await handleEventUpdating(id!, payload);
      showSuccessToast(res);
      navigator("/admin/events");
    } catch (err: any) {
      showErrorToast(err.message);
    } finally {
      loading.setFalse()
    }
  };

  return (
    <EventForm
      form={form}
      setForm={setForm}
      loading={loading.value}
      onSubmit={handleSubmit}
      submitText="Update Event"
      title="Update Event"
    />
  );
};
