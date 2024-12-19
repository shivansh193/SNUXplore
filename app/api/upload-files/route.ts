import { promises as fs } from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

const apiKey = "";

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

let globalChatSession: any = null;
let uploadedFiles: any[] = [];

async function uploadToGemini(filePath: string, mimeType: string) {
  const uploadResult = await fileManager.uploadFile(filePath, { mimeType, displayName: filePath });
  return uploadResult.file;
}

async function waitForFilesActive(files: any[]) {
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === 'PROCESSING') {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      file = await fileManager.getFile(name);
    }
    if (file.state !== 'ACTIVE') {
      throw new Error(`File ${file.name} failed to process`);
    }
  }
}

async function initializeChatSession() {
  if (globalChatSession) return globalChatSession;

  if (uploadedFiles.length === 0) {
    const filePaths = [
      path.join(process.cwd(), 'public', 'UGHandbook.pdf'),
      path.join(process.cwd(), 'public', 'UGHAndboook1.pdf'),
      path.join(process.cwd(), 'public', 'FoodPrices.pdf'),
    ];

    uploadedFiles = await Promise.all(
      filePaths.map((filePath) => uploadToGemini(filePath, 'application/pdf'))
    );

    await waitForFilesActive(uploadedFiles);
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  globalChatSession = model.startChat({
    generationConfig: {
      temperature: 2,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    },
    history: [
      {
        role: 'user',
        parts: [
          ...uploadedFiles.map((file) => ({
            fileData: {
              mimeType: file.mimeType,
              fileUri: file.uri,
            },
          })),
          {
            text: 'You are a bot designed by the SNUXplore team at Shiv Nadar university, You are designed to help out students with any queries they might have about the college. Most of your answers will be included in the documents I am sharing with you. Other than that, answer other questions in a humorous way. Make sure it’s funny and good humor.',
          },
        ],
      },
    ],
  });

  return globalChatSession;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const chatSession = await initializeChatSession();
    const result = await chatSession.sendMessage(message);

    return new Response(
      JSON.stringify({ response: await result.response.text() }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: 'Error processing request', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
