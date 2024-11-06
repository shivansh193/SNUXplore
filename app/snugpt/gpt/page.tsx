
import SearchBar from '@/components/SearchBar'
import Chat from '@/components/SNUGpt/chat'

export default function Home() {
  return (
    <main>
     
      <div className="chat-container">
        <SearchBar />
        <Chat />
    
      </div>
    </main>
  )
}