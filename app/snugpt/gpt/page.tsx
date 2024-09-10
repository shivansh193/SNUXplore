import Footer from '@/components/Footer'
import DialogflowMessenger from '../../../components/SNUGpt/DialogFlow'

export default function Home() {
  return (
    <main>
      <div className="chat-container">
        <DialogflowMessenger />
    
      </div>
    </main>
  )
}