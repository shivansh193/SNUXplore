import { promises as fs } from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

const apiKey = "AIzaSyBRNIh7mzvhUYL72fTyYx_O1pEniHyUe2c"

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

let globalChatSession: any = null;

async function uploadToGemini(path: string, mimeType: string) {
  const uploadResult = await fileManager.uploadFile(path, { mimeType, displayName: path });
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

  const filePath1 = path.join(process.cwd(), 'public', 'UGHandbook.pdf');
  const filePath2 = path.join(process.cwd(), 'public', 'UGHAndboook1.pdf');

  const file1 = await uploadToGemini(filePath1, 'application/pdf');
  const file2 = await uploadToGemini(filePath2, 'application/pdf');

  await waitForFilesActive([file1, file2]);

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
          {
            fileData: {
              mimeType: file1.mimeType,
              fileUri: file1.uri,
            },
          },
          {
            fileData: {
              mimeType: file2.mimeType,
              fileUri: file2.uri,
            },
          },
          {
            text: 'You are a bot designed by the SNUXplore team at Shiv Nadar university, You are designed to help out students with any queries they might have about the college. Most of your answers will be inclduded in the documents I am sharing with you. Other than that, Answer other questions in a humourous way. Make sure its funny and good humour.',
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
    
    return new Response(JSON.stringify({ response: result.response.text() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: 'Error processing request', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}