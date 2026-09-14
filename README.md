# CryptoRates App

Hi. This is my educational project, which displays the current cryptocurrency exchange rates against USDT.

The goal of my project was to learn how to work with WebSockets. In this project, I used Binance’s WebSocket.

I also used the following technologies in this project:
1. TypeScript
2. React
3. CSS

The most challenging part of this project was creating a controllable WebSocket. To do this, I had to rewrite the `useCryptoPrice` hook (now `usePairInfo`) and add `connect` and `disconnect` functions so I could call them manually in the App, as well as make the hook more versatile so that it also returns `SocketStatus`, `direction`, etc. You can see the detailed changes in the commits.

But overall, working with WebSockets didn’t seem too difficult to me. It was a pretty interesting experience and project.

Translated with DeepL.com (free version)
