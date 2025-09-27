import { GoogleGenAI, Type } from "@google/genai";
import { EbookStructure } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const structureSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "Um título criativo e curto para o e-book."
        },
        coverImagePrompt: {
            type: Type.STRING,
            description: "Um prompt em inglês, detalhado e artístico para gerar a imagem da capa."
        },
        chapters: {
            type: Type.ARRAY,
            description: "Uma lista de 3 a 5 capítulos.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING,
                        description: "O título deste capítulo."
                    },
                    contentPrompt: {
                        type: Type.STRING,
                        description: "Um prompt para a IA gerar o conteúdo textual deste capítulo, em português."
                    },
                    imagePrompt: {
                        type: Type.STRING,
                        description: "Um prompt em inglês, detalhado e artístico para gerar a imagem de ilustração deste capítulo."
                    }
                },
                required: ["title", "contentPrompt", "imagePrompt"]
            }
        }
    },
    required: ["title", "coverImagePrompt", "chapters"]
};

export async function generateStructure(idea: string): Promise<EbookStructure> {
    const prompt = `Você é um assistente criativo para escrever e-books. Sua tarefa é receber uma ideia e gerar uma estrutura JSON completa para um e-book. O JSON deve seguir o schema fornecido.
    - Crie um título criativo para o e-book.
    - Crie um prompt detalhado e artístico em INGLÊS para a imagem da capa mas com nome todos em português do Brasil.
    - Crie entre 3 e 5 capítulos.
    - Para cada capítulo, crie um título, um prompt para o conteúdo textual (em português do Brasil), e um prompt para a imagem (em INGLÊS).
    - Os prompts de imagem devem ser otimizados para um gerador de imagem de IA.
    
    Ideia do usuário: "${idea}"`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: structureSchema,
        },
    });

    try {
        const jsonText = response.text.trim();
        const structure = JSON.parse(jsonText);
        // Basic validation
        if (!structure.title || !structure.chapters || structure.chapters.length === 0) {
            throw new Error("Invalid structure received from AI");
        }
        return structure;
    } catch (e) {
        console.error("Failed to parse AI response:", response.text);
        throw new Error("A resposta da IA não estava no formato JSON esperado.");
    }
}

export async function generateText(prompt: string): Promise<string> {
    const fullPrompt = `Gere o conteúdo textual a partir do seguinte prompt. O texto deve ser em português do Brasil. Use formatação Markdown simples: '###' para subtítulos e '*palavra*' para itálico. Separe parágrafos com uma linha em branco. Não inclua o título principal do capítulo no conteúdo.
    
    Prompt: "${prompt}"`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });
    return response.text;
}


export async function generateImage(prompt: string, aspectRatio: '3:4' | '4:3'): Promise<string> {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: aspectRatio,
        },
    });

    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    return `data:image/png;base64,${base64ImageBytes}`;
}
