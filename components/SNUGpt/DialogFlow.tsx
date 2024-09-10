"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "df-messenger": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "project-id": string;
        "agent-id": string;
        "language-code": string;
        "max-query-length": string;
      };
      "df-messenger-chat": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "chat-title": string;
      };
    }
  }
}

const DialogflowMessenger: React.FC = () => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);

    const loadDialogflowMessenger = async () => {
      if (!customElements.get("df-messenger")) {
        const script = document.createElement("script");
        script.src = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
        script.async = true;
        document.body.appendChild(script);

        await new Promise((resolve) => {
          script.onload = resolve;
        });

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";
        document.head.appendChild(link);
      }
    };

    loadDialogflowMessenger();
  }, []);

  useEffect(() => {
    if (domReady) {
      const style = document.createElement("style");
      style.innerHTML = `
       df-messenger {
        z-index: 100000;
        position: fixed;
        right: 0;
        width: 100vw;
        height: 100vh;
        --df-messenger-font-color: #000000;
        --df-messenger-font-family: Google Sans;
        --df-messenger-chat-background: #172449;
        --df-messenger-message-user-background: #F4B400;
        --df-messenger-message-bot-background: #FFFFFF;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      }

      df-messenger df-messenger-chat {
        height: 100%;
        width: 100%;
      }
      `;
      document.head.appendChild(style);
    }
  }, [domReady]);

  if (!domReady) {
    return null;
  }

  return ReactDOM.createPortal(
    <df-messenger
      project-id="propane-sphinx-433408-q1"
      agent-id="aedec1b1-f853-4874-880e-8f0cb918499a"
      language-code="en"
      max-query-length="2000"
    >
      <df-messenger-chat chat-title="SNU-GPT" />
    </df-messenger>,
    document.body
  );
};

export default DialogflowMessenger;
