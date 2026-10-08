const CURRICULUM_IDS = {
  connections:["connect-forms","nonjoiners","word-parts","connected-reading"],
  vowels:["short-vowels","long-vowels","sukun","shadda","tanwin"],
  reading:["hamza","hamzat-wasl","ta-marbuta","alif-maqsura","waqf"],
  tajwid:["makharij","qalqala","nun-rules","mim-rules","madd"],
  quran:["fatiha","ikhlas","falaq","nas"]
};

COURSE_MODULES.forEach(module=>module.lessons.forEach((item,index)=>{
  if(!item.id)item.id=CURRICULUM_IDS[module.id]?.[index];
  item.available=true;
}));

function courseLesson({title,module,focus,body,points=[],examples=[],questions=[],letters=[],source="",review=false}){
  return {title,eyebrow:`${module} · Kurslektion`,focus,letters,source,review,slides:[
    {type:"concept",title:focus,body,points},
    {type:"examples",title:"Sehen und lesen",body:"Betrachte jedes Beispiel bewusst von rechts nach links.",examples,source},
    {type:"quiz",title:"Wissen prüfen",body:"Wähle die passende Antwort."}
  ],questions};
}

Object.assign(LESSONS,{
  curves:courseLesson({title:"Dāl bis Zāy",module:"Schriftbasis",focus:"Vier gebogene Nicht-Verbinder",body:"Dāl, Dhāl, Rā’ und Zāy verbinden sich mit dem Buchstaben rechts, aber nicht mit einem folgenden Buchstaben links.",letters:["dal","dhal","ra","zay"],points:["Dāl und Dhāl teilen eine Form.","Rā’ und Zāy teilen eine zweite Form.","Der Punkt unterscheidet jeweils das Paar."],examples:[{arabic:"د ذ",label:"Dāl · Dhāl",note:"Dhāl trägt einen Punkt."},{arabic:"ر ز",label:"Rā’ · Zāy",note:"Zāy trägt einen Punkt."}],questions:[{glyph:"ذ",prompt:"Welcher Buchstabe ist das?",options:["Dāl","Dhāl","Zāy"],answer:"Dhāl"},{glyph:"ز",prompt:"Welcher Buchstabe trägt hier den Punkt?",options:["Rā’","Zāy","Dāl"],answer:"Zāy"}]}),
  teeth:courseLesson({title:"Sīn bis Ḍād",module:"Schriftbasis",focus:"Zähne und breite Formen",body:"Sīn und Shīn besitzen eine Zahnform. Ṣād und Ḍād haben eine breitere, geschlossene Grundform und einen kräftigeren Laut.",letters:["sin","shin","sad","dad"],points:["Shīn hat drei Punkte über Sīn.","Ḍād hat einen Punkt über Ṣād.","Ṣād und Ḍād werden emphatisch gesprochen."],examples:[{arabic:"س ش",label:"Sīn · Shīn",note:"Drei Punkte machen aus Sīn ein Shīn."},{arabic:"ص ض",label:"Ṣād · Ḍād",note:"Ein Punkt unterscheidet das Paar."}],questions:[{glyph:"ش",prompt:"Welche Form hat drei Punkte?",options:["Sīn","Shīn","Ṣād"],answer:"Shīn"},{glyph:"ض",prompt:"Welcher Buchstabe ist das?",options:["Ḍād","Ṣād","Shīn"],answer:"Ḍād"}]}),
  throat:courseLesson({title:"Ṭā’ bis Ghayn",module:"Schriftbasis",focus:"Kräftige und tiefe Laute",body:"Ṭā’ und Ẓā’ sind emphatische Laute. ʿAyn und Ghayn entstehen im Rachen und benötigen später besonders sorgfältiges Hörtraining.",letters:["tta","zza","ayn","ghayn"],points:["Ẓā’ trägt einen Punkt über Ṭā’.","Ghayn trägt einen Punkt über ʿAyn.","Form zuerst erkennen; Aussprache mit geprüftem Audio festigen."],examples:[{arabic:"ط ظ",label:"Ṭā’ · Ẓā’",note:"Der Punkt unterscheidet das Paar."},{arabic:"ع غ",label:"ʿAyn · Ghayn",note:"Ghayn trägt einen Punkt."}],questions:[{glyph:"غ",prompt:"Welcher Rachenbuchstabe trägt einen Punkt?",options:["ʿAyn","Ghayn","Ẓā’"],answer:"Ghayn"},{glyph:"ط",prompt:"Welcher Buchstabe ist das?",options:["Ṭā’","Ẓā’","Ḍād"],answer:"Ṭā’"}]}),
  heads:courseLesson({title:"Fā’ bis Lām",module:"Schriftbasis",focus:"Vier eigenständige Formen",body:"Fā’, Qāf, Kāf und Lām bilden eine abwechslungsreiche Gruppe. Punkte, Höhe und Innenform helfen bei der Unterscheidung.",letters:["fa","qaf","kaf","lam"],points:["Fā’ hat einen Punkt, Qāf zwei.","Kāf verändert seine Innenform je nach Position.","Lām ist hoch und verbindet sich nach links."],examples:[{arabic:"ف ق",label:"Fā’ · Qāf",note:"Ein oder zwei Punkte."},{arabic:"ك ل",label:"Kāf · Lām",note:"Innenzeichen oder hoher Strich."}],questions:[{glyph:"ق",prompt:"Welche Form trägt zwei Punkte?",options:["Fā’","Qāf","Kāf"],answer:"Qāf"},{glyph:"ل",prompt:"Welcher Buchstabe ist das?",options:["Lām","Kāf","Alif"],answer:"Lām"}]}),
  finals:courseLesson({title:"Mīm bis Yā’",module:"Schriftbasis",focus:"Die letzten fünf Buchstaben",body:"Mīm, Nūn, Hā’, Wāw und Yā’ schließen das Grundalphabet ab. Wāw verbindet sich nicht mit dem folgenden Buchstaben links.",letters:["mim","nun","ha2","waw","ya"],points:["Nūn hat einen Punkt oben.","Yā’ hat in der isolierten Form zwei Punkte unten.","Wāw kann Konsonant oder langer Vokal sein."],examples:[{arabic:"م ن ه",label:"Mīm · Nūn · Hā’",note:"Rundform, Punktform und Hauchlaut."},{arabic:"و ي",label:"Wāw · Yā’",note:"Auch Träger langer Vokale."}],questions:[{glyph:"ن",prompt:"Welcher Buchstabe hat einen Punkt oben?",options:["Mīm","Nūn","Hā’"],answer:"Nūn"},{glyph:"ي",prompt:"Welcher Buchstabe ist das?",options:["Wāw","Yā’","Nūn"],answer:"Yā’"}]}),

  "connect-forms":courseLesson({title:"Formen im Wort",module:"Buchstaben verbinden",focus:"Ein Buchstabe – mehrere Formen",body:"Verbindende Buchstaben können allein, am Anfang, in der Mitte oder am Ende eines Wortes stehen. Der Grundkörper bleibt erkennbar.",points:["Beginne beim Lesen rechts.","Suche Punkte und charakteristische Bögen.","Vergleiche Anfangs- und Endform."],examples:[{arabic:"ب  بـ  ـبـ  ـب",label:"Bā’ in vier Positionen",note:"Allein · Anfang · Mitte · Ende"},{arabic:"م  مـ  ـمـ  ـم",label:"Mīm in vier Positionen",note:"Der runde Kern bleibt erhalten."}],questions:[{glyph:"ـبـ",prompt:"Welche Position zeigt diese Form?",options:["Am Anfang","In der Mitte","Allein"],answer:"In der Mitte"},{glyph:"مـ",prompt:"Wo steht diese Mīm-Form?",options:["Am Anfang","Am Ende","Allein"],answer:"Am Anfang"}]}),
  nonjoiners:courseLesson({title:"Nicht-Verbinder",module:"Buchstaben verbinden",focus:"Sechs Buchstaben unterbrechen die Linie",body:"Alif, Dāl, Dhāl, Rā’, Zāy und Wāw verbinden sich nicht mit einem folgenden Buchstaben links.",points:["Merke dir: ا د ذ ر ز و","Die Verbindung von rechts kann trotzdem bestehen.","Nach ihnen beginnt optisch ein neuer Abschnitt."],examples:[{arabic:"ا د ذ",label:"Alif · Dāl · Dhāl",note:"Kein Anschluss nach links."},{arabic:"ر ز و",label:"Rā’ · Zāy · Wāw",note:"Ebenfalls Nicht-Verbinder."}],questions:[{glyph:"ا د ذ ر ز و",prompt:"Was haben diese Buchstaben gemeinsam?",options:["Sie verbinden nicht nach links","Sie haben alle Punkte","Sie sind Vokale"],answer:"Sie verbinden nicht nach links"},{glyph:"و",prompt:"Verbindet sich Wāw mit dem folgenden Buchstaben links?",options:["Nein","Ja","Nur am Wortanfang"],answer:"Nein"}]}),
  "word-parts":courseLesson({title:"Wörter zerlegen",module:"Buchstaben verbinden",focus:"Verbundene Formen zurückverfolgen",body:"Beim Lesen zerlegst du das Wort gedanklich in seine Grundbuchstaben. Punkte und Unterbrechungen zeigen dir die Grenzen.",points:["Rechts beginnen.","Jeden Grundkörper bestimmen.","Nicht-Verbinder als sichtbare Trennung nutzen."],examples:[{arabic:"كَتَبَ",label:"Kāf · Tā’ · Bā’",note:"Drei verbundene Buchstaben."},{arabic:"نُور",label:"Nūn · Wāw · Rā’",note:"Wāw unterbricht die Verbindung."}],questions:[{glyph:"كَتَبَ",prompt:"Welcher Buchstabe steht in der Mitte?",options:["Tā’","Kāf","Bā’"],answer:"Tā’"},{glyph:"نُور",prompt:"Welcher Buchstabe unterbricht hier die Verbindung?",options:["Wāw","Nūn","Rā’"],answer:"Wāw"}]}),
  "connected-reading":courseLesson({title:"Verbindungen lesen",module:"Buchstaben verbinden",focus:"Erste vollständige Wortbilder",body:"Lies nicht Buchstabe für Buchstabe isoliert, sondern erkenne zunehmend ganze Formgruppen.",points:["Erst langsam zerlegen.","Dann erneut als Einheit lesen.","Punkte immer kontrollieren."],examples:[{arabic:"بَاب",label:"bāb",note:"Tür"},{arabic:"كِتَاب",label:"kitāb",note:"Buch"},{arabic:"نُور",label:"nūr",note:"Licht"}],questions:[{glyph:"كِتَاب",prompt:"Welche Umschrift passt?",options:["kitāb","bāb","nūr"],answer:"kitāb"},{glyph:"نُور",prompt:"Welches Wort liest du?",options:["nūr","kitāb","bāb"],answer:"nūr"}]}),

  "short-vowels":courseLesson({title:"Fatḥa, Kasra, Ḍamma",module:"Vokalzeichen",focus:"Drei kurze Vokale",body:"Fatḥa steht über dem Buchstaben und klingt kurz a. Kasra steht darunter und klingt kurz i. Ḍamma steht darüber und klingt kurz u.",points:["َ = a","ِ = i","ُ = u"],examples:[{arabic:"بَ",label:"ba",note:"Fatḥa"},{arabic:"بِ",label:"bi",note:"Kasra"},{arabic:"بُ",label:"bu",note:"Ḍamma"}],questions:[{glyph:"بِ",prompt:"Welcher Laut ist markiert?",options:["bi","ba","bu"],answer:"bi"},{glyph:"بُ",prompt:"Welches Zeichen siehst du?",options:["Ḍamma","Kasra","Fatḥa"],answer:"Ḍamma"}]}),
  "long-vowels":courseLesson({title:"Lange Vokale",module:"Vokalzeichen",focus:"ā, ī und ū zwei Zählzeiten halten",body:"Ein kurzer Vokal wird durch Alif, Yā’ oder Wāw verlängert. Im Grundfall hältst du ihn zwei Zählzeiten.",points:["َ + ا = ā","ِ + ي = ī","ُ + و = ū"],examples:[{arabic:"بَا",label:"bā",note:"langes ā"},{arabic:"بِي",label:"bī",note:"langes ī"},{arabic:"بُو",label:"bū",note:"langes ū"}],questions:[{glyph:"بَا",prompt:"Wie wird diese Silbe gelesen?",options:["bā","ba","bī"],answer:"bā"},{glyph:"بُو",prompt:"Welcher lange Vokal steht hier?",options:["ū","ā","ī"],answer:"ū"}]}),
  sukun:courseLesson({title:"Sukūn",module:"Vokalzeichen",focus:"Ein Buchstabe ohne eigenen Vokal",body:"Das Zeichen ْ zeigt, dass der Buchstabe keinen kurzen Vokal trägt und an die vorherige Silbe angeschlossen wird.",points:["Sukūn steht über dem Buchstaben.","Nicht zusätzlich a, i oder u sprechen.","Die Verbindung zur vorherigen Silbe bleibt hörbar."],examples:[{arabic:"مِنْ",label:"min",note:"Nūn ohne eigenen Vokal"},{arabic:"قُلْ",label:"qul",note:"Lām mit Sukūn"},{arabic:"لَمْ",label:"lam",note:"Mīm mit Sukūn"}],questions:[{glyph:"قُلْ",prompt:"Welcher Buchstabe trägt Sukūn?",options:["Lām","Qāf","Keiner"],answer:"Lām"},{glyph:"ْ",prompt:"Was bedeutet dieses Zeichen?",options:["Kein eigener Vokal","Verdopplung","Langes ā"],answer:"Kein eigener Vokal"}]}),
  shadda:courseLesson({title:"Shadda",module:"Vokalzeichen",focus:"Einen Konsonanten verdoppeln",body:"Shadda ّ fasst zwei gleiche Konsonanten zusammen: Der erste ist ohne Vokal, der zweite trägt den sichtbaren Vokal.",points:["Den Konsonanten hörbar halten.","Nicht als zwei getrennte Silben lesen.","Vokalzeichen kann über oder unter Shadda stehen."],examples:[{arabic:"رَبّ",label:"rabb",note:"verdoppeltes b"},{arabic:"إِنَّ",label:"inna",note:"verdoppeltes n"},{arabic:"ثُمَّ",label:"thumma",note:"verdoppeltes m"}],questions:[{glyph:"إِنَّ",prompt:"Welcher Laut wird verdoppelt?",options:["n","i","a"],answer:"n"},{glyph:"ّ",prompt:"Was zeigt Shadda?",options:["Verdopplung","Pause","Tanwīn"],answer:"Verdopplung"}]}),
  tanwin:courseLesson({title:"Tanwīn",module:"Vokalzeichen",focus:"Doppelte Vokalzeichen am Wortende",body:"Tanwīn fügt am Wortende einen n-Laut hinzu: -un, -an oder -in. Beim Pausieren gelten später besondere Regeln.",points:["ٌ = un","ً = an","ٍ = in"],examples:[{arabic:"كِتَابٌ",label:"kitābun",note:"Ḍammatān"},{arabic:"كِتَابًا",label:"kitāban",note:"Fatḥatān"},{arabic:"كِتَابٍ",label:"kitābin",note:"Kasratān"}],questions:[{glyph:"كِتَابٍ",prompt:"Welche Endung wird gelesen?",options:["-in","-un","-an"],answer:"-in"},{glyph:"ٌ",prompt:"Welche Tanwīn-Endung ist das?",options:["-un","-an","-in"],answer:"-un"}]}),

  hamza:courseLesson({title:"Hamza",module:"Leseregeln",focus:"Der deutliche Stimmabsatz",body:"Hamza kann allein oder auf Alif, Wāw und Yā’-Trägern erscheinen. Es wird als klarer Stimmabsatz gesprochen.",points:["ء ist die Grundform.","أ und إ stehen auf oder unter Alif.","ؤ und ئ verwenden andere Träger."],examples:[{arabic:"ء أ إ",label:"Hamza und Alif-Träger",note:"Position hängt von der Umgebung ab."},{arabic:"ؤ ئ",label:"Wāw- und Yā’-Träger",note:"Der Hamza-Laut bleibt erhalten."}],questions:[{glyph:"ء",prompt:"Wie heißt dieses Zeichen?",options:["Hamza","Sukūn","Shadda"],answer:"Hamza"},{glyph:"إ",prompt:"Wo steht Hamza hier?",options:["Unter Alif","Über Wāw","Allein"],answer:"Unter Alif"}]}),
  "hamzat-wasl":courseLesson({title:"Hamzat al-Waṣl",module:"Leseregeln",focus:"Beim Verbinden nicht neu ansetzen",body:"Hamzat al-Waṣl ٱ wird am Satzbeginn gesprochen, beim Anschluss an ein vorheriges Wort jedoch gewöhnlich nicht neu angesetzt.",points:["Erkennbar an ٱ.","Am Beginn hörbar.","In verbundener Rede wird der Übergang geglättet."],examples:[{arabic:"ٱلْحَمْدُ",label:"al-ḥamdu",note:"Am Beginn wird angesetzt."},{arabic:"بِسْمِ ٱللَّهِ",label:"bismi-llāh",note:"Beim Verbinden kein neuer Hamza-Ansatz."}],questions:[{glyph:"ٱ",prompt:"Wie heißt diese Alif-Form?",options:["Hamzat al-Waṣl","Alif maqṣūra","Tanwīn"],answer:"Hamzat al-Waṣl"},{glyph:"بِسْمِ ٱللَّهِ",prompt:"Was geschieht beim Verbinden vor Allāh?",options:["Kein neuer Hamza-Ansatz","Lange Pause","Tanwīn hinzufügen"],answer:"Kein neuer Hamza-Ansatz"}]}),
  "ta-marbuta":courseLesson({title:"Tā’ marbūṭa",module:"Leseregeln",focus:"Die gebundene Tā’-Endung",body:"Tā’ marbūṭa ة steht meist am Wortende. Beim Pausieren klingt sie häufig wie h; in verbundener grammatischer Form wird t hörbar.",points:["Form: ة oder ـة","Am Wortende zu finden.","Aussprache hängt von Pause und Verbindung ab."],examples:[{arabic:"رَحْمَةٌ",label:"raḥmatun",note:"Bei Verbindung ist t hörbar."},{arabic:"سُورَةٌ",label:"sūratun",note:"Gebundene Tā’-Endung."}],questions:[{glyph:"ة",prompt:"Wie heißt diese Endform?",options:["Tā’ marbūṭa","Hā’","Alif maqṣūra"],answer:"Tā’ marbūṭa"},{glyph:"سُورَةٌ",prompt:"Wo steht Tā’ marbūṭa?",options:["Am Wortende","Am Wortanfang","In der Mitte"],answer:"Am Wortende"}]}),
  "alif-maqsura":courseLesson({title:"Alif maqṣūra",module:"Leseregeln",focus:"Langes ā in einer Yā’-ähnlichen Endform",body:"Alif maqṣūra ى steht am Wortende, sieht wie Yā’ ohne Punkte aus und wird als langes ā gesprochen.",points:["Form: ى","Nur am Wortende.","Nicht als y lesen."],examples:[{arabic:"هُدَى",label:"hudā",note:"Rechtleitung"},{arabic:"عَلَى",label:"ʿalā",note:"auf"},{arabic:"مُوسَى",label:"Mūsā",note:"Moses"}],questions:[{glyph:"ى",prompt:"Wie wird diese Endform grundsätzlich gesprochen?",options:["langes ā","y","kurzes i"],answer:"langes ā"},{glyph:"هُدَى",prompt:"Welches Zeichen steht am Ende?",options:["Alif maqṣūra","Yā’ mit Punkten","Tā’ marbūṭa"],answer:"Alif maqṣūra"}]}),
  waqf:courseLesson({title:"Waqf-Zeichen",module:"Leseregeln",focus:"Pausen im Muṣḥaf erkennen",body:"Pausenzeichen helfen, Sinn und Atemführung zu bewahren. Die wichtigsten Zeichen werden zunächst visuell unterschieden.",points:["م: anhalten","لا: hier nicht anhalten","ج: Pause oder Fortsetzung möglich"],examples:[{arabic:"م",label:"Notwendiger Halt",note:"Anhalten."},{arabic:"لا",label:"Nicht halten",note:"Weiterlesen."},{arabic:"ج",label:"Beides möglich",note:"Pause oder Fortsetzung."}],questions:[{glyph:"لا",prompt:"Was bedeutet dieses Pausenzeichen?",options:["Hier nicht anhalten","Unbedingt anhalten","Versende"],answer:"Hier nicht anhalten"},{glyph:"ج",prompt:"Welche Wahl zeigt ج?",options:["Pause oder Fortsetzung","Nur Pause","Keine Regel"],answer:"Pause oder Fortsetzung"}]}),

  makharij:courseLesson({title:"Artikulationsorte",module:"Tajwīd-Grundlagen",focus:"Laute entstehen an bestimmten Orten",body:"Makharij beschreiben, wo ein arabischer Laut gebildet wird. Dieser Überblick bereitet das spätere Training mit einer Lehrperson vor.",review:true,points:["Hohlraum (al-jawf)","Rachen (al-ḥalq)","Zunge (al-lisān)","Lippen (ash-shafatān)","Nasenraum (al-khayshūm)"],examples:[{arabic:"ء ه ع ح غ خ",label:"Rachenlaute",note:"Verschiedene Bereiche des Rachens."},{arabic:"ب م و",label:"Lippenlaute",note:"Beteiligung beider Lippen."}],questions:[{glyph:"ب م و",prompt:"Welcher Artikulationsbereich ist besonders beteiligt?",options:["Lippen","Rachen","Nasenraum allein"],answer:"Lippen"},{glyph:"ع ح",prompt:"Zu welcher Hauptregion gehören diese Laute?",options:["Rachen","Lippen","Hohlraum"],answer:"Rachen"}]}),
  qalqala:courseLesson({title:"Qalqala",module:"Tajwīd-Grundlagen",focus:"Kurzer Widerhall bei fünf Buchstaben",body:"Bei ق ط ب ج د entsteht im Zustand des Sukūn ein kurzer hörbarer Widerhall, ohne einen zusätzlichen vollen Vokal einzufügen.",review:true,points:["Merkgruppe: ق ط ب ج د","Nur bei Sukūn beziehungsweise beim وقف relevant.","Kein zusätzliches a, i oder u sprechen."],examples:[{arabic:"قْ طْ بْ جْ دْ",label:"Qalqala-Buchstaben",note:"Kurzer Widerhall bei Ruhe."},{arabic:"أَحَدْ",label:"aḥad",note:"Beim Pausieren wird d mit Qalqala hörbar."}],questions:[{glyph:"ق ط ب ج د",prompt:"Wie heißt diese Buchstabengruppe?",options:["Qalqala-Buchstaben","Madd-Buchstaben","Nicht-Verbinder"],answer:"Qalqala-Buchstaben"},{glyph:"دْ",prompt:"Was darf nicht hinzugefügt werden?",options:["Ein voller zusätzlicher Vokal","Ein kurzer Widerhall","Ein klarer Buchstabe"],answer:"Ein voller zusätzlicher Vokal"}]}),
  "nun-rules":courseLesson({title:"Nūn sākin & Tanwīn",module:"Tajwīd-Grundlagen",focus:"Vier Regelgruppen nach نْ und Tanwīn",body:"Der folgende Buchstabe bestimmt, ob Nūn sākin oder Tanwīn klar, verschmolzen, gewandelt oder verborgen gelesen wird.",review:true,points:["Iẓhār: klar","Idghām: verschmelzen","Iqlāb: vor ب in m-Klang wandeln","Ikhfā’: verborgen mit Ghunnah"],examples:[{arabic:"مِنْ هَادٍ",label:"Iẓhār",note:"Klares n vor einem Rachenbuchstaben."},{arabic:"مِنۢ بَعْدِ",label:"Iqlāb",note:"Vor Bā’ wird der Klang gewandelt."}],questions:[{glyph:"نْ + ب",prompt:"Welche Regel gilt vor Bā’?",options:["Iqlāb","Iẓhār","Madd"],answer:"Iqlāb"},{glyph:"نْ + ه",prompt:"Welche Grundregel gilt vor Hā’?",options:["Iẓhār","Iqlāb","Qalqala"],answer:"Iẓhār"}]}),
  "mim-rules":courseLesson({title:"Mīm sākin",module:"Tajwīd-Grundlagen",focus:"Drei Regeln für مْ",body:"Nach Mīm sākin entscheidet der nächste Buchstabe zwischen klarer Aussprache, Verschmelzung und verborgenem Lippenlaut.",review:true,points:["Vor م: Idghām shafawī","Vor ب: Ikhfā’ shafawī","Vor allen übrigen: Iẓhār shafawī"],examples:[{arabic:"هُم مَّا",label:"Idghām shafawī",note:"Mīm trifft auf Mīm."},{arabic:"تَرْمِيهِم بِحِجَارَةٍ",label:"Ikhfā’ shafawī",note:"Mīm sākin vor Bā’."}],questions:[{glyph:"مْ + ب",prompt:"Welche Regel gilt?",options:["Ikhfā’ shafawī","Idghām shafawī","Qalqala"],answer:"Ikhfā’ shafawī"},{glyph:"مْ + م",prompt:"Welche Regel gilt?",options:["Idghām shafawī","Iẓhār shafawī","Madd"],answer:"Idghām shafawī"}]}),
  madd:courseLesson({title:"Madd",module:"Tajwīd-Grundlagen",focus:"Vokale kontrolliert verlängern",body:"Der natürliche Madd (madd ṭabīʿī) dauert grundsätzlich zwei Zählzeiten. Weitere Madd-Arten hängen von Hamza oder Sukūn ab und werden später vertieft.",review:true,points:["Alif nach Fatḥa verlängert ā.","Yā’ sākin nach Kasra verlängert ī.","Wāw sākin nach Ḍamma verlängert ū."],examples:[{arabic:"قَالَ",label:"qāla",note:"Alif-Madd"},{arabic:"قِيلَ",label:"qīla",note:"Yā’-Madd"},{arabic:"يَقُولُ",label:"yaqūlu",note:"Wāw-Madd"}],questions:[{glyph:"قَالَ",prompt:"Welcher Laut wird verlängert?",options:["ā","ī","ū"],answer:"ā"},{glyph:"مَدّ طبيعي",prompt:"Wie lang ist der natürliche Madd?",options:["Zwei Zählzeiten","Eine Zählzeit","Immer sechs Zählzeiten"],answer:"Zwei Zählzeiten"}]}),

  fatiha:courseLesson({title:"Al-Fātiḥa",module:"Koranpraxis",focus:"Die Eröffnungssure begleitet lesen",body:"Lies langsam Vers für Vers. Achte zuerst auf Buchstaben und Vokalzeichen; Rezitation und Tajwīd werden anschließend mit geprüftem Audio vertieft.",review:true,source:"Uthmani-Text: Quran Foundation / Quran.com",points:["Wortgrenzen erkennen.","Shadda und lange Vokale markieren.","Bei Unsicherheit nicht raten, sondern zurückgehen."],examples:[{arabic:"بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",label:"1:1",note:""},{arabic:"ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",label:"1:2",note:""},{arabic:"ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",label:"1:3",note:""},{arabic:"مَـٰلِكِ يَوْمِ ٱلدِّينِ",label:"1:4",note:""},{arabic:"إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",label:"1:5",note:""},{arabic:"ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",label:"1:6",note:""},{arabic:"صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",label:"1:7",note:""}],questions:[{glyph:"ٱلْحَمْدُ",prompt:"Welcher Buchstabe trägt hier Sukūn?",options:["Lām","Ḥā’","Dāl"],answer:"Lām"},{glyph:"إِيَّاكَ",prompt:"Welches Zeichen verdoppelt Yā’?",options:["Shadda","Tanwīn","Sukūn"],answer:"Shadda"}]}),
  ikhlas:courseLesson({title:"Al-Ikhlāṣ",module:"Koranpraxis",focus:"Vier kurze Verse sicher gliedern",body:"Lies jeden Vers zunächst ohne Tempo. Suche Sukūn, Shadda, Tanwīn und mögliche Pausenstellen.",review:true,source:"Uthmani-Text: Quran Foundation / Quran.com",points:["Qul beginnt mit Qāf und Ḍamma.","Aḥad endet beim وقف mit Dāl sākin.","Wiederhole schwierige Wortbilder einzeln."],examples:[{arabic:"قُلْ هُوَ ٱللَّهُ أَحَدٌ",label:"112:1",note:""},{arabic:"ٱللَّهُ ٱلصَّمَدُ",label:"112:2",note:""},{arabic:"لَمْ يَلِدْ وَلَمْ يُولَدْ",label:"112:3",note:""},{arabic:"وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",label:"112:4",note:""}],questions:[{glyph:"قُلْ",prompt:"Welcher Buchstabe trägt Sukūn?",options:["Lām","Qāf","Beide"],answer:"Lām"},{glyph:"ٱلصَّمَدُ",prompt:"Welcher Buchstabe trägt Shadda?",options:["Ṣād","Mīm","Dāl"],answer:"Ṣād"}]}),
  falaq:courseLesson({title:"Al-Falaq",module:"Koranpraxis",focus:"Wiederkehrende Wortmuster erkennen",body:"Diese Sure wiederholt die Struktur وَمِن شَرِّ. Nutze Wiederholungen, um Wortbilder flüssiger zu erfassen.",review:true,source:"Uthmani-Text: Quran Foundation / Quran.com",points:["Wiederkehrende Wörter als Einheiten erkennen.","Shadda in شَرِّ bewusst lesen.","Verse einzeln und dann verbunden üben."],examples:[{arabic:"قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ",label:"113:1",note:""},{arabic:"مِن شَرِّ مَا خَلَقَ",label:"113:2",note:""},{arabic:"وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",label:"113:3",note:""},{arabic:"وَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ",label:"113:4",note:""},{arabic:"وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",label:"113:5",note:""}],questions:[{glyph:"شَرِّ",prompt:"Welcher Buchstabe wird verdoppelt?",options:["Rā’","Shīn","Beide"],answer:"Rā’"},{glyph:"قُلْ",prompt:"Wie endet diese Silbe?",options:["Mit Lām sākin","Mit langem ā","Mit Tanwīn"],answer:"Mit Lām sākin"}]}),
  nas:courseLesson({title:"An-Nās",module:"Koranpraxis",focus:"Endungen und Wiederholungen festigen",body:"Das Wort ٱلنَّاسِ kehrt mehrfach wieder. Nutze die Wiederholung, um Shadda, langes ā und Kasra am Ende zu festigen.",review:true,source:"Uthmani-Text: Quran Foundation / Quran.com",points:["An-Nās als wiederkehrendes Wortbild erkennen.","Shadda auf Nūn beachten.","Verse in sinnvollen Atemabschnitten lesen."],examples:[{arabic:"قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ",label:"114:1",note:""},{arabic:"مَلِكِ ٱلنَّاسِ",label:"114:2",note:""},{arabic:"إِلَـٰهِ ٱلنَّاسِ",label:"114:3",note:""},{arabic:"مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ",label:"114:4",note:""},{arabic:"ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ",label:"114:5",note:""},{arabic:"مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",label:"114:6",note:""}],questions:[{glyph:"ٱلنَّاسِ",prompt:"Welcher Buchstabe trägt Shadda?",options:["Nūn","Sīn","Alif"],answer:"Nūn"},{glyph:"صُدُورِ",prompt:"Welcher lange Vokal ist enthalten?",options:["ū","ā","ī"],answer:"ū"}]})
});

