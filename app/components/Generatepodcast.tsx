import React from "react";
import { GeneratePodcastProps } from "@/types/index";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "@/hooks/use-toast";
const useGeneratePodcast = ({
  setAudioUrl,
  setAudioStorageId,
  voiceType,
  voicePrompt,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getPodcastAudio = useAction(api.Openai.generateAudioAction);
  const getAudioUrl = useMutation(api.podcasts.getUrl);
  const { toast } = useToast();
  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudioUrl("");
    if (!voicePrompt) {
      toast({
        title: "Please provide a prompt",
      });

      return setIsGenerating(false);
    }
    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });
      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudioUrl(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Podcast generated successfully",
      })
    } catch (error) {
      console.log("Error generated : ", error);
      toast({
        title: "Error creating a podcast",
        variant : 'destructive'
      });
      setIsGenerating(false);
    }
  };

  return { isGenerating, generatePodcast };
};
const Generatepodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);
  return (
    <div>
      <div className="flex flex-col gap-2.5 mt-5">
        <Label className="text-16 font-bold text-white-1">
          AI prompt to generate podcast
        </Label>
        <Textarea
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
          rows={5}
          placeholder="Provide prompt to generate audio"
          className="input-class font-light focus-visible:ring-orange-1 "
        />
        <div className="mt-5 max-w-[200px]">
          <Button onClick={generatePodcast} className="text-16 font-bold text-white-1 py-5 bg-orange-1  transition-all duration-500 hover:bg-black-1">
            {isGenerating ? (
              <>
                <Loader size={20} className="animate-spin mr-2" />
                Generating..
              </>
            ) : (
              "Generate"
            )}
          </Button>
          {props.audio && (
            <audio
              controls
              src={props.audio}
              autoPlay
              className="mt-5"
              onLoadedMetadata={(e) =>
                props.setAudioDuration(e.currentTarget.duration)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Generatepodcast;
