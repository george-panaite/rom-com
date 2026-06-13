import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAllArticlesWithContent } from '@/lib/kennisbank';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Check if the API key is configured
    if (!apiKey || apiKey === 'your_api_key_here') {
      return NextResponse.json(
        {
          error: 'API_KEY_MISSING',
          message: 'Asistentul AI nu este complet configurat. Cheia API Gemini lipsește din environment variables (GEMINI_API_KEY). Adaugă o cheie validă în .env.local pentru a activa chat-ul.'
        },
        { status: 500 }
      );
    }

    // 2. Parse request body
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'Mesaje invalide sau lipsă în corpul cererii.' },
        { status: 400 }
      );
    }

    const latestMessage = messages[messages.length - 1].content;

    // 3. Get articles for RAG context
    const articles = getAllArticlesWithContent();
    const articlesContext = articles
      .map(
        (art) =>
          `TITLU: ${art.title}\nSLUG: ${art.slug}\nCATEGORIE: ${art.category}\nCONTINUT:\n${art.contentRaw}\n-------------------`
      )
      .join('\n\n');

    // 4. Formulate the system instruction in Romanian
    const systemPrompt = `
Ești "Asistent AI Ghid Olanda", un consultant virtual de încredere, prietenos și extrem de bine informat, dezvoltat special pentru a ajuta românii care trăiesc sau intenționează să se mute în Olanda.
Misiunea ta este să oferi răspunsuri precise, clare și structurate la întrebări administrative, proceduri oficiale, asigurări, taxe și integrare.

Răspunde ÎNTOTDEAUNA în limba română. Adoptă un ton profesionist, dar cald și de susținere. Folosește formatting markdown (liste, tabele simple și **text îngroșat**) pentru a face răspunsurile ușor de parcurs, în special pe ecrane de telefon mobil.

Ai la dispoziție următoarea BAZĂ DE CUNOȘTINȚE (Knowledge Base) cu ghidurile verificate ale platformei noastre:

${articlesContext}

REGULI DE RĂSPUNS CRUCIALE:
1. Răspunsuri bazate pe ghiduri: Dacă întrebarea utilizatorului se referă la un subiect din baza de cunoștințe (de exemplu: cum obții BSN-ul, riscul propriu la asigurare, pașii la KVK pentru ZZP), folosește informațiile din textul gura de aur de mai sus.
2. Linkuri către ghiduri: Când răspunzi pe baza unui ghid, adaugă în răspuns un link markdown la articolul respectiv, folosind structura exactă: [Titlu Ghid](/ghid/slug). 
   Exemple disponibile:
   - Pentru BSN / Primărie: [Înregistrarea la primărie și obținerea BSN](/ghid/inschrijving-primarie-bsn)
   - Pentru asigurări: [Asigurarea de sănătate în Olanda](/ghid/asigurare-sanatate)
   - Pentru KVK / ZZP: [Înregistrarea ca freelancer (ZZP) la KVK](/ghid/inregistrare-kvk-zzp)
3. Cunoștințe generale & Limitare: Dacă întrebarea este despre viața în Olanda (de exemplu chirii, transport, alte tipuri de taxe), dar NU este acoperită în totalitate în baza de cunoștințe, răspunde din cunoștințele tale generale despre sistemul olandez, dar adaugă avertismentul: "*Notă: Această informație nu este în ghidurile noastre oficiale, ci este oferită ca orientare generală.*" și îndrumă utilizatorul spre surse guvernamentale oficiale (ex: Belastingdienst, KVK, Rijksoverheid).
4. Subiecte off-topic: Dacă utilizatorul te întreabă chestiuni complet irelevante pentru viața de migrant în Olanda (de exemplu: rețete, cod software, istoria universală), refuză politicos și amintește-i rolul tău:
   "Sunt un asistent dedicat ghidării românilor în Olanda. Vă pot ajuta cu informații despre obținerea BSN, asigurări de sănătate, deschiderea unei firme (KVK) sau alte aspecte legate de stabilirea în Olanda. Cu ce informație de acest gen vă pot ajuta astăzi?"
5. Declinarea responsabilității: Încheie răspunsurile lungi sau cele pe teme fiscale/juridice cu o scurtă mențiune: "*Informațiile oferite au caracter pur informativ și nu înlocuiesc consultanța oficială a instituțiilor abilitate.*"
`;

    // 5. Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);

    // We use gemini-3.1-flash-lite as the default fast, stable and cost-effective model
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite',
      systemInstruction: systemPrompt,
    });

    // 6. Transform chat history for Gemini SDK
    // Gemini history expects { role: 'user' | 'model', parts: [{ text: string }] }
    // We skip the last message in history as it is sent via sendMessage
    interface ChatMessage {
      role: 'user' | 'model';
      content: string;
    }
    const typedMessages = messages as ChatMessage[];
    const history = typedMessages.slice(0, -1).map((msg: ChatMessage) => ({
      role: msg.role === 'user' ? 'user' : 'model' as const,
      parts: [{ text: msg.content }],
    }));

    // Start Chat session with history
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.2, // Low temperature for factual consistency
      }
    });

    // 7. Send the latest message and await response
    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

    return NextResponse.json({
      role: 'model',
      content: responseText
    });

  } catch (error: unknown) {
    console.error('Error in chat API route:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: 'INTERNAL_SERVER_ERROR',
        message: 'A apărut o eroare la procesarea mesajului tău de către asistentul AI.',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
