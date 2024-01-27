import jujutsuKaisen from "../assets/jjk.jpg";
import demonSlayer from "../assets/demon slayerjpg.jpg";
import myHeroAcademia from "../assets/bnha.jpg";
import tokyoGhoul from "../assets/tokyo ghoul.webp";

export const recommended = [
  {
    img: myHeroAcademia,
    title: "My Hero Academia",
    desc: 'The appearance of "quirks," newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity',
    mal_id: 31964,
  },
  {
    img: jujutsuKaisen,
    title: "Jujutsu Kaisen",
    desc: "dly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the",
    mal_id: 40748,
  },
  {
    img: tokyoGhoul,
    title: "Tokyo Ghoul",
    desc: 'A sinister threat is invading Tokyo: flesh-eating "ghouls" who appear identical to humans and blend into their population. Reserved college',
    mal_id: 22319,
  },
  {
    img: demonSlayer,
    title: "Demon Slayer",
    desc: "Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamado's shoulders. Though living impoverished",
    mal_id: 38000,
  },
];

export const navLinks = [
  { id: 1, text: "home", path: "/" },
  { id: 2, text: "anime", path: "/anime" },
  { id: 3, text: "popular", path: "/popular" },
];
