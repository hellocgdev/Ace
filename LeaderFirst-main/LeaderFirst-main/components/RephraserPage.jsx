import React, { useState, useMemo } from "react";
import { Rocket, Zap, Sparkles } from "lucide-react";

const RephraserPage = ({ trackEvent }) => {
  const [originalText, setOriginalText] = useState("");
  const [rephrasedText, setRephrasedText] = useState("");
  const [currentMode, setCurrentMode] = useState("Standard");
  const [useTrendingKeywords, setUseTrendingKeywords] = useState(false);
  const [isRephrasing, setIsRephrasing] = useState(false);

  const modes = ["Standard", "Fluency", "Creative", "Formal", "Simple"];

  const { wordCount, charCount } = useMemo(() => {
    const trimmed = originalText.trim();
    if (!trimmed) return { wordCount: 0, charCount: 0 };
    const words = trimmed.split(/\s+/).filter(Boolean);
    return { wordCount: words.length, charCount: trimmed.length };
  }, [originalText]);

  const keywordsAdded = 0;

  const getModeInstruction = (mode) => {
    switch (mode) {
      case "Standard":
        return "Provide a clear and direct rephrasing of the text.";
      case "Fluency":
        return "Improve the flow, grammar, and readability of the text.";
      case "Creative":
        return "Rewrite the text using more imaginative and expressive language.";
      case "Formal":
        return "Rewrite the text in a more professional and formal tone.";
      case "Simple":
        return "Make the text easier to understand, using simpler words and shorter sentences.";
      default:
        return "Rephrase the text.";
    }
  };

  // Enhanced rephrasing with variety and no repetition
  const advancedMockRephrase = (text, mode, addKeywords) => {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim());

    // More comprehensive synonym map
    const synonymMap = {
      good: [
        "beneficial",
        "positive",
        "effective",
        "valuable",
        "excellent",
        "advantageous",
      ],
      bad: [
        "negative",
        "unfavorable",
        "poor",
        "detrimental",
        "problematic",
        "unfortunate",
      ],
      very: [
        "quite",
        "extremely",
        "highly",
        "considerably",
        "remarkably",
        "exceptionally",
      ],
      think: ["believe", "consider", "suppose", "assume", "feel", "reckon"],
      help: ["assist", "support", "aid", "facilitate", "enable", "empower"],
      use: ["utilize", "employ", "apply", "leverage", "implement", "harness"],
      make: ["create", "produce", "generate", "develop", "build", "craft"],
      important: [
        "significant",
        "crucial",
        "vital",
        "essential",
        "key",
        "critical",
      ],
      show: [
        "demonstrate",
        "illustrate",
        "display",
        "reveal",
        "exhibit",
        "present",
      ],
      get: ["obtain", "acquire", "receive", "gain", "secure", "attain"],
      big: [
        "large",
        "substantial",
        "significant",
        "considerable",
        "extensive",
        "major",
      ],
      small: ["minor", "limited", "modest", "compact", "minimal", "slight"],
      new: ["recent", "fresh", "novel", "modern", "contemporary", "latest"],
      old: [
        "previous",
        "former",
        "earlier",
        "traditional",
        "established",
        "longstanding",
      ],
    };

    // Sentence starters for variety
    const sentenceStarters = {
      standard: [
        "Additionally",
        "Furthermore",
        "Moreover",
        "Also",
        "In fact",
        "Indeed",
      ],
      fluency: [
        "Notably",
        "Importantly",
        "Significantly",
        "Essentially",
        "Fundamentally",
        "Primarily",
      ],
      creative: [
        "Intriguingly",
        "Fascinatingly",
        "Remarkably",
        "Strikingly",
        "Brilliantly",
        "Magnificently",
      ],
      formal: [
        "Furthermore",
        "Subsequently",
        "Consequently",
        "Therefore",
        "Accordingly",
        "Hence",
      ],
      simple: ["Also", "Plus", "And", "Next", "Then", "So"],
    };

    const replacedWords = new Set(); // Track replaced words to avoid repetition

    const getRandomSynonym = (word, avoidRepeat = true) => {
      const lowerWord = word.toLowerCase();
      if (synonymMap[lowerWord]) {
        const synonyms = synonymMap[lowerWord];
        if (avoidRepeat) {
          // Filter out already used synonyms
          const available = synonyms.filter((s) => !replacedWords.has(s));
          if (available.length > 0) {
            const chosen =
              available[Math.floor(Math.random() * available.length)];
            replacedWords.add(chosen);
            return chosen;
          }
        }
        return synonyms[Math.floor(Math.random() * synonyms.length)];
      }
      return word;
    };

    const rephraseSentence = (sentence, mode, index) => {
      let rephrased = sentence.trim();
      const words = rephrased.split(/\s+/);

      // Replace words with varied synonyms
      const newWords = words.map((word) => {
        const cleanWord = word.replace(/[^\w]/g, "").toLowerCase();
        if (synonymMap[cleanWord]) {
          const synonym = getRandomSynonym(cleanWord);
          // Preserve capitalization
          if (word[0] === word[0].toUpperCase()) {
            return synonym.charAt(0).toUpperCase() + synonym.slice(1);
          }
          return synonym;
        }
        return word;
      });

      rephrased = newWords.join(" ");

      switch (mode) {
        case "Standard":
          // Vary sentence structure
          if (index % 3 === 0) {
            rephrased = `In essence, ${rephrased.toLowerCase()}`;
          } else if (index % 3 === 1) {
            rephrased = `Notably, ${rephrased.toLowerCase()}`;
          }
          rephrased = rephrased.charAt(0).toUpperCase() + rephrased.slice(1);
          break;

        case "Fluency":
          const fluentStarters = sentenceStarters.fluency;
          if (index > 0 && index % 2 === 0) {
            const starter = fluentStarters[index % fluentStarters.length];
            rephrased = `${starter}, ${rephrased.toLowerCase()}`;
          }
          // Add variety with passive/active voice
          if (rephrased.includes("is") && index % 2 === 1) {
            rephrased = rephrased.replace(/is (\w+)/i, "exhibits $1");
          }
          rephrased = rephrased.charAt(0).toUpperCase() + rephrased.slice(1);
          break;

        case "Creative":
          // Add descriptive elements
          const descriptors = [
            "truly",
            "remarkably",
            "beautifully",
            "wonderfully",
            "elegantly",
            "gracefully",
          ];
          const descriptor = descriptors[index % descriptors.length];
          if (index % 2 === 0) {
            rephrased = `${
              descriptor.charAt(0).toUpperCase() + descriptor.slice(1)
            }, ${rephrased.toLowerCase()}`;
          }
          // Vary sentence endings
          if (index % 3 === 1) {
            rephrased = rephrased + ", crafting something unique";
          } else if (index % 3 === 2) {
            rephrased = rephrased + ", bringing innovation forward";
          }
          rephrased = rephrased.charAt(0).toUpperCase() + rephrased.slice(1);
          break;

        case "Formal":
          // Professional variations
          const formalPrefixes = [
            "It should be noted that",
            "One must consider that",
            "It is evident that",
            "Research indicates that",
            "Analysis reveals that",
            "Evidence suggests that",
          ];
          const prefix = formalPrefixes[index % formalPrefixes.length];
          rephrased = `${prefix} ${rephrased.toLowerCase()}`;
          rephrased = rephrased.replace(/\bI\b/g, "one");
          rephrased = rephrased.replace(/\bmy\b/gi, "one's");
          break;

        case "Simple":
          // Break into shorter parts and simplify
          if (words.length > 10) {
            const mid = Math.floor(words.length / 2);
            rephrased =
              words.slice(0, mid).join(" ") + ". " + words.slice(mid).join(" ");
          }
          // Use simpler connectors
          if (index > 0 && index % 2 === 0) {
            const simpleStarter =
              sentenceStarters.simple[index % sentenceStarters.simple.length];
            rephrased = `${simpleStarter}, ${rephrased.toLowerCase()}`;
          }
          rephrased = rephrased.charAt(0).toUpperCase() + rephrased.slice(1);
          break;

        default:
          rephrased = rephrased.charAt(0).toUpperCase() + rephrased.slice(1);
      }

      return rephrased;
    };

    let result = sentences
      .map((s, idx) => rephraseSentence(s, mode, idx))
      .join(". ");

    // Add trending keywords strategically
    if (addKeywords) {
      const trendingWords = [
        "innovative",
        "cutting-edge",
        "revolutionary",
        "next-generation",
        "transformative",
        "groundbreaking",
      ];
      const positions = [
        "solution",
        "approach",
        "method",
        "way",
        "strategy",
        "technique",
      ];

      positions.forEach((pos, idx) => {
        const keyword = trendingWords[idx % trendingWords.length];
        const regex = new RegExp(`\\b${pos}\\b`, "i");
        if (result.match(regex)) {
          result = result.replace(regex, `${keyword} ${pos}`);
        }
      });
    }

    // Ensure proper ending
    if (
      !result.endsWith(".") &&
      !result.endsWith("!") &&
      !result.endsWith("?")
    ) {
      result += ".";
    }

    return result;
  };

  const handleRephrase = async () => {
    if (!originalText.trim()) return;
    setIsRephrasing(true);
    setRephrasedText("");

    if (trackEvent) {
      trackEvent("rephrase_tool_used", {
        mode: currentMode,
        use_trending_keywords: useTrendingKeywords,
        text_length: originalText.length,
      });
    }

    try {
      // Try OpenAI API if available
      const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (openaiKey) {
        const systemInstruction = `You are an expert rephrasing tool. ${getModeInstruction(
          currentMode
        )} 
        
IMPORTANT RULES:
- Use DIFFERENT words and sentence structures
- Do NOT repeat the same phrases
- Vary your vocabulary throughout
- Return ONLY the rephrased text, no explanations
${
  useTrendingKeywords ? "- Incorporate trending keywords for SEO naturally" : ""
}`;

        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: originalText },
              ],
              temperature: 0.9, // Higher temperature for more variety
              max_tokens: 1000,
              presence_penalty: 0.6, // Reduce repetition
              frequency_penalty: 0.6, // Reduce repetition
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rephrased = data.choices[0]?.message?.content;
          if (rephrased) {
            setRephrasedText(rephrased.trim());
            return;
          }
        }
      }

      // Advanced mock rephrasing with variety
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockResult = advancedMockRephrase(
        originalText,
        currentMode,
        useTrendingKeywords
      );
      setRephrasedText(mockResult);
    } catch (error) {
      console.error("Error rephrasing text:", error);
      const mockResult = advancedMockRephrase(
        originalText,
        currentMode,
        useTrendingKeywords
      );
      setRephrasedText(mockResult);
    } finally {
      setIsRephrasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center text-white mb-8">
        <Rocket className="mx-auto h-12 w-12 text-white opacity-90" />
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
          The Rephraser
        </h1>
        <p className="mt-2 text-lg text-white/80">
          Transform your content with trending keywords and intelligent
          rephrasing
        </p>
      </div>

      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center flex-wrap gap-2">
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => setCurrentMode(mode)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  currentMode === mode
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <button
            onClick={() => setUseTrendingKeywords(!useTrendingKeywords)}
            className={`flex items-center gap-x-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
              useTrendingKeywords
                ? "bg-green-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            <Zap className="w-4 h-4" />
            Trending Keywords
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-3 divide-x divide-gray-200 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{wordCount}</p>
            <p className="text-xs text-gray-500 uppercase">Words</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{charCount}</p>
            <p className="text-xs text-gray-500 uppercase">Characters</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{keywordsAdded}</p>
            <p className="text-xs text-gray-500 uppercase">Keywords Added</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 flex justify-between">
              <span>Original Text</span>
              <span className="text-gray-400">{wordCount} words</span>
            </label>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="mt-1 w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Paste or type your article here..."
              disabled={isRephrasing}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 flex justify-between">
              <span>Rephrased Text</span>
              <span className="text-gray-400">
                {rephrasedText
                  ? rephrasedText.trim().split(/\s+/).filter(Boolean).length
                  : 0}{" "}
                words
              </span>
            </label>
            <div className="mt-1 w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
              {isRephrasing ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
                </div>
              ) : rephrasedText ? (
                <p className="text-gray-800 whitespace-pre-wrap">
                  {rephrasedText}
                </p>
              ) : (
                <p className="text-gray-400">
                  Your rephrased content will appear here...
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleRephrase}
          disabled={isRephrasing || !originalText.trim()}
          className="w-full flex items-center justify-center gap-x-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg"
        >
          <Sparkles className="w-6 h-6" />
          {useTrendingKeywords
            ? "Rephrase with Trending Keywords"
            : "Rephrase Article"}
        </button>
      </div>
    </div>
  );
};

export default RephraserPage;
