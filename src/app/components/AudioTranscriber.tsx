import { AudioRecorder } from 'react-audio-voice-recorder';
import { useEffect, useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';

import {
  uploadAudio,
  requestTranscription,
  pollTranscription,
} from '@/src/app/services/assembly-ai-service.service';
import { Mic, Square } from 'lucide-react';
import Button from '@/src/components/ui/button/Button';

export const AudioTranscriber = ({
  setText,
  className,
  setIsProcessing,
}: {
  className?: string;
  setText: (text: string) => void;
  setIsProcessing: (isProcessing: boolean) => void;
}) => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  useEffect(() => {
    if (!recordingBlob) return;
    handleAudio(recordingBlob);
  }, [recordingBlob]);

  const handleAudio = async (blob: Blob) => {
    const file = new File([blob], 'audio.webm', { type: 'audio/webm' });

    setText('');

    try {
      setIsProcessing(true);

      const audioUrl = await uploadAudio(file);
      const { id } = await requestTranscription(audioUrl);
      const result = await pollTranscription(id);

      setText(result.replace(/\.$/, ''));
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={isRecording ? stopRecording : startRecording}
      className={`flex items-center justify-center p-3 text-white hover:text-gray transition-colors ${className}`}
      size={'zero'}
    >
      {!isRecording ? (
        <Mic className="h-5 w-5" />
      ) : (
        <Square className="h-5 w-5" />
      )}
    </Button>
  );
};
