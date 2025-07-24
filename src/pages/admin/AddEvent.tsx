import React, { useState } from "react";
import { handleEventAdding } from "@/services/EventService";
import { showErrorToast, showSuccessToast } from "@/components/files/toast";
import { useNavigate } from "react-router-dom";
import { defaultForm, EventForm } from "@/components/ui/event-form";

export const AddEvent = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        startDateTime: new Date(form.startDateTime).toISOString(),
        endDateTime: new Date(form.endDateTime).toISOString(),
      };
      const res = await handleEventAdding(payload);
      showSuccessToast(res);
      navigate("/admin/events");
    } catch (err: any) {
      showErrorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventForm
      form={form}
      setForm={setForm}
      loading={loading}
      onSubmit={handleSubmit}
      submitText="Add Event"
      title="Create New Event"
    />
  );
};
