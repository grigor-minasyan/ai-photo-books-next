import type { Book } from "./schemas";

export const ImageStyles = {
  softDigital: "Soft digital storybook illustration",
} as const;

export type ImageStyle = (typeof ImageStyles)[keyof typeof ImageStyles];

export const BOOK_IDEAS = [
  `The kid travels through armenia's historical and famous places`,

  `Կախարդական վրձինը	The Magic Paintbrush	Everything the child paints (a sun, a bird, a house) comes to life and joins the story.	Vibrant watercolor splashes, "half-painted" objects coming to life.`,

  `Խաղալիքների քաղաքը	The City of Toys	At night, the child’s room turns into a giant city where their toys are the citizens.	Bright primary colors, block-style architecture, playful and high energy.`,
];

export const CHARACTER_MAP = {
  alec: {
    id: "alec",
    name: "Ալեք",
    imagePath: "./characters/alec-generated.jpg",
  },
  elush: {
    id: "elush",
    name: "Էլիանա",
    imagePath: "./characters/elush-generated.jpg",
  },
} as const;

export const generatedBooks = [
  {
    title: "{{NAME}}-ի արկածները Հայաստանում",
    coverImageDescription:
      "A vibrant, captivating book cover illustration showing the main character, a cheerful child with a small travel backpack, standing joyfully on a green sunlit hill. Behind the main character, the majestic Mount Ararat, with both Sis and Masis visible, rises under a bright blue sky. Around the hill, subtle images evoke scenes from the adventure: a pink-tuff cityscape hinting at Yerevan with distant fountains, the distinctive Cascade stairway, the columned Temple of Garni, and glimpses of ancient manuscripts and colorful carpets swirling through the background like memories or dreams. The atmosphere is magical and full of discovery, suggesting a journey through Armenia’s famous places, history, and vibrant culture, blending realistic photography with whimsical watercolor touches. The main character is center-frame, looking out towards the horizon with excitement.",
    pages: [
      {
        text: "Առավոտը բացվեց պայծառ արևով։ {{NAME}}-ը արագ վեր կացավ անկողնուց, քանի որ այսօր սկսվում է նրա մեծ ճամփորդությունը։",
        imageDescription:
          "A bright, sunlit bedroom scene filled with morning light. The main character is sitting on the edge of a messy bed, stretching their arms wide with a happy, sleepy expression. They are wearing colorful pajamas. A small open suitcase sits on the floor nearby, half-packed with clothes, hinting at the upcoming journey. The room has child-friendly decor.",
      },
      {
        text: "{{NAME}}-ը իր պայուսակի մեջ դրեց հարմարավետ կոշիկներ, տեսախցիկը և ճանապարհի քարտեզը։ Նա պատրաստ է բացահայտումների։",
        imageDescription:
          "A close-up view of the main character packing a colorful backpack on the floor. Inside the bag, we can see a pair of comfortable walking shoes, a vintage-style camera, and a folded map labeled 'Հայաստան' (Armenia). The main character's hands are visible placing a water bottle inside. The main character has a determined and excited look on their face, ready for adventure.",
      },
      {
        text: "Առաջին կանգառը Երևանն է՝ վարդագույն քաղաքը։ {{NAME}}-ը զբոսնում է Հանրապետության հրապարակում և հիանում շատրվաններով։",
        imageDescription:
          "Republic Square in Yerevan bathed in warm daylight. The main character stands in the foreground, admiring the famous singing fountains which are off, but the water pool is visible. Behind them is the grand government building made of pink tuff stone with its clock tower. The main character is looking up at the architecture with a smile, holding their camera.",
      },
      {
        text: "Քիչ անց {{NAME}}-ը հայտնվեց Կասկադում։ Նա բարձրանում է աստիճաններով և նայում արվեստի գործերին։",
        imageDescription:
          "The base of the Cascade Complex in Yerevan. The main character stands next to a large, modern art sculpture (like a bronze fat cat or similar whimsical statue), looking up at the massive white limestone staircase that stretches up the hillside. The main character is pointing at the steps, ready to climb.",
      },
      {
        text: "Կասկադի բարձունքից բացվում է հրաշալի տեսարան։ {{NAME}}-ը այնտեղից տեսնում է ամբողջ քաղաքը և հեռվում՝ Արարատ լեռը։",
        imageDescription:
          "A breathtaking panoramic view from the top of the Cascade. The main character is leaning casually on the stone railing, looking out at the sprawling city of Yerevan below. In the distance, the majestic snowy peaks of Mount Ararat dominate the skyline. The main character's back is slightly turned to the viewer as they gaze at the mountain.",
      },
      {
        text: "Հաջորդը Մատենադարանն է։ {{NAME}}-ը զարմանքով նայում է հին ձեռագրերին և Մեսրոպ Մաշտոցի արձանին։",
        imageDescription:
          "The grand entrance of the Matenadaran museum. The main character stands next to the monumental grey basalt statue of Mesrop Mashtots teaching the alphabet. The main character looks small beside the giant statue, gazing up in awe at the ancient stone script held by the statue.",
      },
      {
        text: "{{NAME}}-ը այցելեց նաև Վերնիսաժ, որտեղ շատ գեղեցիկ գորգեր և հուշանվերներ կան։ Ամեն ինչ այնքան գունավոր է։",
        imageDescription:
          "The colorful Vernissage open-air market. The main character is walking down an aisle lined with vibrant red and blue Armenian carpets hanging on display. On tables nearby are wooden pomegranates and crafts. The main character is touching the texture of a carpet with interest.",
      },
      {
        text: "Երևանից դուրս գալով՝ {{NAME}}-ը ուղևորվեց դեպի Գառնի։ Հեթանոսական տաճարը կանգուն է և շատ վեհաշուք։",
        imageDescription:
          "The ancient Temple of Garni standing majestically with its Grecian columns against a blue sky. The main character is walking along the stone path leading up to the temple entrance, looking up at the high triangular pediment. The sun casts shadows from the columns.",
      },
      {
        text: "Գառնիի ձորում {{NAME}}-ը տեսավ «Քարերի սիմֆոնիան»։ Բնությունը իսկապես հրաշքներ է գործում։",
        imageDescription:
          "The Symphony of Stones in the Garni Gorge. The main character stands at the bottom of the cliff, looking up in amazement at the massive hexagonal basalt columns that hang downwards like a giant stone organ. The scale of the rock formation makes the main character look tiny.",
      },
      {
        text: "Ճանապարհը տարավ դեպի Գեղարդ։ {{NAME}}-ը մտավ ժայռափոր վանքը, որտեղ շատ խորհրդավոր էր և գեղեցիկ։",
        imageDescription:
          "The ancient courtyard of Geghard Monastery, nestled against a cliff. The main character is touching the rough, ancient stone walls which are carved directly into the solid mountain rock. Carved crosses (Khachkars) are visible on the walls. The atmosphere is shadowy and mysterious.",
      },
      {
        text: "Գյուղական տանը {{NAME}}-ը տեսավ, թե ինչպես են թոնրում լավաշ թխում։ Թարմ հացի բույրը անմահական էր։",
        imageDescription:
          "A warm, rustic bakery scene. The main character is crouching near a tonir (ground oven), watching a woman in traditional apron bake fresh Lavash bread. The main character is holding a piece of fresh, steaming flatbread, looking ready to eat it.",
      },
      {
        text: "Ժամանակն է գնալ դեպի կապուտակ Սևան։ {{NAME}}-ը վազում է դեպի ջուրը և վայելում զով քամին։",
        imageDescription:
          "The pebbled shore of Lake Sevan with sparkling turquoise water stretching to the horizon. The main character is running towards the water's edge, arms out, enjoying the cool breeze. The sky is clear blue with fluffy clouds.",
      },
      {
        text: "{{NAME}}-ը բարձրացավ Սևանավանք՝ թերակղզու գագաթին։ Այնտեղից լիճը երևում է ասես ափի մեջ։",
        imageDescription:
          "The top of the peninsula at Sevanavank Monastery. The main character stands near the historic black stone church, looking down at the vast blue lake that surrounds the peninsula on three sides. The view is high and windy.",
      },
      {
        text: "Ճաշի ժամն է։ {{NAME}}-ը համտեսում է Սևանի համեղ ձուկը և հանգստանում բնության գրկում։",
        imageDescription:
          "A wooden picnic table set near the lake shore. The main character is sitting at the table, enjoying a meal of grilled trout and fresh vegetables. They look happy and full, with the lake visible in the background.",
      },
      {
        text: "Ճանապարհը շարունակվում է դեպի Դիլիջան։ Անտառները խիտ են, իսկ օդը՝ մաքուր և թարմ։",
        imageDescription:
          "A lush green scene in the forests of Dilijan. The main character stands by a winding road surrounded by tall, dense trees. Sunlight filters through the canopy. The air looks misty and fresh. The main character is breathing in the clean air.",
      },
      {
        text: "Դիլիջանում {{NAME}}-ը այցելեց Պարզ լիճ։ Ջուրը հանդարտ էր, և ծառերը արտացոլվում էին նրա մեջ։",
        imageDescription:
          "The calm surface of Parz Lake in Dilijan. The main character stands on a small wooden dock, peering down at the green water which perfectly reflects the surrounding forest trees. It is a peaceful, quiet moment.",
      },
      {
        text: "Հաջորդ կանգառը Հաղարծինն է։ {{NAME}}-ը զբոսնում է հինավուրց վանքի բակում և լսում թռչունների երգը։",
        imageDescription:
          "The white stone complex of Haghartsin Monastery hidden in the forest. The main character is walking near the main church, admiring the intricate stone carvings on the facade. Green trees surround the buildings completely.",
      },
      {
        text: "{{NAME}}-ը ուղևորվեց դեպի հյուսիս՝ Գյումրի։ Այստեղ շենքերը սև տուֆից են և ունեն գեղեցիկ պատշգամբներ։",
        imageDescription:
          "A charming street in the old town of Gyumri. The main character walks along a cobblestone path lined with historic buildings made of black and red tuff stone with ornate black iron balconies. The architecture is distinct and beautiful.",
      },
      {
        text: "Վարդանանց հրապարակում {{NAME}}-ը լուսանկարվեց մեծ եկեղեցիների և արձանների ֆոնին։",
        imageDescription:
          "The wide, open space of Vardanants Square in Gyumri. The main character stands in the center, small against the backdrop of the large Holy Saviour's Church and the statues of historical figures. Pigeons are flying nearby.",
      },
      {
        text: "Գյումրիում {{NAME}}-ը նստեց ֆայտոն և շրջեց քաղաքով։ Դա շատ զվարճալի արկած էր։",
        imageDescription:
          "A colorful, vintage horse-drawn carriage (phaeton) moving through Gyumri. The main character sits comfortably inside the carriage, waving happily to passersby. The driver is steering the horse.",
      },
      {
        text: "Հիմա ճանապարհը տանում է դեպի հարավ։ {{NAME}}-ը հասավ Խոր Վիրապ, որտեղից Արարատը շատ մոտ է թվում։",
        imageDescription:
          "The iconic view of Khor Virap Monastery. The main character stands by the monastery wall. Immediately behind the church rises the massive, overwhelming snow-capped peak of Mount Ararat, filling the sky. It looks incredibly close.",
      },
      {
        text: "Խոր Վիրապի մոտ {{NAME}}-ը տեսավ արագիլներին, որոնք բույն էին դրել սյուների վրա։",
        imageDescription:
          "A rural roadside scene near Khor Virap. The main character points up at a large stork's nest perched on top of an electricity pole. Two white storks are visible in the nest against the blue sky.",
      },
      {
        text: "Արկածները շարունակվում են Սյունիքում։ {{NAME}}-ը նստեց «Տաթևի թևեր» ճոպանուղին և թռավ ձորի վրայով։",
        imageDescription:
          "Inside the modern glass cabin of the 'Wings of Tatev' cable car. The main character is pressed against the window, looking down with wide eyes at the deep, green Vorotan Gorge far below. The cable car hangs high in the air.",
      },
      {
        text: "Տաթևի վանքը հայտնվեց ամպերի մեջ։ {{NAME}}-ը հիացած է այս հզոր կառույցով։",
        imageDescription:
          "Tatev Monastery perched precariously on the edge of a massive cliff. The main character is walking across the stone bridge towards the entrance. Wisps of clouds are drifting around the monastery towers, making it look magical.",
      },
      {
        text: "Վերադարձի ճանապարհին {{NAME}}-ը կանգնեց Նորավանքում։ Կարմիր ժայռերը շրջապատել էին գեղեցիկ եկեղեցին։",
        imageDescription:
          "Noravank Monastery nestled in a gorge of brick-red cliffs. The main character stands in front of the two-story church, looking at the famous narrow stone staircase on the building's facade. The red rocks contrast with the blue sky.",
      },
      {
        text: "Արենիում {{NAME}}-ը տեսավ խաղողի այգիները։ Այստեղ մարդիկ շատ հյուրասեր են։",
        imageDescription:
          "A sunny vineyard in Areni with rows of green grapevines. The main character is walking between the rows, examining a bunch of purple grapes hanging from a vine. Mountains are visible in the distance.",
      },
      {
        text: "Վերջին կանգառը Էջմիածինն է՝ հոգևոր կենտրոնը։ {{NAME}}-ը այցելեց Մայր Տաճարը։",
        imageDescription:
          "The grand Mother Cathedral of Etchmiadzin. The main character stands in the beautifully landscaped flower gardens in front of the main entrance with its bell tower. The scene is peaceful and spiritual.",
      },
      {
        text: "Մոտակայքում էր նաև Զվարթնոցը։ {{NAME}}-ը քայլում է հին տաճարի ավերակների և սյուների միջով։",
        imageDescription:
          "The archaeological ruins of Zvartnots Cathedral. The main character walks among the remaining circular columns with iconic eagle capitals. Mount Ararat is faintly visible in the background through the columns.",
      },
      {
        text: "Արևը մայր է մտնում։ {{NAME}}-ի ճամփորդությունը մոտենում է ավարտին, բայց հիշողությունները կմնան ընդմիշտ։",
        imageDescription:
          "A golden sunset over a rolling Armenian landscape. The main character sits on a grassy hill, back to the viewer, watching the sun dip below the mountains, casting long shadows. The lighting is warm and nostalgic.",
      },
      {
        text: "Տանը՝ իր անկողնում, {{NAME}}-ը փակեց աչքերը և երազում նորից տեսավ Հայաստանի գույները։",
        imageDescription:
          "Nighttime in the main character's bedroom. The main character is fast asleep in bed, hugging a small souvenir (like a plush stork or pomegranate) from the trip. A peaceful smile is on their face. A dream bubble shows faint outlines of Ararat and a church.",
      },
    ],
    endingText:
      "Հայաստանը փոքր է, բայց նրա սիրտը մեծ է։ Այս գիրքը հիշեցում է {{NAME}}-ին, որ հայրենիքը միշտ սպասում է նոր բացահայտումների։ Սիրիր և ճանաչիր քո երկիրը։",
    backCoverImageDescription:
      "A tranquil scene featuring Mount Ararat in the background, with both Sis and Masis peaks visible. In the foreground, on a grassy field, sits the main character's suitcase and a pair of worn hiking boots, symbolizing the end of the journey. A small Armenian flag is tucked into the boot.",
  },
  {
    title: "{{NAME}}-ի Կախարդական վրձինը",
    coverImageDescription:
      "A whimsical, magical cover art featuring the main character standing in the center, holding a large, glowing wooden paintbrush that leaves a trail of sparkling, rainbow-colored magic dust. The main character looks up with wonder. Around them, 2D sketches of birds, flowers, and a sun are lifting off the paper and turning into real, 3D colorful objects. The background is a mix of parchment texture and vibrant watercolor splashes.",
    pages: [
      {
        text: "{{NAME}}-ը գտավ մի հին, փոշոտ վրձին տան ձեղնահարկում։ Այն փայլում էր տարօրինակ, ոսկեգույն լույսով։",
        imageDescription:
          "A dusty, dimly lit attic filled with old boxes. The main character crouches near an open wooden chest, holding an old, wooden paintbrush that emits a faint, mysterious golden glow. Dust motes dance in a shaft of light falling on the main character.",
      },
      {
        text: "Նա վերցրեց վրձինը և զգաց, որ այն տաք է։ Ի՞նչ կարող էր նկարել դրանով։",
        imageDescription:
          "The main character stands in their bedroom at a desk, looking curiously at the paintbrush in their hand. On the desk is a blank sheet of white paper. The brush tip glows slightly. The main character looks ready to paint.",
      },
      {
        text: "{{NAME}}-ը զգուշությամբ թղթի վրա նկարեց մի մեծ, դեղին շրջանակ։",
        imageDescription:
          "The main character leans over the desk, painting a simple, bright yellow circle on the white paper. The yellow paint looks thick and luminous, unlike normal paint.",
      },
      {
        text: "Հանկարծ շրջանակը պոկվեց թղթից և դարձավ պայծառ արև։ Սենյակը լցվեց լույսով։",
        imageDescription:
          "Magical transformation: The yellow circle peels itself off the paper and floats into the air, turning into a glowing, miniature sun. The main character shields their eyes from the bright light, looking shocked and amazed.",
      },
      {
        text: "«Վա՜ու», - բացականչեց {{NAME}}-ը։ «Սա սովորական վրձին չէ, սա կախարդական է»։",
        imageDescription:
          "The main character holds the brush up triumphantly, grinning wide. The miniature sun floats near the ceiling, illuminating the room with warm light. The main character looks excited.",
      },
      {
        text: "Նա արագ նկարեց մի կարմիր վարդ՝ կանաչ տերևներով։",
        imageDescription:
          "The main character is painting rapidly on the paper. A red rose with green leaves is taking shape. The paint glistens like liquid rubies and emeralds.",
      },
      {
        text: "Վարդը սկսեց բուրել անուշ հոտով և ծաղկեց հենց օդում։",
        imageDescription:
          "The painted rose has detached from the paper and floats in the air as a real, 3D red rose. The main character smells the flower, eyes closed, enjoying the scent.",
      },
      {
        text: "{{NAME}}-ը ոգևորված նկարեց բազմաթիվ ծաղիկներ՝ կապույտ, դեղին և մանուշակագույն։",
        imageDescription:
          "A wide shot of the bedroom. The main character is painting furiously. Dozens of colorful flowers—blue, yellow, purple—are floating up from the desk, turning the room into a floating magical garden.",
      },
      {
        text: "Հետո նա որոշեց նկարել մի փոքրիկ թռչնակ՝ կապույտ թևերով։",
        imageDescription:
          "The main character carefully paints the outline of a small bird with blue paint. The tip of the brush leaves a trail of blue sparkles on the paper.",
      },
      {
        text: "Թռչնակը թափահարեց թևերը և սկսեց ծլվլալով թռչել սենյակում։",
        imageDescription:
          "A bluebird, partially looking like a watercolor painting and partially real feathers, flies up from the paper. The main character laughs and reaches out a hand towards the bird.",
      },
      {
        text: "{{NAME}}-ը ծիծաղելով վազում էր թռչնակի հետևից։",
        imageDescription:
          "The main character runs across the bedroom, chasing the playful bluebird. Floating flowers and the miniature sun fill the background. The scene is full of motion.",
      },
      {
        text: "«Ինձ ընկեր է պետք», - մտածեց {{NAME}}-ը և նկարեց մի փափուկ կատու։",
        imageDescription:
          "The main character sits on the floor with a large paper, painting a fluffy orange cat. The painted tail is already starting to fluff up and become 3D, wagging slightly.",
      },
      {
        text: "Կատուն մլավեց և քսվեց {{NAME}}-ի ոտքերին։ Նա շատ փափուկ էր։",
        imageDescription:
          "A real, fluffy orange tabby cat rubs against the main character's legs. The main character sits on the floor, petting the cat gently, looking happy.",
      },
      {
        text: "{{NAME}}-ը նկարեց մի հսկայական ծառ, որպեսզի հանգստանա դրա ստվերում։",
        imageDescription:
          "The main character stands and makes broad, sweeping strokes with the brush in the air. A massive, brown tree trunk begins to materialize from the floor, growing upwards.",
      },
      {
        text: "Ծառը մեծացավ մինչև առաստաղ, և սենյակը նմանվեց անտառի։",
        imageDescription:
          "The bedroom is transformed into a magical indoor forest. A giant tree canopy covers the ceiling, dappling the light. The main character sits at the base of the tree with the orange cat.",
      },
      {
        text: "Նկարելուց հոգնելով՝ {{NAME}}-ը որոշեց մի համեղ խնձոր նկարել։",
        imageDescription:
          "The main character paints a red circular shape in the air, which instantly starts to look like a shiny red apple.",
      },
      {
        text: "Խնձորը ընկավ նրա ձեռքը։ Այն քաղցր էր և հյութալի։",
        imageDescription:
          "The main character takes a bite of the real red apple they just created. It looks juicy. The cat watches with interest.",
      },
      {
        text: "«Ես ուզում եմ ճամփորդել», - ասաց {{NAME}}-ը և նկարեց մի մեծ օդապարիկ։",
        imageDescription:
          "The main character paints a large, colorful hot air balloon on the bedroom wall. The wicker basket starts to bulge out from the wall into the room.",
      },
      {
        text: "Օդապարիկը ուռչեց, և {{NAME}}-ը թռավ վեր՝ դեպի երևակայական երկինք։",
        imageDescription:
          "The bedroom walls dissolve into a blue sky. The main character and the cat are inside the basket of the colorful hot air balloon, floating high above white clouds.",
      },
      {
        text: "Նա նկարեց սպիտակ ամպեր, որոնք նման էին բամբակի։",
        imageDescription:
          "The main character leans over the edge of the balloon basket, using the brush to paint fluffy white clouds into the blue sky. The clouds drift away as they are painted.",
      },
      {
        text: "Հանկարծ ամպերից սկսեց գունավոր անձրև տեղալ։",
        imageDescription:
          "Rain falls from the painted clouds, but the drops are multi-colored—pink, blue, yellow—like liquid candy. The main character looks at the rain in surprise.",
      },
      {
        text: "{{NAME}}-ը արագ նկարեց մի մեծ ծիածան, որպեսզի չթրջվի։",
        imageDescription:
          "The main character sweeps the brush in a large arch over the balloon, creating a vibrant, solid rainbow that shields them from the colored rain.",
      },
      {
        text: "Նա սահեց ծիածանի վրայով և իջավ փափուկ խոտերի մեջ։",
        imageDescription:
          "The main character slides down the curve of the solid rainbow like a playground slide, arms raised in joy. They are landing in a meadow of painted grass.",
      },
      {
        text: "Առջևում նա տեսավ մի դատարկ պատ և նկարեց կապույտ դուռ։",
        imageDescription:
          "Facing a blank white wall in the dream world, the main character paints a vintage blue door with a golden handle. The door stands out against the white.",
      },
      {
        text: "Դուռը բացվեց, և այնտեղ երևացին փայլփլուն աստղեր։",
        imageDescription:
          "The painted blue door stands open. Through the doorway, a deep, dark night sky filled with sparkling stars is visible. The main character steps through.",
      },
      {
        text: "Արդեն մութն ընկնում էր։ {{NAME}}-ը նկարեց լուսինը։",
        imageDescription:
          "Back in the darkened bedroom, the main character stands on the bed and paints a crescent moon on the ceiling. The moon glows silver.",
      },
      {
        text: "Լուսինը ժպտաց և լուսավորեց ամբողջ սենյակը արծաթյա լույսով։",
        imageDescription:
          "The painted crescent moon on the ceiling has a gentle, sleepy face and smiles down. The room is bathed in soft, cool moonlight.",
      },
      {
        text: "{{NAME}}-ը շատ էր հոգնել։ Նա նկարեց մի տաք ու փափուկ անկողին։",
        imageDescription:
          "The main character uses the brush to paint extra fluffy pillows and a thick quilt onto their bed, making it look incredibly soft and cozy.",
      },
      {
        text: "Նա պառկեց քնելու՝ գրկելով իր կախարդական վրձինը։",
        imageDescription:
          "The main character is tucked into the cozy bed, fast asleep, hugging the magical paintbrush. The orange cat sleeps at the foot of the bed.",
      },
      {
        text: "Երազում նա տեսավ այն ամենը, ինչ նկարել էր։ Բարի գիշեր, {{NAME}}։",
        imageDescription:
          "Above the sleeping main character, a dream bubble depicts the adventures: the balloon, the bird, and the rainbow. The room is peaceful.",
      },
    ],
    endingText:
      "Աշխարհը քո կտավն է, իսկ դու՝ նկարիչը։ Նկարիր քո երազանքները և թույլ տուր, որ դրանք իրականություն դառնան։",
    backCoverImageDescription:
      "The back cover shows the magical wooden paintbrush resting on a table next to a watercolor palette with used, vibrant colors. A sketch of the main character waving goodbye is on a paper nearby. Background is starry.",
  },
  {
    title: "{{NAME}}-ի Խաղալիքների քաղաքը",
    coverImageDescription:
      "A vibrant, magical cover illustration showing the main character standing at the threshold of a glowing doorway that opens into a fantastical City of Toys. The main character looks in with wonder. The city features skyscrapers made of colorful Lego-like blocks, roads made of puzzle pieces, and hot air balloons shaped like spinning tops in the sky. The style is bright and playful.",
    pages: [
      {
        text: "Արևը մայր է մտնում, և աստղերը փայլում են։ {{NAME}}-ը պառկում է քնելու իր սիրելի արջուկի հետ։",
        imageDescription:
          "A cozy bedroom at night. The main character is in bed under a starry duvet, hugging a brown teddy bear. Moonlight shines in. Toys are neatly arranged on shelves.",
      },
      {
        text: "Սենյակը լցվում է կախարդական լույսով։ Ի՞նչ է կատարվում։ Խաղալիքները սկսում են շարժվել։",
        imageDescription:
          "Magic sparkles swirl around the dark room. The main character sits up in bed, surprised. On the shelves, a toy robot and a doll are wiggling and coming to life.",
      },
      {
        text: "Հանկարծ պատերը անհետանում են։ {{NAME}}-ը հայտնվում է մի նոր, զարմանալի աշխարհում։",
        imageDescription:
          "The bedroom walls dissolve into colorful mist. The main character steps out of bed onto a sidewalk made of giant puzzle pieces. A skyline of block towers appears in the background.",
      },
      {
        text: "Բարի գալուստ Խաղալիքների քաղաք։ Այստեղ ամեն ինչ գունավոր է, ուրախ և շատ մեծ։",
        imageDescription:
          "A wide shot of the City of Toys. Skyscrapers are made of red, blue, and yellow building blocks. Living toys walk the streets. The main character stands in the center, looking amazed.",
      },
      {
        text: "Մի մեծ փափուկ արջուկ մոտենում է {{NAME}}-ին։ Նա այս քաղաքի քաղաքապետն է և շատ բարի է։",
        imageDescription:
          "A giant, human-sized teddy bear wearing a top hat and a mayor's sash bows politely to the main character. The bear smiles warmly.",
      },
      {
        text: "«Նստիր այս մեքենան», - ասում է արջուկը։ Սա ամենաարագ խաղալիք մեքենան է աշխարհում։",
        imageDescription:
          "The main character climbs into a shiny red convertible car made of smooth plastic blocks. The Mayor Bear holds the door open for them.",
      },
      {
        text: "{{NAME}}-ը վարում է մեքենան փողոցներով։ Ճանապարհները պատրաստված են գունավոր գորգից։",
        imageDescription:
          "The main character drives the red toy car, hands on the wheel, zooming down a road textured like a city play-rug. Colorful buildings whiz by.",
      },
      {
        text: "Լուսացույցները կոնֆետներ են։ Բոլորը ժպտում և ողջունում են {{NAME}}-ին։",
        imageDescription:
          "A street corner with traffic lights made of giant lollipops. Toy soldiers and ragdolls on the sidewalk wave happily to the main character as the car passes.",
      },
      {
        text: "Լսվում է գնացքի ձայնը՝ տու-տու։ Փայտե գնացքը անցնում է կամրջի վրայով։",
        imageDescription:
          "A colorful wooden toy train chugs across a bridge made of rainbow-colored wooden arches. Cotton-ball steam puffs from the engine.",
      },
      {
        text: "{{NAME}}-ը ցատկում է գնացքի մեջ։ Նրանք սլանում են դեպի սպիտակ ամպերը։",
        imageDescription:
          "The main character sits in the open caboose of the wooden train, looking out. The train spirals up a track towards fluffy cotton clouds.",
      },
      {
        text: "Այստեղ ապրում են ռոբոտները։ Նրանք պարում են և երգում մետաղական ձայնով։",
        imageDescription:
          "The train stops at a station made of silver tin. Retro tin robots with antennas are doing a synchronized robot dance on the platform.",
      },
      {
        text: "Մի փոքրիկ ռոբոտ ծաղիկ է նվիրում {{NAME}}-ին։ Այն փայլում է տարբեր գույներով։",
        imageDescription:
          "A small, cute robot hands a glowing mechanical flower made of lightbulbs to the main character. The main character accepts it with a smile.",
      },
      {
        text: "Քաղաքի կենտրոնում կա մեծ այգի։ Ծառերը պատրաստված են կանաչ պլաստիլինից։",
        imageDescription:
          "A park scene where trees are sculpted from green play-dough. The grass is green felt. Giant bouncy balls are scattered around.",
      },
      {
        text: "{{NAME}}-ը բարձրանում է ամենամեծ սահարանի վրա։ Այն հասնում է մինչև երկինք։",
        imageDescription:
          "The main character climbs a ladder up a massive, twisting yellow slide that reaches into the clouds. The slide looks like it's made of plastic sections.",
      },
      {
        text: "Ուռա՜։ {{NAME}}-ը սահում է ներքև։ Քամին փչում է նրա ուրախ դեմքին։",
        imageDescription:
          "The main character slides down the yellow spiral slide, laughing, arms in the air. The colorful city blurs in the background.",
      },
      {
        text: "Նրանք հասնում են տիկնիկների տուն։ Այնտեղ մեծ թեյախմություն է։",
        imageDescription:
          "The main character stands in front of a huge, open-faced Victorian dollhouse. Elegant dolls are having a tea party on the lawn.",
      },
      {
        text: "Տիկնիկները հյուրասիրում են {{NAME}}-ին։ Բաժակները շատ փոքր են և գեղեցիկ։",
        imageDescription:
          "The main character sits at a tiny tea table with the dolls, holding a very small porcelain cup. They pretend to drink tea.",
      },
      {
        text: "Բայց ո՞վ է գալիս։ Դա բարի դինոզավրն է։ Նա չի կծում, նա ուզում է խաղալ։",
        imageDescription:
          "A large, green plastic T-Rex toy stomps into the scene. It has a friendly, goofy grin and wags its tail like a dog.",
      },
      {
        text: "{{NAME}}-ը նստում է դինոզավրի մեջքին։ Նրանք քայլում են տանիքների վրայով։",
        imageDescription:
          "The main character rides on the back of the green T-Rex. The dinosaur walks carefully over block buildings, carrying the main character.",
      },
      {
        text: "Քաղաքի ծայրին կապույտ օվկիանոսն է։ Այն լի է ռետինե բադիկներով։",
        imageDescription:
          "The city edge meets an 'ocean' which is a giant ball pit filled with translucent blue balls. Yellow rubber ducks float on the surface.",
      },
      {
        text: "{{NAME}}-ը նավարկում է թղթե նավակով։ Ձկնիկները թռչում են ջրից։",
        imageDescription:
          "The main character sits inside a giant boat made of folded newspaper, floating on the blue ball pit ocean. Wind-up fish jump from the 'water'.",
      },
      {
        text: "Երկնքում հրավառություն է։ Գույները պայթում են ամենուր և լուսավորում քաղաքը։",
        imageDescription:
          "The night sky above the Toy City explodes with fireworks shaped like stars, hearts, and flowers in neon colors. The city glows below.",
      },
      {
        text: "Գրքերը թռչում են օդում։ Նրանք պատմում են հեքիաթներ քնելուց առաջ։",
        imageDescription:
          "In a library zone, books with wings fly around like birds. The main character watches them, and illustrated characters pop out of the pages.",
      },
      {
        text: "{{NAME}}-ը սկսում է թռչել։ Նա սավառնում է քաղաքի վրայով ինչպես սուպերհերոս։",
        imageDescription:
          "The main character flies through the air wearing a cape made of a soft blue blanket. The City of Toys sparkles below.",
      },
      {
        text: "Լուսինը ժպտում է {{NAME}}-ին։ Նա ասում է, որ արդեն ուշ է, ժամանակն է վերադառնալ։",
        imageDescription:
          "A large cartoon crescent moon with a nightcap winks at the main character. The sky turns deep purple.",
      },
      {
        text: "Բոլոր խաղալիքները հավաքվում են։ Նրանք ասում են՝ «Ցտեսություն, {{NAME}}»։",
        imageDescription:
          "All the toy characters—Mayor Bear, Robots, Dolls, T-Rex—wave goodbye to the main character. They look friendly and fond.",
      },
      {
        text: "Քաղաքը դանդաղ անհետանում է։ Գույները դառնում են ավելի մեղմ և մշուշոտ։",
        imageDescription:
          "The block buildings blur and fade. The bright colors turn into soft, sleepy pastels. The dream is ending.",
      },
      {
        text: "{{NAME}}-ը նորից իր անկողնում է։ Արջուկը նրա կողքին է, ամուր գրկած։",
        imageDescription:
          "Back in the real bedroom. The main character is asleep, hugging the normal-sized brown teddy bear. The room is dark.",
      },
      {
        text: "Արևի շողերը ընկնում են սենյակ։ Լուսացավ, նոր օր է սկսվում։",
        imageDescription:
          "Morning sunlight fills the room. The main character sits up in bed, stretching, looking refreshed. It is a new day.",
      },
      {
        text: "{{NAME}}-ը նայում է խաղալիքներին։ Արդյո՞ք արջուկը աչքով արեց։ Դա գաղտնիք է։",
        imageDescription:
          "A close-up of the main character looking suspiciously at the teddy bear on the shelf. The bear looks just like the Mayor and seems to have a tiny smirk.",
      },
    ],
    endingText:
      "Երբ գիշերը գալիս է, կախարդանքը նորից սկսվում է։ Քաղցր երազներ, փոքրիկ հերոս։",
    backCoverImageDescription:
      "A deep blue night sky background scattered with glowing stars. At the bottom, a silhouette of the blocky Toy City skyline is visible.",
  },
] as const satisfies Book[];
