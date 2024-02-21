type Question = {
  question: string;
  asset: string[];
  answer: string;
  clue: string;
};

export const watsonData: Question[] = [
  {
    question:
      "Watson who has been away from London is back after finding out that Sherlock is no more. He finds it suspicious that the last rites has all been finished in an hurry. He meets his wife Mary who hands over a clue to him.",
    asset: [
      "https://drive.google.com/file/d/1zwIWQ3A5u3kKQNz7fxYFUQqdaGDZK-qR/view?usp=drive_link",
    ],
    answer:
      "Am I really dead, will it be that easy for someone. Find me! It's time to dig up some secrets.",
    clue: "Use alphabetical Substitution",
  },
  {
    question:
      "He goes to visit Sherlock's grave and opens the coffin to find it empty as he had suspected and finds a note.",
    asset: [
      "https://drive.google.com/file/d/1zMt-X7r8QgkJCZ5JSd1IRwxJ934Xz5gz/view?usp=drive_link",
      "https://drive.google.com/file/d/1b7jK8BJgaGJB-duXtAjjhF4DOu_lU8xc/view?usp=drive_link",
    ],
    answer: "GO TO IRENES HOME",
    clue: "Use Pig Pen.",
  },
  {
    question:
      "Watson visits Irene's home and in the Hearth/ Fire place finds a message carved on it.",
    asset: [
      "https://drive.google.com/file/d/1MNxxD5cQlcxY2B6MIsGy1-5fSyEYgeNv/view?usp=drive_link",
      "https://drive.google.com/file/d/1fz2DpAxityBEs8HZas1uiiA9btSAy7sV/view?usp=drive_link",
    ],
    answer: "MY HOME IS WHERE YOU GO NEXT",
    clue: "TRIMETHIUS CIPHER",
  },
  {
    question:
      "He also finds something written onto the wall nearby. Add them after decoding and answer it in numerical form.",
    asset: [
      "https://drive.google.com/file/d/1k3sENeAlNI9v5HZm5DAafYmjaUnH1l_l/view?usp=drive_link",
    ],
    answer: "51.359375",
    clue: "Use Binary to Decimal Conversion and add the 2 numerical values.",
  },
  {
    question:
      "Watson arrives at Sherlock's home and finds Mycroft Holmes trying to decode Sherlock's Laptop password.",
    asset: [
      "https://drive.google.com/file/d/1LXN4wN6eH6xrTraV68pISIGaHVQ-S7UU/view?usp=drive_link",
    ],
    answer: "ROCKPAPERSCISSOR",
    clue: "Use Bifid Cipher Instruction to solve.",
  },
  {
    question:
      "Opening the laptop, Watson finds a message in code open in word.",
    asset: [
      "https://drive.google.com/file/d/1aftvZOxUb_VbFCRVU6z8HhrTWXIDGPno/view?usp=drive_link",
      "https://drive.google.com/file/d/1S8wCnI1MGBR5gCXTmpYXweuL0ZsZ9mxt/view?usp=drive_link",
    ],
    answer: "THE INSPECTOR WILL LEAD YOU",
    clue: "Use Caesar Cipher to solve.",
  },
  {
    question:
      "From the clue in the document that he meet the Inspector, Watson visits Inspector Lestarde at the police station who informs him that before Sherlock's supposed death, Sherlock had visited him for obtaining certain case files and that while he had been searching Sherlock had scribbled something onto his table.",
    asset: [
      "https://drive.google.com/file/d/1rJskchV_YiBozuKUsSOAS5Jl5oUMy9iY/view?usp=drive_link",
      "https://drive.google.com/file/d/1zQRnnAZBxNel27eO-xy2W7rekIixgsr4/view?usp=drive_link",
    ],
    answer: "MEET SISTER HOLMES.",
    clue: "Use Morse Code to find the answer.",
  },
  {
    question:
      "From the Police Station, he goes to find Enola who playfully pits a card puzzle on Watson to solve. Answer the card name in following manner: 7 OF HEART, QUEEN OF DIAMOND,etc.",
    asset: [
      "https://drive.google.com/file/d/1pu92IkED82SNSa6Rg-X-TvmAOZTaxNUh/view?usp=drive_link",
    ],
    answer: "KING OF CLUBS",
    clue: "Top left --> Right --> Down --> Left --> Continue in Snake and Ladder Method.",
  },
  {
    question:
      "In Audio:",
    asset: [
      "https://drive.google.com/file/d/1pu92IkED82SNSa6Rg-X-TvmAOZTaxNUh/view?usp=drive_link",
    ],
    answer: "HOME",
    clue: "Where do you live? 4 Letter word.",
  },
  {
    question:
      "Once Sherlock and Watson meet they discuss on their findings and find out that Watson has uncovered a clue that Sherlock had fail to notice and find out it is the latitude and longitude leading to a location. They find the location empty with the following left behind by the mastermind behind the plot. Find him. Answer his full name all in caps.",
    asset: [
      "https://drive.google.com/file/d/1gXtR1jZM-ajy3jVatQCYekPk9mfaggSH/view?usp=drive_link",
    ],
    answer: "James Moriarty",
    clue: "He is a Professor and a Math Genius.",
  },
];
