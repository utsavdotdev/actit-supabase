const motivationalPhrases = [
  "Keep going.",
  "You got this!",
  "One step at a time.",
  "Believe in yourself.",
  "Stay positive.",
  "Keep pushing forward.",
  "You're making progress.",
  "Focus on your goals.",
  "You're stronger than you know.",
  "Never give up.",
  "Dream big.",
  "Stay determined.",
  "Embrace challenges.",
  "Rise above.",
  "Stay motivated.",
  "Work hard, stay humble.",
  "Think positive.",
  "Stay focused.",
  "Push your limits.",
  "Success takes effort.",
];

export const getPhrase = () => {
  return motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
};
