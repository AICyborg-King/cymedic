import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, Activity, X } from 'lucide-react';
import { createBlob, decode, decodeAudioData } from '../utils/audio';

interface VoiceAgentProps {
  onClose: () => void;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const [volume, setVolume] = useState(0); // For visualization
  
  // Refs for audio context and session
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const inputAnalyserRef = useRef<AnalyserNode | null>(null);

  const startSession = async () => {
    try {
      setStatus('connecting');
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("No API Key");

      const ai = new GoogleGenAI({ apiKey });
      
      // Setup Audio Contexts
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      audioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      // Input Stream (Mic)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = inputCtx.createMediaStreamSource(stream);
      
      // Analyser for visualizer
      const analyser = inputCtx.createAnalyser();
      analyser.fftSize = 256;
      inputAnalyserRef.current = analyser;
      source.connect(analyser);

      const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
      
      // Connect to Gemini Live
      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Session Opened');
            setStatus('listening');
            setIsActive(true);
            
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromiseRef.current?.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
             // Handle Audio Output
             const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
             if (base64Audio) {
                setStatus('speaking');
                
                // Keep audio sync
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);

                const audioBuffer = await decodeAudioData(
                  decode(base64Audio),
                  outputCtx,
                  24000,
                  1
                );

                const sourceNode = outputCtx.createBufferSource();
                sourceNode.buffer = audioBuffer;
                sourceNode.connect(outputCtx.destination);
                
                sourceNode.addEventListener('ended', () => {
                   sourcesRef.current.delete(sourceNode);
                   if (sourcesRef.current.size === 0) setStatus('listening');
                });

                sourceNode.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(sourceNode);
             }

             if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => s.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
                setStatus('listening');
             }
          },
          onclose: () => {
            console.log('Session Closed');
            setStatus('idle');
            setIsActive(false);
          },
          onerror: (err) => {
            console.error(err);
            setStatus('idle');
            setIsActive(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: "You are a professional, empathetic, and efficient receptionist for 'Cymedic Health'. Assist users with booking appointments, checking symptoms briefly (and advising them to see a doctor), and providing clinic information. Keep responses concise and conversational.",
        },
      });

    } catch (error) {
      console.error("Failed to start session:", error);
      setStatus('idle');
    }
  };

  const stopSession = () => {
    sessionPromiseRef.current?.then(session => session.close());
    audioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    setIsActive(false);
    setStatus('idle');
  };

  // Visualizer Loop
  useEffect(() => {
    let animationFrame: number;
    const updateVolume = () => {
      if (inputAnalyserRef.current && isActive) {
        const dataArray = new Uint8Array(inputAnalyserRef.current.frequencyBinCount);
        inputAnalyserRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setVolume(avg);
      }
      animationFrame = requestAnimationFrame(updateVolume);
    };
    updateVolume();
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-sakura-800 border border-white/10 w-full max-w-md rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <div className={`absolute top-[-50%] left-[-20%] w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob ${status === 'speaking' ? 'animate-pulse' : ''}`}></div>
          <div className={`absolute top-[-50%] right-[-20%] w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000 ${status === 'speaking' ? 'animate-pulse' : ''}`}></div>
        </div>

        <button onClick={() => { stopSession(); onClose(); }} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">Cymedic AI</h2>
            <p className="text-white/60">
              {status === 'idle' && "Ready to start conversation."}
              {status === 'connecting' && "Connecting securely..."}
              {status === 'listening' && "Listening..."}
              {status === 'speaking' && "Speaking..."}
            </p>
          </div>

          {/* Visualizer Circle */}
          <div className="relative">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-gradient-to-tr from-indigo-500 to-purple-500' : 'bg-white/10'}`}
                 style={{ transform: `scale(${1 + (volume / 255) * 0.5})` }}
            >
               {status === 'listening' ? <Mic size={40} className="text-white" /> : 
                status === 'speaking' ? <Activity size={40} className="text-white animate-bounce" /> :
                <MicOff size={40} className="text-white/50" />
               }
            </div>
            {/* Ripple rings */}
            {isActive && (
              <>
                 <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20"></div>
                 <div className="absolute inset-0 -m-4 rounded-full border border-white/10 animate-pulse opacity-10"></div>
              </>
            )}
          </div>

          <div className="flex gap-4">
            {!isActive ? (
              <button 
                onClick={startSession}
                className="px-8 py-3 bg-white text-sakura-900 rounded-full font-semibold hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/20"
              >
                Start Session
              </button>
            ) : (
              <button 
                onClick={stopSession}
                className="px-8 py-3 bg-red-500/20 text-red-300 border border-red-500/50 rounded-full font-semibold hover:bg-red-500/30 transition-all"
              >
                End Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgent;