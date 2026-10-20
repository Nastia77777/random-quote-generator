const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  telegramBtn = document.querySelector(".telegram"),
  synth = speechSynthesis;

const quotes = [
  { content: "Never give up because you never know if the next try is going to be the one that works.", author: "Mary Kay Ash" },
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { content: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { content: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { content: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { content: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { content: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { content: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
  { content: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { content: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
  { content: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { content: "In the long run, we shape our lives and we shape ourselves.", author: "Eleanor Roosevelt" },
  { content: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison" },
  { content: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.", author: "Dr. Seuss" },
  { content: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { content: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey" },
  { content: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", author: "James Cameron" },
  { content: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou" },
  { content: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { content: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { content: "Money and success don't change people; they merely amplify what is already there.", author: "Will Smith" },
  { content: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { content: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
  { content: "If life is a journey, the best part is the scenery you see along the way.", author: "Anonymous" },
  { content: "Every child is an artist. The problem is how to remain an artist once we grow up.", author: "Pablo Picasso" },
  { content: "You can never cross the ocean until you have the courage to lose sight of the shore.", author: "Christopher Columbus" },
  { content: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou" },
  { content: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
  { content: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { content: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain" },
  { content: "Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.", author: "Johann Wolfgang von Goethe" },
  { content: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { content: "An unexamined life is not worth living.", author: "Socrates" },
  { content: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { content: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { content: "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.", author: "Martin Luther King Jr." },
  { content: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson" },
  { content: "Challenges are what make life interesting and overcoming them is what makes life meaningful.", author: "Joshua J. Marine" },
  { content: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
  { content: "I have been impressed with the urgency of doing. Knowing is not enough; we must apply.", author: "Leonardo da Vinci" },
  { content: "We know what we are, but know not what we may be.", author: "William Shakespeare" },
  { content: "Perfection is not attainable, but if we chase perfection we can catch excellence.", author: "Vince Lombardi" },
  { content: "Life is what we make it, always has been, always will be.", author: "Grandma Moses" },
];

let lastIndex = -1;

function showQuote({ content, author }) {
  quoteText.innerText = content;
  authorName.innerText = author;
  quoteBtn.classList.remove("loading");
  quoteBtn.innerText = "New Quote";
}

function localFallback() {
  let index;
  do { index = Math.floor(Math.random() * quotes.length); }
  while (index === lastIndex && quotes.length > 1);
  lastIndex = index;
  showQuote(quotes[index]);
}

async function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading...";

  try {
    const res = await fetch("https://zenquotes.io/api/random", { signal: AbortSignal.timeout(5000) });
    const [data] = await res.json();
    if (data?.q && data?.a) {
      showQuote({ content: data.q, author: data.a });
      return;
    }
  } catch (_) {}

  try {
    const res = await fetch("https://dummyjson.com/quotes/random", { signal: AbortSignal.timeout(5000) });
    const data = await res.json();
    if (data?.quote && data?.author) {
      showQuote({ content: data.quote, author: data.author });
      return;
    }
  } catch (_) {}

  localFallback();
}

let voices = [];
let speechInterval = null;

function loadVoices() {
  voices = synth.getVoices();
}

loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

function pickVoice() {
  const preferred = ["Google UK English Female", "Microsoft Zira - English (United States)", "Samantha", "Karen"];
  for (const name of preferred) {
    const v = voices.find(v => v.name === name);
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith("en")) || voices[0] || null;
}

speechBtn.addEventListener("click", () => {
  if (synth.speaking) {
    synth.cancel();
    speechBtn.classList.remove("active");
    clearInterval(speechInterval);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(
    `${quoteText.innerText}. By ${authorName.innerText}.`
  );

  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  utterance.onstart = () => {
    speechBtn.classList.add("active");
    clearInterval(speechInterval);
    speechInterval = setInterval(() => {
      if (!synth.speaking) {
        speechBtn.classList.remove("active");
        clearInterval(speechInterval);
      }
    }, 150);
  };

  utterance.onend = () => {
    speechBtn.classList.remove("active");
    clearInterval(speechInterval);
  };

  utterance.onerror = () => {
    speechBtn.classList.remove("active");
    clearInterval(speechInterval);
  };

  synth.speak(utterance);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`"${quoteText.innerText}" — ${authorName.innerText}`);
});

telegramBtn.addEventListener("click", () => {
  const text = `"${quoteText.innerText}" — ${authorName.innerText}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
  window.open(telegramUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);
quoteBtn.addEventListener("click", randomQuote);