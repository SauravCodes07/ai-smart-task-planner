import { useState } from "react";
import { Bot } from "lucide-react";
import { askGemini } from "../services/aiService";

export default function AIChatbot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const result = await askGemini(prompt);
      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse("AI connection failed.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Bot size={28} />
        <h2 className="text-3xl font-bold">AI Assistant</h2>
      </div>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask AI..."
        className="w-full p-4 rounded-2xl bg-slate-800 mb-6 outline-none"
      />

      <button
        onClick={askAI}
        className="bg-blue-600 px-6 py-3 rounded-2xl mb-6"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      <div className="bg-slate-800 rounded-2xl p-5 min-h-[100px]">
        {response || "Ask anything..."}
      </div>
    </div>
  );
}