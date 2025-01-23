"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { voiceDetails } from "@/constants";
import { useState } from "react";
import Generatepodcast from "@/app/components/Generatepodcast";
import Generatethumbnail from "@/app/components/Generatethumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

// Schema definition using Zod
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description : z.string().min(2, {
    message : "Description must be at least 2 characters"
  })
});

const CreatePodcast = () => {
  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl , setimageUrl] = useState("")
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imagePrompt, setImagePrompt] =useState('')
  const [audioUrl , setAudioUrl] = useState("")
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioDuration , setAudioDuration] = useState(0)
  const [voicePrompt, setVoicePrompt] =useState(null)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: { title: string; description: string }) => {
    console.log("Form Data:", data);
  };
  return (
    <section className="flex flex-col mt-9">
      <Form {...form}>
        <h1 className="text-lg font-bold text-white-1">Create Podcast</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 flex flex-col w-full "
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-16 font-bold text-white-1">Podcast title</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-orange-500 border-none bg-black-2"
                      placeholder="Pro podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <label className="text-sm font-semibold text-white-1">
                Select AI voice
              </label>
            </div>
            <Select onValueChange={(type) => setVoiceType(type)}>
              <SelectTrigger
                className={cn(
                  "border-none bg-black-2 focus-visible:ring-orange-500"
                )}
              >
                <SelectValue placeholder="select category"/>
              </SelectTrigger>
              <SelectContent className="bg-black-1 text-16 border-none text-white-1 ">
                {voiceDetails.map(({ id, name }) => (
                  <SelectItem
                    key={id}
                    value={name}
                    className="capitalize focus-visible:bg-orange-500 text-white-1 "
                  >
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {voiceType && (
              <audio
                src={`${voiceType}.mp3`}
                autoPlay
                className="hidden"
              ></audio>
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="focus-visible:ring-orange-500 border-none bg-black-2"
                      placeholder="Write a short podcast Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <Generatepodcast 
            setAudioStorageId = {setAudioStorageId}
            setAudioUrl ={setAudioUrl}
            setAudioDuration = {setAudioDuration}
            setVoicePrompt = {setVoicePrompt}
            voiceType = {voiceType}
            audio ={audioUrl}
            voicePrompt = {voicePrompt}
            />
            <Generatethumbnail />
          </div>
          <div className="w-full mt-10">
            <Button type="submit" className="text-16 font-bold text-white-1 bg-orange-1 w-full py-4 transition-all duration-500 hover:bg-black-1">
              {isLoading? 
              <>
              <Loader size={20} className="animate-spin mr-2"/>
              Submitting....
               </>:"Submit & Publish Podcast"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
