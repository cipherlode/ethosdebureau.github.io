// Live Chat Widget JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatMessageInput = document.getElementById('chatMessageInput');
    const chatSendButton = document.getElementById('chatSendButton');
    const chatMessages = document.getElementById('chatMessages');
    
    // Toggle chat window
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active')) {
                chatMessageInput.focus();
                // Remove badge when opening
                const badge = chatButton.querySelector('.chat-badge');
                if (badge) {
                    badge.style.display = 'none';
                }
            }
        });
    }
    
    // Close chat
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }
    
    // Send message function
    function sendMessage() {
        const message = chatMessageInput.value.trim();
        
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        chatMessageInput.value = '';
        
        // Simulate bot response after delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
    
    // Send message on button click
    if (chatSendButton) {
        chatSendButton.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter key
    if (chatMessageInput) {
        chatMessageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const time = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">EB</div>
                <div class="message-content">
                    <p>${text}</p>
                    <span class="message-time">${time}</span>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content" style="margin-left: auto; max-width: 70%;">
                    <p style="background: linear-gradient(135deg, #0a2540, #00d4ff); color: white;">${text}</p>
                    <span class="message-time" style="text-align: right; display: block;">${time}</span>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Simple bot responses
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Keyword-based responses
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! I'm here to help you recover your funds. Can you tell me what type of scam you've experienced?";
        }
        
        if (message.includes('crypto') || message.includes('bitcoin') || message.includes('btc')) {
            return "I understand you're dealing with a cryptocurrency scam. We specialize in crypto recovery using blockchain forensics. How much did you lose, and when did this happen?";
        }
        
        if (message.includes('romance') || message.includes('dating') || message.includes('relationship')) {
            return "Romance scams are unfortunately very common. We've helped many victims recover their funds. Can you share details about the platform where you met this person?";
        }
        
        if (message.includes('investment') || message.includes('trading') || message.includes('forex')) {
            return "Investment fraud cases require careful documentation. Do you have records of your transactions and communications with the fraudsters?";
        }
        
        if (message.includes('help') || message.includes('how')) {
            return "Our process is simple: 1) Free consultation 2) Case analysis 3) Recovery action plan 4) Fund tracing 5) Return of your money. Would you like to schedule a free consultation call?";
        }
        
        if (message.includes('cost') || message.includes('fee') || message.includes('price')) {
            return "We work on a success-based fee structure - NO upfront fees! We only get paid when we successfully recover your funds. This ensures our interests align with yours.";
        }
        
        if (message.includes('time') || message.includes('long') || message.includes('duration')) {
            return "Recovery timelines vary by case complexity. Simple cases: 4-8 weeks. Complex international cases: 3-6 months. We'll provide a realistic timeline after our initial assessment.";
        }
        
        if (message.includes('contact') || message.includes('call') || message.includes('speak')) {
            return "I'd be happy to connect you with a recovery specialist! You can message us via whatsapp at +44 7404 461965 or fill out our consultation form. Would you like me to transfer you to a specialist now?";
        }
        
        if (message.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        
        // Default response
        return "I understand your concern. For the best assistance, I recommend speaking with one of our recovery specialists. Would you like to schedule a free consultation call? You can also message us via whatsapp at +44 7404 461965.";
    }
    
    // Show initial message after 3 seconds if first visit
    if (!sessionStorage.getItem('chatShown')) {
        setTimeout(() => {
            const badge = chatButton.querySelector('.chat-badge');
            if (badge) {
                badge.style.display = 'flex';
            }
        }, 3000);
        sessionStorage.setItem('chatShown', 'true');
    }
    
});
