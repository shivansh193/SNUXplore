'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function DialogflowSetup() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css'
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  useEffect(() => {
    if (isClient && customElements.get('df-messenger') === undefined) {
      const dfMessenger = document.createElement('df-messenger')
      dfMessenger.setAttribute('project-id', 'propane-sphinx-433408-q1')
      dfMessenger.setAttribute('agent-id', 'aedec1b1-f853-4874-880e-8f0cb918499a')
      dfMessenger.setAttribute('language-code', 'en')
      dfMessenger.setAttribute('max-query-length', '-1')

      const dfMessengerChat = document.createElement('df-messenger-chat')
      dfMessengerChat.setAttribute('chat-title', 'SNU-GPT')
      dfMessenger.appendChild(dfMessengerChat)

      document.body.appendChild(dfMessenger)
    }
  }, [isClient])

  return (
    <>
      <Script
        src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"
        strategy="afterInteractive"
      />
      {isClient && <div id="df-messenger-container" />}
    </>
  )
}