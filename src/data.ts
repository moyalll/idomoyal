import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: "Ido Moyal",
  intro: "Copywriter, content creator, and a nerd of all things cool.",
  personality: "I was raised in the rural north. now I live Downtown.\nIn love with Kendrick Lamar and cry to the Beatles.\nGrew up in hookah bars - feels at home at Poetry Slams.",
  about: "Welcome! Take a peek into my brain :-) or what's left of it...",
  cvUrl: "https://www.idomoyal.com/encv",
  contact: {
    email: "idomoyal23@gmail.com",
    phone: "052-6601167",
    instagram: "https://www.instagram.com/moyal/",
    linkedin: "https://linkedin.com/in/idomoyal",
  },
  socialVideos: [
    {
      id: "sv1",
      title: "Social Content 1",
      url: "https://www.youtube.com/shorts/K5LnMJm6b0E",
      stats: { views: "7.5k", likes: "171", comments: "11" },
    },
    {
      id: "sv2",
      title: "Social Content 2",
      url: "https://www.youtube.com/shorts/d9c7jjtLsAc",
      stats: { views: "95.6k", likes: "3,767", comments: "91" },
    },
    {
      id: "sv3",
      title: "Social Content 3",
      url: "https://www.youtube.com/watch?v=YQEOdv3ckbQ&t=34s",
      stats: { views: "121k", likes: "4,792", comments: "133" },
    },
  ],
  brandVideos: [
    {
      id: "bv1",
      name: "iCount Master Launch",
      mediaUrl: "https://youtu.be/G3VkLewushk",
      description: "iCount's newest subscription tier includes an online accountant",
    },
    {
      id: "bv2",
      name: "iCount AI Launch",
      mediaUrl: "https://youtu.be/fuSLzBxz2eU",
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
        "https://youtube.com/shorts/h2EQirWeFQ8",
        "https://youtube.com/shorts/hz3iNf4FRGs"
      ],
      description: "even for YOUR weird business",
    },
  ],
  brandGridVideos: [
    { id: "bgv1", title: " ", url: "https://youtube.com/shorts/6OucxMOKrWk" },
    { id: "bgv2", title: " ", url: "https://youtube.com/shorts/vvW9Q0GdB4A" },
    { id: "bgv3", title: " ", url: "https://youtube.com/shorts/LaJpTHTFLFc" },
    { id: "bgv4", title: " ", url: "https://youtube.com/shorts/ZxPUJpjHh9k" },
    { id: "bgv5", title: " ", url: "https://youtube.com/shorts/8DcSzB8hpBU" },
    { id: "bgv6", title: " ", url: "https://youtube.com/shorts/HMMigBlctm8" },
    { id: "bgv7", title: " ", url: "https://youtube.com/shorts/9n6AMtBZgho" },
    { id: "bgv8", title: " ", url: "https://youtube.com/shorts/QCOMjhMP9qM" },
    { id: "bgv9", title: " ", url: "https://youtube.com/shorts/zojD91wgpj4" },
  ],
  socialPosts: [
    { id: "sp1", title: "Post 1", imageUrl: "https://drive.google.com/uc?id=1ec4vS4T4XKD7Xs8z2sJlZj61ZAYQeeBn" },
    { id: "sp2", title: "Post 2", imageUrl: "https://drive.google.com/uc?id=1lX3wtHO_dy2DEuk5WrxdZi7RzygFMcOz" },
    { id: "sp3", title: "Post 3", imageUrl: "https://drive.google.com/uc?id=17N3AGmYbm4ipGInoOsqK0wk6WJu2IVGU" },
    { id: "sp4", title: "Post 4", imageUrl: "https://drive.google.com/uc?id=1bcPZDx0MO_0JISjhvf1eQzqDpwBcDlO1" },
    { id: "sp5", title: "Post 5", imageUrl: "https://drive.google.com/uc?id=1BIIgXBFRHqqMpcT8wWQ5QYS1Jhr1QVsW" },
    { id: "sp6", title: "Post 6", imageUrl: "https://drive.google.com/uc?id=1EXtFCwO_yJ-2w8gQE78YMCYtshzj-RzT" },
    { id: "sp7", title: "Post 7", imageUrl: "https://drive.google.com/uc?id=1ALhoKe1j5EjL4gZCyzy9NhuUvXQ1KLGP" },
    { id: "sp8", title: "Post 8", imageUrl: "https://drive.google.com/uc?id=1GHZU4e9m4Pk6lYO2RVPBTyx6HgBCScOc" },
    { id: "sp9", title: "Post 9", imageUrl: "https://drive.google.com/uc?id=1luxMKNr729TDsTeHTVTj2nj-EIBbjeb2" },
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