// Jede Lektion besitzt einen breiten Aufgabenpool. Die Reihenfolge wird erst beim
// Öffnen einer Übung in app.js gemischt, damit Inhalte und Lernweg stabil bleiben.
LESSONS["rtl-alif"].questions = [
  {glyph:"ا",prompt:"Welcher Buchstabe ist das?",options:["Alif","Lām","Dāl"],answer:"Alif"},
  {glyph:"←",prompt:"In welche Richtung liest du eine arabische Zeile?",options:["Von rechts nach links","Von links nach rechts","Von unten nach oben"],answer:"Von rechts nach links"},
  {glyph:"ا",prompt:"Welche Grundform beschreibt Alif am besten?",options:["Ein gerader Strich","Eine Schale mit Punkt","Drei kleine Zähne"],answer:"Ein gerader Strich"},
  {glyph:"ا",prompt:"Verbindet sich Alif mit dem folgenden Buchstaben links?",options:["Nein","Ja, immer","Nur am Wortanfang"],answer:"Nein"},
  {glyph:"ـا",prompt:"Welche Form siehst du?",options:["Alif am Wortende","Lām am Wortanfang","Dāl allein"],answer:"Alif am Wortende"},
  {glyph:"العربية",prompt:"Wo beginnst du dieses arabische Wort zu lesen?",options:["Am rechten Rand","Am linken Rand","In der Mitte"],answer:"Am rechten Rand"},
  {glyph:"ا",prompt:"Wie viele Punkte hat Alif?",options:["Keine","Einen darunter","Zwei darüber"],answer:"Keine"},
  {glyph:"بَا",prompt:"Welcher Buchstabe verlängert hier den a-Laut?",options:["Alif","Bā’","Keiner"],answer:"Alif"},
  {glyph:"ـا",prompt:"Auf welcher Seite ist Alif hier verbunden?",options:["Auf der rechten Seite","Auf der linken Seite","Auf beiden Seiten"],answer:"Auf der rechten Seite"},
  {glyph:"ا",prompt:"Welche Form gehört zu Alif?",options:["ا","ب","ل"],answer:"ا"}
];
if (!LESSONS["rtl-alif"].slides.some(slide => slide.type === "quiz")) {
  LESSONS["rtl-alif"].slides.push({type:"quiz",title:"Grundlagen festigen",body:"Prüfe Leserichtung und Alif in wechselnder Reihenfolge."});
}

