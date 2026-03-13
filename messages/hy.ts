import en from "@/messages/en";

const hy = {
  Metadata: {
    title: "AI Photo Books",
    description:
      "Անհատականացված AI գրքեր, որտեղ ձեր երեխան դառնում է հեքիաթի հերոսը։",
  },
  Header: {
    brandName: "AI Photo Books",
    books: "Գրքեր",
    howItWorks: "Ինչպես է աշխատում",
    signIn: "Մուտք",
    signUp: "Գրանցվել",
    adminDashboard: "Ադմին վահանակ",
  },
  Footer: {
    brandName: "AI Photo Books",
    description:
      "Անհատականացված հեքիաթագրքեր, որտեղ ձեր երեխան դառնում է հերոսը։ Վերբեռնեք լուսանկար, ստեղծեք կերպար և րոպեների ընթացքում դիտեք կախարդական գիրքը։",
    quickLinks: "Արագ հղումներ",
    books: "Գրքեր",
    howItWorks: "Ինչպես է աշխատում",
    signIn: "Մուտք",
    signUp: "Գրանցվել",
    supportLabel: "Աջակցություն",
  },
  LanguageSwitcher: {
    label: "Լեզու",
    english: "English",
    armenian: "Հայերեն",
  },
  HomePage: {
    badge: "Անհատականացված հեքիաթագրքեր",
    title: "Դարձրեք ձեր երեխային իր սեփական AI գրքի գլխավոր հերոսը",
    description:
      "Վերբեռնեք ձեր երեխայի դիմանկարը, ստեղծեք համապատասխան հեքիաթային կերպար և նախադիտեք կախարդական գրքերը մինչև տպելը։",
    exploreBooks: "Դիտել գրքերը",
    startPersonalizing: "Սկսել անհատականացումը",
    heroMetricOneLabel: "Տարիքային խումբ",
    heroMetricOneValue: "3-10 տարեկան",
    heroMetricTwoLabel: "Նախադիտման ժամանակ",
    heroMetricTwoValue: "Մինչև 2 րոպե",
    heroMetricThreeLabel: "Հեքիաթային մոգություն",
    heroMetricThreeValue: "100% յուրահատուկ զգացողություն",
    featuredBooks: "Ընտրված գրքեր",
    featuredDescription: "Դիտեք անհատականացման համար հասանելի աղբյուր-գրքերը։",
    booksLabel: "գիրք",
    emptyBooks:
      "Առայժմ գրքեր հասանելի չեն։ Ավելացրեք products և source generated books, որպեսզի դրանք երևան այստեղ։",
    howItWorks: "Ինչպես է աշխատում",
    howItWorksHeading: "Դիմանկարից մինչև հիշարժան գիրք՝ 3 պարզ քայլով",
    stepOneTitle: "1. Վերբեռնեք դիմանկար",
    stepOneDescription:
      "Ծնողը վերբեռնում է երեխայի դիմանկարը որպես կերպարի հիմք։",
    stepTwoTitle: "2. Ստեղծեք կերպար",
    stepTwoDescription:
      "AI-ն ստեղծում է համապատասխան նկարազարդ կերպար՝ հեքիաթային տեսարանների համար։",
    stepThreeTitle: "3. Նախադիտեք գիրքը",
    stepThreeDescription:
      "Ձեր անհատական նախադիտումը ստեղծվում է ընտրված աղբյուր-գրքի հիման վրա։",
  },
  BookCard: {
    viewBook: "Դիտել գիրքը",
    editorialPick: "Խմբագրական ընտրություն",
  },
  BookDetail: {
    startPersonalizing: "Սկսել անհատականացումը",
    backToBooks: "Վերադառնալ գրքերին",
    bookOverviewBadge: "Գրքի ամփոփում",
    pageCountLabel: "Էջեր",
    formatsLabel: "Ֆորմատներ",
    startingPriceLabel: "Սկսած",
    unknownValue: "Չկա",
    bookDetailsBadge: "Գրքի ներսը",
    bookDetailsTitle: "Տեսեք՝ ինչ է ներառում այս պատմությունը",
    previewTab: "Էջերի նախադիտում",
    formatsTab: "Ֆորմատներ և գներ",
    emptyPreview: "Այս գրքի էջերի նախադիտումը դեռ հասանելի չէ։",
    emptyFormats: "Այս գրքի ֆորմատների տվյալները դեռ հասանելի չեն։",
    pageLabel: "Էջ",
    imagePreviewUnavailable: "Պատկերի նախադիտումը շուտով հասանելի կլինի։",
    pagesSuffix: "էջ",
    creativeNotesTitle: "Պատմության նկարազարդման ետնաբեմը",
    coverArtDirection: "Կազմի նկարազարդման ուղղություն",
    backCoverDirection: "Հետևի կազմի ուղղություն",
    endingTone: "Ավարտի տոնայնություն",
    emptyNotes: "Այս բաժնի նշումները դեռ պատրաստվում են։",
    defaultDescription:
      "Այս աղբյուր-գիրքը օգտագործվում է որպես հիմքային ձևանմուշ մինչև անհատականացումը։",
  },
  AdminPage: {
    title: "Admin dashboard",
    sections: {
      prompts: {
        title: "Prompt templates",
        cta: "Manage prompts",
      },
      books: {
        title: "Book templates",
        cta: "Manage books",
      },
      generatedBooks: {
        title: "Generated books",
        cta: "Manage generated books",
      },
    },
  },
  AdminPromptsPage: {
    title: "Prompt management",
  },
  AdminBooksPage: {
    title: "Book template management",
  },
  AdminBookDetailPage: {
    title: "Book template details",
  },
  AdminGeneratedBooksPage: {
    title: "Generated books management",
  },
  AdminGeneratedBookDetailPage: {
    title: "Generated book details",
  },
} satisfies typeof en;

export default hy;
