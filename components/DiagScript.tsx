// app/components/DialogflowScript.tsx
'use client'

import Script from 'next/script'

export default function DialogflowScript() {
  return (
    <Script
      src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"
      strategy="afterInteractive"
    />
  )
}