import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import ScoreRing from "@/components/ScoreRing";

import axios from "axios";

const Results = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Call your backend API
        const res = await axios.get("http://127.0.0.1:5000/api/results");
        setResult(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading analysis...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-red-500">No results found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 animate-fade-in">
            Analysis <span className="gradient-text">Results</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Score Section */}
            <div className="glass-card p-8 flex flex-col items-center justify-center animate-fade-in">
              <ScoreRing score={result.score} />
            </div>

            {/* AI Summary */}
            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                AI Summary
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{result.summary}</p>

              {/* Strengths */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-score-success mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground pl-4 border-l-2 border-score-success/30"
                    >
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div>
                <h3 className="text-sm font-medium text-score-warning mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground pl-4 border-l-2 border-score-warning/30"
                    >
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="glass-card p-8 mt-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-semibold text-foreground mb-6">Score Breakdown</h2>
            <div className="space-y-4">
              {result.breakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-40">{item.label}</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                      style={{
                        width: `${item.score}%`,
                        animationDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-12 text-right">
                    {item.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

        

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <Link to="/roadmap">
              <Button variant="hero" size="lg">
                View Improvement Roadmap
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/repo-details">
              <Button variant="glass" size="lg">
                Repository Details
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;