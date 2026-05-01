import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: "Ido Moyal",
  intro: "I'm Ido, Copywriter, content creator, and a nerd of all things cool.",
  personality: "I was raised in the rural north. now I live Downtown. In love with Kendrick Lamar and cry to the Beatles. I grew up in hookah bars - I also fit in well at Poetry Slams.",
  about: "Welcome! Take a peek into my brain :-) or what's left of it...",
  cvUrl: "https://www.idomoyal.com/encv",
  contact: {
    email: "idomoyal23@gmail.com",
    phone: "052-6601167",
    instagram: "https://instagram.com/idomoyal",
    linkedin: "https://linkedin.com/in/idomoyal",
  },
  socialVideos: [
    {
      id: "sv1",
      title: "Social Content 1",
      url: "https://drive.google.com/file/d/1wOVykMwHDG7Wp6KJEopSDdBxWhSp-A_9/view",
      stats: { views: "7.5k", likes: "171", comments: "11" },
    },
    {
      id: "sv2",
      title: "Social Content 2",
      url: "https://drive.google.com/file/d/1LCH5-VoYmCFeQ-MLR0MS2oFmUGB4mqTS/view",
      stats: { views: "6.5k", likes: "702", comments: "27" },
    },
    {
      id: "sv3",
      title: "Social Content 3",
      url: "https://drive.google.com/file/d/17vDnXywzwJ7-_RXkE5R_mO7Ieio9D0c2/view",
      stats: { views: "95.6k", likes: "3,767", comments: "91" },
    },
    {
      id: "sv4",
      title: "Social Content 4",
      url: "https://drive.google.com/file/d/1f9xI5yXR4nJ1cg3z0m1-fV4MCSyipgpZ/view",
      stats: { views: "121k", likes: "4,792", comments: "133" },
    },
  ],
  brandVideos: [
    {
      id: "bv1",
      name: "iCount Master Launch",
      mediaUrl: "/bv1.mp4",
      description: "iCount's newest subscription tier includes an online accountant",
    },
    {
      id: "bv2",
      name: "iCount AI Launch",
      mediaUrl: "/bv2.mp4",
      description: "AI feature launch video",
    },
    {
      id: "bv_kids",
      name: "iCount Kids",
      mediaUrl: "https://www.youtube.com/watch?v=Ai3CLbsHfjo",
      description: 'The perfect playlist for kids of "solopreneurs"',
      playlist: [
        { id: "pl1", title: "עכשיו כולנו עצמאים 💪", mediaUrl: "https://www.youtube.com/watch?v=Ai3CLbsHfjo" },
        { id: "pl2", title: "מר מע\"מ וגברת שומה 👩‍❤️‍👨", mediaUrl: "https://www.youtube.com/watch?v=LxYeKT5K1xk" },
        { id: "pl3", title: "אמא שלי עצמאית 👩‍🍳", mediaUrl: "https://www.youtube.com/watch?v=d9eYPi2_ULA" },
        { id: "pl4", title: "ריקוד הקבלה 👏", mediaUrl: "https://www.youtube.com/watch?v=NAT073CyUpI" }
      ]
    },
    {
      id: "bv3",
      name: "iCount is for Everyone",
      mediaUrl: "", // Legacy fallback
      mediaUrls: [
        "/video1.mp4",
        "/video2.mp4"
      ],
      description: "even for YOUR weird business",
    },
  ],
  brandGridVideos: [
    { id: "bgv1", title: " ", url: "https://drive.google.com/file/d/1MDqDT447diOYatpa_4xWA9wh7IWolvTA/view" },
    { id: "bgv2", title: " ", url: "https://drive.google.com/file/d/1l_WG3dnuYmkpmbg1k5RO95Eb6fpL4ma-/view" },
    { id: "bgv3", title: " ", url: "https://drive.google.com/file/d/1iGrAm2iWgVpngysBkOMG2AFuLCeeZAWb/view" },
    { id: "bgv4", title: " ", url: "https://drive.google.com/file/d/1MDqDT447diOYatpa_4xWA9wh7IWolvTA/view" },
    { id: "bgv5", title: " ", url: "https://drive.google.com/file/d/1l_WG3dnuYmkpmbg1k5RO95Eb6fpL4ma-/view" },
    { id: "bgv6", title: " ", url: "https://drive.google.com/file/d/1iGrAm2iWgVpngysBkOMG2AFuLCeeZAWb/view" },
    { id: "bgv7", title: " ", url: "https://drive.google.com/file/d/1X87qUityNLwNs1Xw8m3r10YgECMKINdv/view" },
    { id: "bgv8", title: " ", url: "https://drive.google.com/file/d/1qtkzs3Hh-2UOdA_0ioTkqA1mdu0gIOQY/view" },
    { id: "bgv9", title: " ", url: "https://drive.google.com/file/d/19NwSB7hO6qFggiMiRZp7c_Rl2H8mfvIW/view" },
  ],
  socialPosts: [
    { id: "sp1", title: "Social_Post_01.jpg", imageUrl: "https://drive.google.com/uc?id=1ec4vS4T4XKD7Xs8z2sJlZj61ZAYQeeBn" },
    { id: "sp2", title: "Social_Post_02.jpg", imageUrl: "https://drive.google.com/uc?id=1lX3wtHO_dy2DEuk5WrxdZi7RzygFMcOz" },
    { id: "sp3", title: "Social_Post_03.jpg", imageUrl: "https://drive.google.com/uc?id=17N3AGmYbm4ipGInoOsqK0wk6WJu2IVGU" },
    { id: "sp4", title: "Social_Post_04.jpg", imageUrl: "https://drive.google.com/uc?id=1bcPZDx0MO_0JISjhvf1eQzqDpwBcDlO1" },
    { id: "sp5", title: "Social_Post_05.jpg", imageUrl: "https://drive.google.com/uc?id=1BIIgXBFRHqqMpcT8wWQ5QYS1Jhr1QVsW" },
    { id: "sp6", title: "Social_Post_06.jpg", imageUrl: "https://drive.google.com/uc?id=1EXtFCwO_yJ-2w8gQE78YMCYtshzj-RzT" },
    { id: "sp7", title: "Social_Post_07.jpg", imageUrl: "https://drive.google.com/uc?id=1ALhoKe1j5EjL4gZCyzy9NhuUvXQ1KLGP" },
    { id: "sp8", title: "Social_Post_08.jpg", imageUrl: "https://drive.google.com/uc?id=1GHZU4e9m4Pk6lYO2RVPBTyx6HgBCScOc" },
    { id: "sp9", title: "Social_Post_09.jpg", imageUrl: "https://drive.google.com/uc?id=1luxMKNr729TDsTeHTVTj2nj-EIBbjeb2" },
  ],
  articles: [
    {
      id: "art1",
      title: "Opinion Article",
      publication: "En { } Culture Magazine",
      date: "March 2024",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      link: "#",
    },
  ],
};
