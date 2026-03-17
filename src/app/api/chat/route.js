import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { contents } = await req.json();

        const models = ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-2.5-flash"];
        let data, response;

        for (const model of models) {
            response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents }),
                }
            );
            data = await response.json();
            if (response.ok) break;
            // If quota exceeded, try next model
            const isQuota = data?.error?.message?.includes("quota") || data?.error?.message?.includes("RESOURCE_EXHAUSTED");
            if (!isQuota) break;
        }

        if (!response.ok) {
            return NextResponse.json({ error: data?.error?.message || "API error" }, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
