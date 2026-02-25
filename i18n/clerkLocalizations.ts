import type { enUS } from "@clerk/localizations";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export const clerkHy: DeepPartial<typeof enUS> = {
  locale: "hy-AM",
  apiKeys: {
    action__add: "Ավելացնել նոր բանալի",
    action__search: "Որոնել բանալիներ",
    copySecret: {
      formButtonPrimary__copyAndClose: "Պատճենել և փակել",
      formHint:
        "Անվտանգության նկատառումներից ելնելով՝ հետագայում այն կրկին տեսնել չեք կարող։",
      formTitle: 'Պատճենեք ձեր "{{name}}" API բանալին հիմա',
    },
    createdAndExpirationStatus__expiresOn:
      "Ստեղծվել է {{ createdDate | shortDate('hy-AM') }} • Սպառվում է {{ expiresDate | longDate('hy-AM') }}",
    createdAndExpirationStatus__never:
      "Ստեղծվել է {{ createdDate | shortDate('hy-AM') }} • Երբեք չի սպառվում",
    detailsTitle__emptyRow: "API բանալիներ չեն գտնվել",
    formButtonPrimary__add: "Ստեղծել բանալի",
    formFieldCaption__expiration__expiresOn: "Սպառվում է {{ date }}",
    formFieldCaption__expiration__never: "Այս բանալին երբեք չի սպառվի",
    formFieldOption__expiration__180d: "180 օր",
    formFieldOption__expiration__1d: "1 օր",
    formFieldOption__expiration__1y: "1 տարի",
    formFieldOption__expiration__30d: "30 օր",
    formFieldOption__expiration__60d: "60 օր",
    formFieldOption__expiration__7d: "7 օր",
    formFieldOption__expiration__90d: "90 օր",
    formFieldOption__expiration__never: "Երբեք",
    formHint:
      "Տվեք անուն՝ նոր բանալի ստեղծելու համար։ Կարող եք այն ցանկացած պահին հետ կանչել։",
    formTitle: "Ավելացնել նոր API բանալի",
    lastUsed__days: "{{days}} օր առաջ",
    lastUsed__hours: "{{hours}} ժ առաջ",
    lastUsed__minutes: "{{minutes}} ր առաջ",
    lastUsed__months: "{{months}} ամ առաջ",
    lastUsed__seconds: "{{seconds}} վ առաջ",
    lastUsed__years: "{{years}} տ առաջ",
    menuAction__revoke: "Հետ կանչել բանալին",
    revokeConfirmation: {
      confirmationText: "Հետ կանչել",
      formButtonPrimary__revoke: "Հետ կանչել բանալին",
      formHint: "Վստա՞հ եք, որ ցանկանում եք ջնջել այս գաղտնի բանալին։",
      formTitle: 'Հետ կանչե՞լ "{{apiKeyName}}" գաղտնի բանալին',
    },
  },
  backButton: "Հետ",
  badge__activePlan: "Ակտիվ",
  badge__canceledEndsAt: "Չեղարկված • Ավարտվում է {{ date | shortDate('hy-AM') }}",
  badge__currentPlan: "Ընթացիկ պլան",
  badge__default: "Լռելյայն",
  badge__endsAt: "Ավարտվում է {{ date | shortDate('hy-AM') }}",
  badge__expired: "Սպառված",
  badge__freeTrial: "Անվճար փորձաշրջան",
  badge__otherImpersonatorDevice: "Ներկայացնողի այլ սարք",
  badge__pastDueAt: "Ժամկետանց է {{ date | shortDate('hy-AM') }}",
  badge__pastDuePlan: "Ժամկետանց",
  badge__primary: "Հիմնական",
  badge__renewsAt: "Թարմացվում է {{ date | shortDate('hy-AM') }}",
  badge__requiresAction: "Գործողություն է պահանջվում",
  badge__startsAt: "Սկսվում է {{ date | shortDate('hy-AM') }}",
  badge__thisDevice: "Այս սարքը",
  badge__trialEndsAt: "Փորձաշրջանն ավարտվում է {{ date | shortDate('hy-AM') }}",
  badge__unverified: "Չհաստատված",
  badge__upcomingPlan: "Առաջիկա",
  badge__userDevice: "Օգտատիրոջ սարք",
  badge__you: "Դուք",
  createOrganization: {
    formButtonSubmit: "Ստեղծել կազմակերպություն",
    invitePage: {
      formButtonReset: "Բաց թողնել",
    },
    title: "Ստեղծել կազմակերպություն",
  },
  dates: {
    lastDay: "Երեկ՝ {{ date | timeString('hy-AM') }}",
    next6Days:
      "{{ date | weekday('hy-AM','long') }}՝ {{ date | timeString('hy-AM') }}",
    nextDay: "Վաղը՝ {{ date | timeString('hy-AM') }}",
    numeric: "{{ date | numeric('hy-AM') }}",
    previous6Days:
      "Անցած {{ date | weekday('hy-AM','long') }}՝ {{ date | timeString('hy-AM') }}",
    sameDay: "Այսօր՝ {{ date | timeString('hy-AM') }}",
  },
  dividerText: "կամ",
  footerActionLink__alternativePhoneCodeProvider: "Փոխարենը ուղարկել կոդ SMS-ով",
  footerActionLink__useAnotherMethod: "Օգտվել այլ եղանակից",
  footerPageLink__help: "Օգնություն",
  footerPageLink__privacy: "Գաղտնիություն",
  footerPageLink__terms: "Պայմաններ",
  formButtonPrimary: "Շարունակել",
  formButtonPrimary__verify: "Հաստատել",
  formFieldAction__forgotPassword: "Մոռացե՞լ եք գաղտնաբառը",
  formFieldError__matchingPasswords: "Գաղտնաբառերը համընկնում են։",
  formFieldError__notMatchingPasswords: "Գաղտնաբառերը չեն համընկնում։",
  formFieldError__verificationLinkExpired:
    "Հաստատման հղման ժամկետը սպառվել է։ Խնդրում ենք պահանջել նոր հղում։",
  formFieldHintText__optional: "Ընտրովի",
  formFieldHintText__slug:
    "Slug-ը մարդուն ընթեռնելի նույնացուցիչ է, որը պետք է եզակի լինի։ Այն հաճախ օգտագործվում է URL-ներում։",
  formFieldInputPlaceholder__apiKeyDescription:
    "Նշեք՝ ինչու եք ստեղծում այս բանալին",
  formFieldInputPlaceholder__apiKeyExpirationDate: "Ընտրեք ամսաթիվ",
  formFieldInputPlaceholder__apiKeyName: "Մուտքագրեք գաղտնի բանալու անունը",
  formFieldInputPlaceholder__backupCode: "Մուտքագրեք պահուստային կոդը",
  formFieldInputPlaceholder__confirmDeletionUserAccount: "Ջնջել հաշիվը",
  formFieldInputPlaceholder__emailAddress: "Մուտքագրեք ձեր էլ. փոստի հասցեն",
  formFieldInputPlaceholder__emailAddress_username: "Մուտքագրեք էլ. փոստ կամ օգտանուն",
  formFieldInputPlaceholder__emailAddresses:
    "example@email.com, example2@email.com",
  formFieldInputPlaceholder__firstName: "Անուն",
  formFieldInputPlaceholder__lastName: "Ազգանուն",
  formFieldInputPlaceholder__organizationDomain: "example.com",
  formFieldInputPlaceholder__organizationDomainEmailAddress: "you@example.com",
  formFieldInputPlaceholder__organizationName: "Կազմակերպության անվանում",
  formFieldInputPlaceholder__organizationSlug: "my-org",
  formFieldInputPlaceholder__password: "Մուտքագրեք ձեր գաղտնաբառը",
  formFieldInputPlaceholder__phoneNumber: "Մուտքագրեք ձեր հեռախոսահամարը",
  formFieldInputPlaceholder__username: undefined,
  formFieldInput__emailAddress_format: "Օրինակ՝ name@example.com",
  formFieldLabel__apiKey: "API բանալի",
  formFieldLabel__apiKeyDescription: "Նկարագրություն",
  formFieldLabel__apiKeyExpiration: "Սպառման ժամկետ",
  formFieldLabel__apiKeyName: "Գաղտնի բանալու անուն",
  formFieldLabel__automaticInvitations:
    "Միացնել ավտոմատ հրավերներ այս տիրույթի համար",
  formFieldLabel__backupCode: "Պահուստային կոդ",
  formFieldLabel__confirmDeletion: "Հաստատում",
  formFieldLabel__confirmPassword: "Հաստատել գաղտնաբառը",
  formFieldLabel__currentPassword: "Ընթացիկ գաղտնաբառ",
  formFieldLabel__emailAddress: "Էլ. փոստի հասցե",
  formFieldLabel__emailAddress_username: "Էլ. փոստ կամ օգտանուն",
  formFieldLabel__emailAddresses: "Էլ. փոստի հասցեներ",
  formFieldLabel__firstName: "Անուն",
  formFieldLabel__lastName: "Ազգանուն",
  formFieldLabel__newPassword: "Նոր գաղտնաբառ",
  formFieldLabel__organizationDomain: "Տիրույթ",
  formFieldLabel__organizationDomainDeletePending:
    "Ջնջել սպասվող հրավերներն ու առաջարկները",
  formFieldLabel__organizationDomainEmailAddress: "Հաստատման էլ. փոստի հասցե",
  formFieldLabel__organizationDomainEmailAddressDescription:
    "Մուտքագրեք այս տիրույթին պատկանող էլ. փոստի հասցե՝ կոդ ստանալու և տիրույթը հաստատելու համար։",
  formFieldLabel__organizationName: "Անվանում",
  formFieldLabel__organizationSlug: "Սլագ",
  formFieldLabel__passkeyName: "Passkey-ի անվանում",
  formFieldLabel__password: "Գաղտնաբառ",
  formFieldLabel__phoneNumber: "Հեռախոսահամար",
  formFieldLabel__role: "Դեր",
  formFieldLabel__signOutOfOtherSessions: "Դուրս գալ բոլոր այլ սարքերից",
  formFieldLabel__username: "Օգտանուն",
  impersonationFab: {
    action__signOut: "Դուրս գալ",
    title: "Մուտք է գործված որպես {{identifier}}",
  },
  lastAuthenticationStrategy: "Վերջին օգտագործվածը",
  maintenanceMode:
    "Այս պահին իրականացվում են տեխնիկական աշխատանքներ, բայց մի անհանգստացեք՝ դա շատ երկար չի տևի։",
  membershipRole__admin: "Ադմին",
  membershipRole__basicMember: "Անդամ",
  membershipRole__guestMember: "Հյուր",
  paginationButton__next: "Հաջորդը",
  paginationButton__previous: "Նախորդը",
  paginationRowText__displaying: "Ցուցադրվում է",
  paginationRowText__of: "՝",
  reverification: {
    alternativeMethods: {
      actionLink: "Ստանալ օգնություն",
      actionText: "Սրանցից ոչ մեկը չունե՞ք",
      blockButton__backupCode: "Օգտվել պահուստային կոդից",
      blockButton__emailCode: "Ուղարկել կոդ {{identifier}} հասցեին",
      blockButton__passkey: "Օգտվել ձեր passkey-ից",
      blockButton__password: "Շարունակել գաղտնաբառով",
      blockButton__phoneCode: "Ուղարկել SMS կոդ {{identifier}} համարին",
      blockButton__totp: "Օգտվել նույնականացնող հավելվածից",
      getHelp: {
        blockButton__emailSupport: "Գրել աջակցությանը",
        content:
          "Եթե խնդիր ունեք ձեր հաշիվը հաստատելու հարցում, գրեք մեզ, և մենք կօգնենք հնարավորինս արագ վերականգնել մուտքը։",
        title: "Օգնություն",
      },
      subtitle:
        "Խնդիրներ ունե՞ք։ Հաստատման համար կարող եք օգտագործել այս եղանակներից որևէ մեկը։",
      title: "Օգտվել այլ եղանակից",
    },
    backupCodeMfa: {
      subtitle:
        "Մուտքագրեք պահուստային կոդը, որը ստացել եք երկքայլ հաստատումը միացնելիս",
      title: "Մուտքագրեք պահուստային կոդ",
    },
    emailCode: {
      formTitle: "Հաստատման կոդ",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "Շարունակելու համար մուտքագրեք ձեր էլ. փոստին ուղարկված կոդը",
      title: "Հաստատում է պահանջվում",
    },
    noAvailableMethods: {
      message:
        "Հաստատումը շարունակել հնարավոր չէ։ Հարմար նույնականացման գործոն կարգավորված չէ",
      subtitle: "Տեղի ունեցավ սխալ",
      title: "Չհաջողվեց հաստատել ձեր հաշիվը",
    },
    passkey: {
      blockButton__passkey: "Օգտվել ձեր passkey-ից",
      subtitle:
        "Passkey-ի օգտագործումը հաստատում է ձեր ինքնությունը։ Ձեր սարքը կարող է խնդրել մատնահետք, դեմքի ճանաչում կամ էկրանի կողպեք։",
      title: "Օգտվել ձեր passkey-ից",
    },
    password: {
      actionLink: "Օգտվել այլ եղանակից",
      subtitle: "Շարունակելու համար մուտքագրեք ձեր ընթացիկ գաղտնաբառը",
      title: "Հաստատում է պահանջվում",
    },
    phoneCode: {
      formTitle: "Հաստատման կոդ",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "Շարունակելու համար մուտքագրեք ձեր հեռախոսին ուղարկված կոդը",
      title: "Հաստատում է պահանջվում",
    },
    phoneCodeMfa: {
      formTitle: "Հաստատման կոդ",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "Շարունակելու համար մուտքագրեք ձեր հեռախոսին ուղարկված կոդը",
      title: "Հաստատում է պահանջվում",
    },
    totpMfa: {
      formTitle: "Հաստատման կոդ",
      subtitle:
        "Շարունակելու համար մուտքագրեք նույնականացնող հավելվածի ստեղծած կոդը",
      title: "Հաստատում է պահանջվում",
    },
  },
  signIn: {
    accountSwitcher: {
      action__addAccount: "Ավելացնել հաշիվ",
      action__signOutAll: "Դուրս գալ բոլոր հաշիվներից",
      subtitle: "Ընտրեք հաշիվը, որով ցանկանում եք շարունակել։",
      title: "Ընտրեք հաշիվ",
    },
    alternativeMethods: {
      actionLink: "Ստանալ օգնություն",
      actionText: "Սրանցից ոչ մեկը չունե՞ք",
      blockButton__backupCode: "Օգտվել պահուստային կոդից",
      blockButton__emailCode: "Ուղարկել կոդ {{identifier}} հասցեին",
      blockButton__emailLink: "Ուղարկել հղում {{identifier}} հասցեին",
      blockButton__passkey: "Մուտք գործել passkey-ով",
      blockButton__password: "Մուտք գործել գաղտնաբառով",
      blockButton__phoneCode: "Ուղարկել SMS կոդ {{identifier}} համարին",
      blockButton__totp: "Օգտվել նույնականացնող հավելվածից",
      getHelp: {
        blockButton__emailSupport: "Գրել աջակցությանը",
        content:
          "Եթե խնդիր ունեք հաշիվ մուտք գործելու հարցում, գրեք մեզ, և մենք կօգնենք հնարավորինս արագ վերականգնել մուտքը։",
        title: "Օգնություն",
      },
      subtitle: "Խնդիրներ ունե՞ք։ Մուտք գործելու համար կարող եք օգտագործել այս եղանակներից որևէ մեկը։",
      title: "Օգտվել այլ եղանակից",
    },
    alternativePhoneCodeProvider: {
      formTitle: "Հաստատման կոդ",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "՝ {{applicationName}}-ը շարունակելու համար",
      title: "Ստուգեք ձեր {{provider}}-ը",
    },
    backupCodeMfa: {
      subtitle:
        "Ձեր պահուստային կոդը այն կոդն է, որը ստացել եք երկքայլ հաստատումը կարգավորելիս։",
      title: "Մուտքագրեք պահուստային կոդ",
    },
    emailCode: {
      formTitle: "Հաստատման կոդ",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "՝ {{applicationName}}-ը շարունակելու համար",
      title: "Ստուգեք ձեր էլ. փոստը",
    },
    emailCodeMfa: {
      formTitle: "Ստուգեք ձեր էլ. փոստը",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "՝ {{applicationName}}-ը շարունակելու համար",
      title: "Ստուգեք ձեր էլ. փոստը",
    },
    emailLink: {
      clientMismatch: {
        subtitle:
          "Շարունակելու համար բացեք հաստատման հղումը այն սարքում և դիտարկիչում, որով սկսել եք մուտքը",
        title: "Հաստատման հղումը անվավեր է այս սարքի համար",
      },
      expired: {
        subtitle: "Շարունակելու համար վերադարձեք սկզբնական ներդիրին։",
        title: "Այս հաստատման հղման ժամկետը սպառվել է",
      },
      failed: {
        subtitle: "Շարունակելու համար վերադարձեք սկզբնական ներդիրին։",
        title: "Այս հաստատման հղումը անվավեր է",
      },
      formSubtitle: "Օգտագործեք ձեր էլ. փոստին ուղարկված հաստատման հղումը",
      formTitle: "Հաստատման հղում",
      loading: {
        subtitle: "Շուտով կվերահղվեք",
        title: "Մուտք է կատարվում...",
      },
      resendButton: "Հղումը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "՝ {{applicationName}}-ը շարունակելու համար",
      title: "Ստուգեք ձեր էլ. փոստը",
      unusedTab: {
        title: "Կարող եք փակել այս ներդիրը",
      },
      verified: {
        subtitle: "Շուտով կվերահղվեք",
        title: "Մուտքը հաջողվեց",
      },
      verifiedSwitchTab: {
        subtitle: "Շարունակելու համար վերադարձեք սկզբնական ներդիրին",
        subtitleNewTab: "Շարունակելու համար վերադարձեք նոր բացված ներդիրին",
        titleNewTab: "Մուտք է կատարվել այլ ներդիրում",
      },
    },
    emailLinkMfa: {
      formSubtitle: "Օգտագործեք ձեր էլ. փոստին ուղարկված հաստատման հղումը",
      resendButton: "Հղումը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "՝ {{applicationName}}-ը շարունակելու համար",
      title: "Ստուգեք ձեր էլ. փոստը",
    },
    enterpriseConnections: {
      subtitle:
        "Ընտրեք ձեռնարկության հաշիվը, որով ցանկանում եք շարունակել։",
      title: "Ընտրեք ձեր ձեռնարկության հաշիվը",
    },
    forgotPassword: {
      formTitle: "Գաղտնաբառի վերականգնման կոդ",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "՝ գաղտնաբառը վերականգնելու համար",
      subtitle_email: "Նախ մուտքագրեք ձեր էլ. փոստին ուղարկված կոդը",
      subtitle_phone: "Նախ մուտքագրեք ձեր հեռախոսին ուղարկված կոդը",
      title: "Վերականգնել գաղտնաբառը",
    },
    forgotPasswordAlternativeMethods: {
      blockButton__resetPassword: "Վերականգնել գաղտնաբառը",
      label__alternativeMethods: "Կամ մուտք գործել այլ եղանակով",
      title: "Մոռացե՞լ եք գաղտնաբառը",
    },
    newDeviceVerificationNotice:
      "Դուք մուտք եք գործում նոր սարքից։ Ձեր հաշիվը անվտանգ պահելու համար պահանջվում է հաստատում։",
    noAvailableMethods: {
      message:
        "Մուտքը շարունակել հնարավոր չէ։ Հասանելի նույնականացման գործոն չկա։",
      subtitle: "Տեղի ունեցավ սխալ",
      title: "Չհաջողվեց մուտք գործել",
    },
    passkey: {
      subtitle:
        "Passkey-ի օգտագործումը հաստատում է, որ դա դուք եք։ Ձեր սարքը կարող է խնդրել մատնահետք, դեմքի ճանաչում կամ էկրանի կողպեք։",
      title: "Օգտվել ձեր passkey-ից",
    },
    password: {
      actionLink: "Օգտվել այլ եղանակից",
      subtitle: "Մուտքագրեք ձեր հաշվին կապված գաղտնաբառը",
      title: "Մուտքագրեք ձեր գաղտնաբառը",
    },
    passwordCompromised: {
      title: "Գաղտնաբառը վտանգված է",
    },
    passwordPwned: {
      title: "Գաղտնաբառը վտանգված է",
    },
    passwordUntrusted: {
      title: "Գաղտնաբառը վստահելի չէ",
    },
    phoneCode: {
      formTitle: "Հաստատման կոդ",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "՝ {{applicationName}}-ը շարունակելու համար",
      title: "Ստուգեք ձեր հեռախոսը",
    },
    phoneCodeMfa: {
      formTitle: "Հաստատման կոդ",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle:
        "Շարունակելու համար մուտքագրեք ձեր հեռախոսին ուղարկված հաստատման կոդը",
      title: "Ստուգեք ձեր հեռախոսը",
    },
    resetPassword: {
      formButtonPrimary: "Վերականգնել գաղտնաբառը",
      requiredMessage:
        "Անվտանգության նկատառումներից ելնելով՝ անհրաժեշտ է վերականգնել ձեր գաղտնաբառը։",
      successMessage:
        "Ձեր գաղտնաբառը հաջողությամբ փոխվեց։ Ձեզ մուտքագրում ենք, խնդրում ենք մի պահ սպասել։",
      title: "Սահմանել նոր գաղտնաբառ",
    },
    resetPasswordMfa: {
      detailsLabel:
        "Նախքան գաղտնաբառի վերականգնումը մենք պետք է հաստատենք ձեր ինքնությունը։",
    },
    start: {
      actionLink: "Գրանցվել",
      actionLink__join_waitlist: "Միանալ սպասման ցուցակին",
      actionLink__use_email: "Օգտվել էլ. փոստից",
      actionLink__use_email_username: "Օգտվել էլ. փոստից կամ օգտանունից",
      actionLink__use_passkey: "Փոխարենը օգտագործել passkey",
      actionLink__use_phone: "Օգտվել հեռախոսից",
      actionLink__use_username: "Օգտվել օգտանունից",
      actionText: "Հաշիվ չունե՞ք",
      actionText__join_waitlist: "Ուզո՞ւմ եք վաղ հասանելիություն",
      alternativePhoneCodeProvider: {
        actionLink: "Օգտվել այլ եղանակից",
        label: "{{provider}} հեռախոսահամար",
        subtitle:
          "Մուտքագրեք ձեր հեռախոսահամարը՝ {{provider}}-ում հաստատման կոդ ստանալու համար։",
        title: "Մուտք գործել {{applicationName}}՝ {{provider}}-ի միջոցով",
      },
      subtitle: "Բարի վերադարձ։ Շարունակելու համար մուտք գործեք",
      subtitleCombined: undefined,
      title: "Մուտք գործել {{applicationName}}",
      titleCombined: "Շարունակել դեպի {{applicationName}}",
    },
  },
  signInEnterPasswordTitle: "Մուտքագրեք ձեր գաղտնաբառը",
  signUp: {
    alternativePhoneCodeProvider: {
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "Մուտքագրեք ձեր {{provider}}-ին ուղարկված հաստատման կոդը",
      title: "Հաստատեք ձեր {{provider}}-ը",
    },
    continue: {
      actionLink: "Մուտք գործել",
      actionText: "Արդեն ունե՞ք հաշիվ",
      subtitle: "Շարունակելու համար լրացրեք մնացած տվյալները։",
      title: "Լրացրեք բացակայող դաշտերը",
    },
    emailCode: {
      formSubtitle: "Մուտքագրեք ձեր էլ. փոստի հասցեին ուղարկված հաստատման կոդը",
      formTitle: "Հաստատման կոդ",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "Մուտքագրեք ձեր էլ. փոստին ուղարկված հաստատման կոդը",
      title: "Հաստատեք ձեր էլ. փոստը",
    },
    emailLink: {
      clientMismatch: {
        subtitle:
          "Շարունակելու համար բացեք հաստատման հղումը այն սարքում և դիտարկիչում, որով սկսել եք գրանցումը",
        title: "Հաստատման հղումը անվավեր է այս սարքի համար",
      },
      formSubtitle: "Օգտագործեք ձեր էլ. փոստի հասցեին ուղարկված հաստատման հղումը",
      formTitle: "Հաստատման հղում",
      loading: {
        title: "Գրանցում...",
      },
      resendButton: "Հղումը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "՝ {{applicationName}}-ը շարունակելու համար",
      title: "Հաստատեք ձեր էլ. փոստը",
      verified: {
        title: "Գրանցումը հաջողվեց",
      },
      verifiedSwitchTab: {
        subtitle: "Շարունակելու համար վերադարձեք նոր բացված ներդիրին",
        subtitleNewTab: "Շարունակելու համար վերադարձեք նախորդ ներդիրին",
        title: "Էլ. փոստը հաջողությամբ հաստատվեց",
      },
    },
    enterpriseConnections: {
      subtitle:
        "Ընտրեք ձեռնարկության հաշիվը, որով ցանկանում եք շարունակել։",
      title: "Ընտրեք ձեր ձեռնարկության հաշիվը",
    },
    legalConsent: {
      checkbox: {
        label__onlyPrivacyPolicy:
          'Ես համաձայն եմ {{ privacyPolicyLink || link("Գաղտնիության քաղաքականության") }}',
        label__onlyTermsOfService:
          'Ես համաձայն եմ {{ termsOfServiceLink || link("Ծառայության պայմանների") }}',
        label__termsOfServiceAndPrivacyPolicy:
          'Ես համաձայն եմ {{ termsOfServiceLink || link("Ծառայության պայմանների") }} և {{ privacyPolicyLink || link("Գաղտնիության քաղաքականության") }}',
      },
      continue: {
        subtitle: "Շարունակելու համար կարդացեք և ընդունեք պայմանները",
        title: "Իրավական համաձայնություն",
      },
    },
    phoneCode: {
      formSubtitle: "Մուտքագրեք ձեր հեռախոսահամարին ուղարկված հաստատման կոդը",
      formTitle: "Հաստատման կոդ",
      resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
      subtitle: "Մուտքագրեք ձեր հեռախոսին ուղարկված հաստատման կոդը",
      title: "Հաստատեք ձեր հեռախոսը",
    },
    restrictedAccess: {
      actionLink: "Մուտք գործել",
      actionText: "Արդեն ունե՞ք հաշիվ",
      blockButton__emailSupport: "Գրել աջակցությանը",
      blockButton__joinWaitlist: "Միանալ սպասման ցուցակին",
      subtitle:
        "Գրանցումները ներկայումս անջատված են։ Եթե կարծում եք, որ պետք է մուտք ունենաք, խնդրում ենք կապվել աջակցման թիմի հետ։",
      subtitleWaitlist:
        "Գրանցումները ներկայումս անջատված են։ Մեր մեկնարկի մասին առաջինը տեղեկանալու համար միացեք սպասման ցուցակին։",
      title: "Մուտքը սահմանափակված է",
    },
    start: {
      actionLink: "Մուտք գործել",
      actionLink__use_email: "Փոխարենը օգտագործել էլ. փոստ",
      actionLink__use_phone: "Փոխարենը օգտագործել հեռախոս",
      actionText: "Արդեն ունե՞ք հաշիվ",
      alternativePhoneCodeProvider: {
        actionLink: "Օգտվել այլ եղանակից",
        label: "{{provider}} հեռախոսահամար",
        subtitle:
          "Մուտքագրեք ձեր հեռախոսահամարը՝ {{provider}}-ում հաստատման կոդ ստանալու համար։",
        title: "Գրանցվել {{applicationName}}՝ {{provider}}-ի միջոցով",
      },
      subtitle: "Բարի գալուստ։ Սկսելու համար լրացրեք տվյալները։",
      subtitleCombined: "Բարի գալուստ։ Սկսելու համար լրացրեք տվյալները։",
      title: "Ստեղծեք ձեր հաշիվը",
      titleCombined: "Ստեղծեք ձեր հաշիվը",
    },
    web3Solana: {
      subtitle: "Գրանցվելու համար ներքևից ընտրեք դրամապանակ",
      title: "Գրանցվել Solana-ով",
    },
  },
  socialButtonsBlockButton: "Շարունակել {{provider|titleize}}-ով",
  socialButtonsBlockButtonManyInView: "{{provider|titleize}}",
  taskResetPassword: {
    formButtonPrimary: "Վերականգնել գաղտնաբառը",
    signOut: {
      actionLink: "Դուրս գալ",
      actionText: "Մուտք է գործված որպես {{identifier}}",
    },
    subtitle: "Շարունակելուց առաջ ձեր հաշիվը պահանջում է նոր գաղտնաբառ",
    title: "Վերականգնել ձեր գաղտնաբառը",
  },
  userButton: {
    action__addAccount: "Ավելացնել հաշիվ",
    action__closeUserMenu: "Փակել օգտատիրոջ մենյուն",
    action__manageAccount: "Կառավարել հաշիվը",
    action__openUserMenu: "Բացել օգտատիրոջ մենյուն",
    action__signOut: "Դուրս գալ",
    action__signOutAll: "Դուրս գալ բոլոր հաշիվներից",
  },
  userProfile: {
    apiKeysPage: {
      title: "API բանալիներ",
    },
    backupCodePage: {
      actionLabel__copied: "Պատճենվեց",
      actionLabel__copy: "Պատճենել բոլորը",
      actionLabel__download: "Ներբեռնել .txt",
      actionLabel__print: "Տպել",
      infoText1: "Այս հաշվի համար կակտիվացվեն պահուստային կոդերը։",
      infoText2:
        "Պահեք պահուստային կոդերը գաղտնի և անվտանգ վայրում։ Եթե կասկածում եք, որ դրանք կարող են վտանգված լինել, կարող եք նորից ստեղծել։",
      subtitle__codelist: "Պահեք դրանք անվտանգ և գաղտնի։",
      successMessage:
        "Պահուստային կոդերը այժմ ակտիվ են։ Եթե կորցնեք մուտքը ձեր նույնականացման սարքին, կարող եք դրանցից մեկով մուտք գործել ձեր հաշիվ։ Յուրաքանչյուր կոդ կարելի է օգտագործել միայն մեկ անգամ։",
      successSubtitle:
        "Եթե կորցնեք մուտքը ձեր նույնականացման սարքին, կարող եք դրանցից մեկով մուտք գործել ձեր հաշիվ։",
      title: "Ավելացնել պահուստային կոդով հաստատում",
      title__codelist: "Պահուստային կոդեր",
    },
    connectedAccountPage: {
      formHint: "Ընտրեք մատակարար՝ ձեր հաշիվը միացնելու համար։",
      formHint__noAccounts:
        "Արտաքին հաշվի հասանելի մատակարարներ չկան։",
      removeResource: {
        messageLine1: "{{identifier}}-ը կհեռացվի այս հաշվից։",
        messageLine2:
          "Դուք այլևս չեք կարողանա օգտագործել այս միացված հաշիվը, և դրանից կախված գործառույթները չեն աշխատի։",
        successMessage:
          "{{connectedAccount}}-ը հեռացվել է ձեր հաշվից։",
        title: "Հեռացնել միացված հաշիվը",
      },
      socialButtonsBlockButton: "{{provider|titleize}}",
      successMessage: "Մատակարարը ավելացվել է ձեր հաշվին",
      title: "Ավելացնել միացված հաշիվ",
    },
    deletePage: {
      actionDescription: 'Շարունակելու համար ներքևում գրեք "Ջնջել հաշիվը"։',
      confirm: "Ջնջել հաշիվը",
      messageLine1:
        "Վստա՞հ եք, որ ցանկանում եք ջնջել ձեր հաշիվը։ Որոշ կապակցված տվյալներ կարող են պահպանվել։ Տվյալների ամբողջական ջնջում պահանջելու համար կապվեք աջակցման թիմի հետ։",
      messageLine2: "Այս գործողությունը մշտական է և անշրջելի։",
      title: "Ջնջել հաշիվը",
    },
    emailAddressPage: {
      emailCode: {
        formHint:
          "Այս էլ. փոստի հասցեին կուղարկվի նամակ՝ հաստատման կոդով։",
        formSubtitle: "Մուտքագրեք {{identifier}} հասցեին ուղարկված հաստատման կոդը",
        formTitle: "Հաստատման կոդ",
        resendButton: "Կոդը չե՞ք ստացել։ Ուղարկել կրկին",
        successMessage:
          "{{identifier}} էլ. փոստը ավելացվել է ձեր հաշվին։",
      },
      emailLink: {
        formHint:
          "Այս էլ. փոստի հասցեին կուղարկվի նամակ՝ հաստատման հղումով։",
        formSubtitle:
          "Սեղմեք {{identifier}} հասցեին ուղարկված նամակի հաստատման հղման վրա",
        formTitle: "Հաստատման հղում",
        resendButton: "Հղումը չե՞ք ստացել։ Ուղարկել կրկին",
        successMessage:
          "{{identifier}} էլ. փոստը ավելացվել է ձեր հաշվին։",
      },
      enterpriseSSOLink: {
        formButton: "Սեղմեք՝ մուտք գործելու համար",
        formSubtitle: "Ավարտեք մուտքը {{identifier}}-ով",
      },
      formHint:
        "Ձեր հաշվին ավելացնելուց առաջ պետք է հաստատեք այս էլ. փոստի հասցեն։",
      removeResource: {
        messageLine1: "{{identifier}}-ը կհեռացվի այս հաշվից։",
        messageLine2:
          "Դուք այլևս չեք կարողանա մուտք գործել այս էլ. փոստի հասցեով։",
        successMessage: "{{emailAddress}}-ը հեռացվել է ձեր հաշվից։",
        title: "Հեռացնել էլ. փոստի հասցեն",
      },
      title: "Ավելացնել էլ. փոստի հասցե",
      verifyTitle: "Հաստատել էլ. փոստի հասցեն",
    },
    formButtonPrimary__add: "Ավելացնել",
    formButtonPrimary__continue: "Շարունակել",
    formButtonPrimary__finish: "Ավարտել",
    formButtonPrimary__remove: "Հեռացնել",
    formButtonPrimary__save: "Պահպանել",
    formButtonReset: "Չեղարկել",

    mobileButton__menu: "Մենյու",
    navbar: {
      account: "Պրոֆիլ",
      apiKeys: "API բանալիներ",
      billing: "Վճարումներ",
      description: "Կառավարեք ձեր հաշվի տվյալները։",
      security: "Անվտանգություն",
      title: "Հաշիվ",
    },
    passkeyScreen: {
      removeResource: {
        messageLine1: "{{name}}-ը կհեռացվի այս հաշվից։",
        title: "Հեռացնել passkey-ը",
      },
      subtitle__rename:
        "Կարող եք փոխել passkey-ի անունը, որպեսզի այն հեշտ գտնեք։",
      title__rename: "Վերանվանել passkey-ը",
    },
    passwordPage: {
      checkboxInfoText__signOutOfOtherSessions:
        "Խորհուրդ է տրվում դուրս գալ բոլոր այն սարքերից, որտեղ կարող էր օգտագործված լինել ձեր հին գաղտնաբառը։",
      readonly:
        "Ձեր գաղտնաբառը հիմա հնարավոր չէ խմբագրել, որովհետև մուտքը հնարավոր է միայն ձեռնարկության կապով։",
      successMessage__set: "Ձեր գաղտնաբառը սահմանվեց։",
      successMessage__signOutOfOtherSessions:
        "Բոլոր այլ սարքերից կատարվել է դուրսգրում։",
      successMessage__update: "Ձեր գաղտնաբառը թարմացվեց։",
      title__set: "Սահմանել գաղտնաբառ",
      title__update: "Թարմացնել գաղտնաբառը",
    },
    phoneNumberPage: {
      infoText:
        "Այս հեռախոսահամարին կուղարկվի SMS՝ հաստատման կոդով։ Կարող են կիրառվել հաղորդագրության և տվյալների սակագներ։",
      removeResource: {
        messageLine1: "{{identifier}}-ը կհեռացվի այս հաշվից։",
        messageLine2:
          "Դուք այլևս չեք կարողանա մուտք գործել այս հեռախոսահամարով։",
        successMessage: "{{phoneNumber}}-ը հեռացվել է ձեր հաշվից։",
        title: "Հեռացնել հեռախոսահամարը",
      },
      successMessage: "{{identifier}}-ը ավելացվել է ձեր հաշվին։",
      title: "Ավելացնել հեռախոսահամար",
      verifySubtitle: "Մուտքագրեք {{identifier}}-ին ուղարկված հաստատման կոդը",
      verifyTitle: "Հաստատել հեռախոսահամարը",
    },
    plansPage: {
      title: "Պլաններ",
    },
    profilePage: {
      fileDropAreaHint: "Խորհուրդ տրվող չափը 1:1, մինչև 10ՄԲ։",
      imageFormDestructiveActionSubtitle: "Հեռացնել",
      imageFormSubtitle: "Վերբեռնել",
      imageFormTitle: "Պրոֆիլի նկար",
      readonly:
        "Ձեր պրոֆիլի տվյալները տրամադրվել են ձեռնարկության կապով և չեն կարող խմբագրվել։",
      successMessage: "Ձեր պրոֆիլը թարմացվեց։",
      title: "Թարմացնել պրոֆիլը",
    },
    start: {
      activeDevicesSection: {
        destructiveAction: "Դուրս գալ սարքից",
        title: "Ակտիվ սարքեր",
      },
      connectedAccountsSection: {
        actionLabel__connectionFailed: "Կրկին միացնել",
        actionLabel__reauthorize: "Հաստատել հիմա",
        destructiveActionTitle: "Հեռացնել",
        primaryButton: "Միացնել հաշիվ",
        subtitle__disconnected: "Այս հաշիվն անջատվել է։",
        subtitle__reauthorize:
          "Պահանջվող թույլտվությունների շրջանակները թարմացվել են, և հնարավոր է գործառույթները սահմանափակ լինեն։ Խնդրում ենք կրկին հաստատել այս հավելվածը՝ խնդիրներից խուսափելու համար",
        title: "Միացված հաշիվներ",
      },
      dangerSection: {
        deleteAccountButton: "Ջնջել հաշիվը",
        title: "Ջնջել հաշիվը",
      },
      emailAddressesSection: {
        destructiveAction: "Հեռացնել էլ. փոստը",
        detailsAction__nonPrimary: "Սահմանել որպես հիմնական",
        detailsAction__primary: "Ավարտել հաստատումը",
        detailsAction__unverified: "Հաստատել",
        primaryButton: "Ավելացնել էլ. փոստի հասցե",
        title: "Էլ. փոստի հասցեներ",
      },
      enterpriseAccountsSection: {
        title: "Ձեռնարկության հաշիվներ",
      },
      headerTitle__account: "Պրոֆիլի տվյալներ",
      headerTitle__security: "Անվտանգություն",
      mfaSection: {
        backupCodes: {
          actionLabel__regenerate: "Ստեղծել նորից",
          headerTitle: "Պահուստային կոդեր",
          subtitle__regenerate:
            "Ստացեք նոր, անվտանգ պահուստային կոդերի փաթեթ։ Նախկին կոդերը կջնջվեն և չեն կարող օգտագործվել։",
          title__regenerate: "Ստեղծել պահուստային կոդերը նորից",
        },
        phoneCode: {
          actionLabel__setDefault: "Սահմանել որպես լռելյայն",
          destructiveActionLabel: "Հեռացնել",
        },
        primaryButton: "Ավելացնել երկքայլ հաստատում",
        title: "Երկքայլ հաստատում",
        totp: {
          destructiveActionTitle: "Հեռացնել",
          headerTitle: "Նույնականացնող հավելված",
        },
      },
      passkeysSection: {
        menuAction__destructive: "Հեռացնել",
        menuAction__rename: "Վերանվանել",
        primaryButton: "Ավելացնել passkey",
        title: "Passkey-ներ",
      },
      passwordSection: {
        primaryButton__setPassword: "Սահմանել գաղտնաբառ",
        primaryButton__updatePassword: "Թարմացնել գաղտնաբառ",
        title: "Գաղտնաբառ",
      },
      phoneNumbersSection: {
        destructiveAction: "Հեռացնել հեռախոսահամարը",
        detailsAction__nonPrimary: "Սահմանել որպես հիմնական",
        detailsAction__primary: "Ավարտել հաստատումը",
        detailsAction__unverified: "Հաստատել հեռախոսահամարը",
        primaryButton: "Ավելացնել հեռախոսահամար",
        title: "Հեռախոսահամարներ",
      },
      profileSection: {
        primaryButton: "Թարմացնել պրոֆիլը",
        title: "Պրոֆիլ",
      },
      usernameSection: {
        primaryButton__setUsername: "Սահմանել օգտանուն",
        primaryButton__updateUsername: "Թարմացնել օգտանունը",
        title: "Օգտանուն",
      },
      web3WalletsSection: {
        destructiveAction: "Հեռացնել դրամապանակը",
        detailsAction__nonPrimary: "Սահմանել որպես հիմնական",
        primaryButton: "Միացնել դրամապանակ",
        title: "Web3 դրամապանակներ",
        web3SelectSolanaWalletScreen: {
          subtitle: "Ընտրեք Solana դրամապանակ՝ ձեր հաշվին միացնելու համար։",
          title: "Ավելացնել Solana դրամապանակ",
        },
      },
    },
    usernamePage: {
      successMessage: "Ձեր օգտանունը թարմացվել է։",
      title__set: "Սահմանել օգտանուն",
      title__update: "Թարմացնել օգտանունը",
    },
  },
} as const;
