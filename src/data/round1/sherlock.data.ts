type Question = {
  question: string;
  asset: string[];
  answer: string;
  clue: string;
};

export const sherlockData: Question[] = [
  {
    question:
      "Sherlock is visiting Irene at the Hospital after the fateful accident. Irene is in recovery and safe, but is acting weird for some reason, which Sherlock has been noticing. Irene secretly slides a chit into Sherlock's hand.",
    asset: ["1.png"],
    answer: "Some one wants you dead",
    clue: "The answer is hidden across words similar to the joke made in Nanban.",
  },
  {
    question:
      "Knowing that his life is targeted with Irene as the bait, Sherlock decides to do something about it. He entrusts Enola Holmes to find a solution to it, and she finds one. But being a child, she is being playful and asks for Sherlock to solve a puzzle. Find 'ABCDEFGHIJ'.",
    asset: ["2.png"],
    answer: "2653135165",
    clue: " Solve the riddle both vertically and horizontally for the answer",
  },
  {
    question:
      "The next day Sherlock is visited by Irene at his house. IRENE: 'To me disguise was always a self-potrait. But this? This is more intimate. This is my heart!' (Faints on Sherlock's hand where Sherlock notices it's a ruse to pass her Phone to Sherlock with a note that reads 'Open it'.)",
    asset: ["3.png"],
    answer: "SHER",
    clue: "It's about you!",
  },
  {
    question:
      "The Phone's messenger provides a photo which reveals a blackmail order intercepted by a Hacker helping Irene but not fully decrypted. Decrypt the data.",
    asset: ["4.png"],
    answer: "BOTULINUM TOXIN",
    clue: "Poison that blocks the release of Acetylcholine.",
  },
  {
    question:
      "Irene who had been sent to Hospital to continue the ruse, has gone missing, and Sherlock, realising the weight of the situation he is in, fakes his DEATH. Goes to Irene's home to solve the mystery which leads him to the Locker.",
    asset: ["5.png"],
    answer: "27924300",
    clue: "Use BODMAS, and answer will be an 8 digit number.",
  },
  {
    question:
      "Sherlock finds the Chemical that was bought and with it the address to its place of origin. He leaves Irene's home in a haste not noticing a clue that has been left behind. He visits the Chemical factory in secret and find's a System at the Admin's office. (Answer in WORDS)",
    asset: ["6.png"],
    answer: "NINE",
    clue: "A cat's life expectency.",
  },
  {
    question:
      "Sherlock finds three files that have been Encrypted and has to Decrypt them.",
    asset: ["7.png"],
    answer: "INVESTMENT",
    clue: "Use CONNEXIONS",
  },
  {
    question:
      "Sherlock finds three files that have been Encrypted and has to Decrypt them. The final answer is the answer to the decrypted solution of the encrypted data.",
    asset: ["8.png"],
    answer: "PROFESSOR",
    clue: "Use Simple Transposition and then answer the question (which is the answer to the Simple Transposition.",
  },
  {
    question:
      "Sherlock finds three files that have been Encrypted and has to Decrypt them.",
    asset: ["9A.png", "9B.png"],
    answer: "ALL READY",
    clue: "The two-word linear words are marked in the crossword.",
  },
  {
    question:
      "Once Sherlock and Watson, meet they discuss on their findings and find out that Watson has uncovered a clue that Sherlock had fail to notice, and find out it is the latitude and longitude leading to a location. They find the location empty with the following left behind by the mastermind behind the plot. Find him. Answer his full name.",
    asset: ["19.png"],
    answer: "James Moriarty",
    clue: "He is a Professor and a Math Genius.",
  },
];