function questionOptions(answer, alternatives, fallbacks) {
  return [...new Set([answer, ...alternatives, ...fallbacks])].slice(0, 3);
}

const lessonPool = Object.values(LESSONS);

lessonPool.forEach(lesson => {
  lesson.questions ||= [];
  const addQuestion = question => {
    const key = `${question.glyph}|${question.prompt}|${question.answer}`;
    const exists = lesson.questions.some(item => `${item.glyph}|${item.prompt}|${item.answer}` === key);
    if (!exists) lesson.questions.push(question);
  };

  (lesson.letters || []).forEach(letterId => {
    if (lesson.questions.length >= 10) return;
    const letter = ALPHABET.find(item => item.id === letterId);
    if (!letter) return;
    const letterIndex = ALPHABET.indexOf(letter);
    const alternatives = [1, 2, 3].map(offset => ALPHABET[(letterIndex + offset) % ALPHABET.length].name);
    addQuestion({
      glyph:letter.letter,
      prompt:"Wie heißt dieser Buchstabe?",
      options:questionOptions(letter.name, alternatives, ["Andere Form"]),
      answer:letter.name
    });
  });

  const examples = lesson.slides.find(slide => slide.type === "examples")?.examples || [];
  const labels = examples.map(example => example.label).filter(Boolean);
  const notes = examples.map(example => example.note).filter(Boolean);
  examples.forEach(example => {
    if (lesson.questions.length < 10 && example.label) {
      addQuestion({
        glyph:example.arabic,
        prompt:"Welche Bezeichnung passt zu diesem Beispiel?",
        options:questionOptions(example.label, labels.filter(label => label !== example.label), ["Keine der genannten","Andere Form"]),
        answer:example.label
      });
    }
    if (lesson.questions.length < 10 && example.label) {
      addQuestion({
        glyph:example.label,
        prompt:"Welches Schriftbild gehört zu dieser Bezeichnung?",
        options:questionOptions(example.arabic, examples.filter(item => item !== example).map(item => item.arabic), ["Keines dieser Beispiele","Andere Form"]),
        answer:example.arabic
      });
    }
    if (lesson.questions.length < 10 && example.note) {
      addQuestion({
        glyph:example.arabic,
        prompt:"Welche Beschreibung passt zu diesem Beispiel?",
        options:questionOptions(example.note, notes.filter(note => note !== example.note), ["Keine dieser Aussagen","Andere Regel"]),
        answer:example.note
      });
    }
  });

  const points = lesson.slides.find(slide => slide.type === "concept")?.points || [];
  const otherLessonTitles = lessonPool.filter(item => item !== lesson).map(item => item.title);
  points.forEach((point, pointIndex) => {
    if (lesson.questions.length >= 10) return;
    addQuestion({
      glyph:point,
      prompt:"Zu welcher Lektion gehört dieser Merksatz?",
      options:questionOptions(lesson.title, [otherLessonTitles[pointIndex % otherLessonTitles.length], otherLessonTitles[(pointIndex + 7) % otherLessonTitles.length]], ["Andere Lektion"]),
      answer:lesson.title
    });
  });

  // Buchstabenlektionen erhalten zusätzlich Laut-Aufgaben, bis zehn Varianten erreicht sind.
  (lesson.letters || []).forEach(letterId => {
    if (lesson.questions.length >= 10) return;
    const letter = ALPHABET.find(item => item.id === letterId);
    if (!letter) return;
    const letterIndex = ALPHABET.indexOf(letter);
    const alternatives = [1, 2, 3].map(offset => ALPHABET[(letterIndex + offset) % ALPHABET.length].sound);
    addQuestion({
      glyph:letter.letter,
      prompt:"Welcher Laut gehört zu diesem Buchstaben?",
      options:questionOptions(letter.sound, alternatives, ["Anderer Laut"]),
      answer:letter.sound
    });
  });
});

// Jeder Buchstabe wird auch innerhalb seiner Kurslektion geschrieben.
// Bei Gruppenlektionen kann der Lernende zwischen allen neuen Buchstaben wechseln.
Object.values(LESSONS).forEach(lesson => {
  if (!(lesson.letters || []).length || lesson.slides.some(slide => slide.type === "writing")) return;
  const quizIndex = lesson.slides.findIndex(slide => slide.type === "quiz");
  const writingSlide = {
    type:"writing",
    title:"Alle neuen Buchstaben schreiben",
    body:"Übe jeden Buchstaben dieser Lektion zuerst mit Vorlage und anschließend frei aus dem Gedächtnis."
  };
  lesson.slides.splice(quizIndex >= 0 ? quizIndex : lesson.slides.length, 0, writingSlide);
});
