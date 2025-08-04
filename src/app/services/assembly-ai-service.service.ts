class AssemblyAiService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_ASSEMLY_AI_API_KEY || '';
  }

  uploadAudio = async (file: File): Promise<string> => {
    const response = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        authorization: this.apiKey,
      },
      body: file,
    });

    const data = await response.json();
    return data.upload_url;
  };

  requestTranscription = async (audioUrl: string) => {
    const res = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        authorization: this.apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ audio_url: audioUrl }),
    });

    return res.json();
  };

  pollTranscription = async (id: string): Promise<string> => {
    while (true) {
      const res = await fetch(
        `https://api.assemblyai.com/v2/transcript/${id}`,
        {
          headers: { authorization: this.apiKey },
        }
      );
      const data = await res.json();

      if (data.status === 'completed') {
        return data.text;
      } else if (data.status === 'failed') {
        throw new Error('Transcription failed');
      }

      await new Promise((r) => setTimeout(r, 2000));
    }
  };
}

export const { uploadAudio, requestTranscription, pollTranscription } =
  new AssemblyAiService();
