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

// Der Fragenpool prüft konkrete Teilfertigkeiten: erkennen, unterscheiden, lesen
// und anwenden. Automatisch erzeugte Beschreibungs- und Merksatzfragen werden
// bewusst vermieden, weil sie nicht direkt auf flüssiges Lesen vorbereiten.
function q(glyph,prompt,options,answer,exercise="Anwenden") {
  return {glyph,prompt,options,answer,exercise};
}

function letterChoices(letters,current,key) {
  const values=letters.map(letter=>letter[key]);
  const globalValues=ALPHABET.map(letter=>letter[key]);
  return [...new Set([current[key],...values,...globalValues])].slice(0,3);
}

function letterLessonQuestions(letterIds) {
  const letters=letterIds.map(id=>ALPHABET.find(letter=>letter.id===id)).filter(Boolean);
  const questions=[];
  letters.forEach(letter=>questions.push(q(letter.letter,"Welcher Buchstabe ist das?",letterChoices(letters,letter,"name"),letter.name,"Erkennen")));
  letters.forEach((letter,index)=>{
    const formIndex=letter.joinsLeft?(index%3)+1:1;
    const positions=["allein","am Wortende","in der Wortmitte","am Wortanfang"];
    questions.push(q(letter.forms[formIndex],`Welcher Buchstabe steht hier ${positions[formIndex]}?`,letterChoices(letters,letter,"name"),letter.name,"Form im Wort"));
  });
  letters.forEach(letter=>questions.push(q(letter.letter,"Welcher Laut gehört zu diesem Buchstaben?",letterChoices(letters,letter,"sound"),letter.sound,"Laut zuordnen")));
  letters.forEach(letter=>questions.push(q(letter.letter,"Kann dieser Buchstabe mit dem folgenden Buchstaben links verbunden werden?",letter.joinsLeft?["Ja","Nein","Nur mit Vokalzeichen"]:["Nein","Ja","Nur am Wortende"],letter.joinsLeft?"Ja":"Nein","Verbinden")));
  return questions.slice(0,10);
}

LESSONS["rtl-alif"].questions = [
  q("←","In welche Richtung liest du eine arabische Zeile?",["Von rechts nach links","Von links nach rechts","Von unten nach oben"],"Von rechts nach links","Leserichtung"),
  q("ا","Welcher Buchstabe ist das?",["Alif","Lām","Dāl"],"Alif","Erkennen"),
  q("ـا","Welcher Buchstabe steht hier am Wortende?",["Alif","Lām","Rā’"],"Alif","Form im Wort"),
  q("بَا","Welcher Buchstabe verlängert hier den a-Laut?",["Alif","Bā’","Keiner"],"Alif","Lesen"),
  q("بَاب","Wie oft kommt Alif in diesem Wort vor?",["Einmal","Zweimal","Gar nicht"],"Einmal","Im Wort finden"),
  q("دَار","Welcher Buchstabe steht zwischen Dāl und Rā’?",["Alif","Lām","Wāw"],"Alif","Wort zerlegen"),
  q("ا","Verbindet sich Alif mit dem folgenden Buchstaben links?",["Nein","Ja","Nur mit Kasra"],"Nein","Verbinden"),
  q("با","Wo wird die Verbindung durch Alif beendet?",["Nach Alif","Vor Bā’","Nirgends"],"Nach Alif","Verbinden"),
  q("ا ل د","Wähle Alif aus.",["ا","ل","د"],"ا","Unterscheiden"),
  q("العربية","Wo beginnst du dieses Wort zu lesen?",["Am rechten Rand","Am linken Rand","In der Mitte"],"Am rechten Rand","Leserichtung")
];
if (!LESSONS["rtl-alif"].slides.some(slide => slide.type === "quiz")) LESSONS["rtl-alif"].slides.push({type:"quiz",title:"Erkennen und anwenden",body:"Lies von rechts und erkenne Alif allein und im Wort."});

["dots","bowls","curves","teeth","throat","heads","finals"].forEach(id=>{
  LESSONS[id].questions=letterLessonQuestions(LESSONS[id].letters);
});

const TARGETED_QUESTION_BANK = {};

Object.assign(TARGETED_QUESTION_BANK,{
  "connect-forms":[
    q("ب","Welche Form von Bā’ siehst du?",["Allein","Am Anfang","In der Mitte"],"Allein","Position erkennen"),
    q("بـ","Welche Form von Bā’ siehst du?",["Am Anfang","Am Ende","Allein"],"Am Anfang","Position erkennen"),
    q("ـبـ","Welche Form von Bā’ siehst du?",["In der Mitte","Am Anfang","Am Ende"],"In der Mitte","Position erkennen"),
    q("ـب","Welche Form von Bā’ siehst du?",["Am Ende","In der Mitte","Allein"],"Am Ende","Position erkennen"),
    q("مـ","Welcher Buchstabe steht hier am Wortanfang?",["Mīm","Hā’","Wāw"],"Mīm","Form im Wort"),
    q("ـمـ","Welcher Buchstabe steht hier in der Wortmitte?",["Mīm","ʿAyn","Fā’"],"Mīm","Form im Wort"),
    q("ـن","Welcher Buchstabe steht hier am Wortende?",["Nūn","Bā’","Tā’"],"Nūn","Form im Wort"),
    q("كِتَاب","Welcher Buchstabe steht am Wortanfang rechts?",["Kāf","Tā’","Bā’"],"Kāf","Im Wort finden"),
    q("كَتَبَ","Welcher Buchstabe steht in der Mitte?",["Tā’","Kāf","Bā’"],"Tā’","Im Wort finden"),
    q("عِلْم","Welcher Buchstabe steht am Wortende links?",["Mīm","ʿAyn","Lām"],"Mīm","Im Wort finden")
  ],
  nonjoiners:[
    q("ا د ذ ر ز و","Welche Eigenschaft haben diese sechs Buchstaben?",["Sie verbinden nicht nach links","Sie tragen alle Punkte","Sie sind lange Vokale"],"Sie verbinden nicht nach links","Regel anwenden"),
    q("و","Verbindet sich Wāw mit dem folgenden Buchstaben links?",["Nein","Ja","Nur mit Fatḥa"],"Nein","Verbinden"),
    q("د","Verbindet sich Dāl mit dem folgenden Buchstaben links?",["Nein","Ja","Nur am Wortanfang"],"Nein","Verbinden"),
    q("ب","Gehört Bā’ zu den sechs Nicht-Verbindern?",["Nein","Ja","Nur ohne Punkte"],"Nein","Unterscheiden"),
    q("نُور","Welcher Buchstabe unterbricht nach sich die Verbindung?",["Wāw","Nūn","Rā’"],"Wāw","Im Wort finden"),
    q("دَار","Welcher Buchstabe unterbricht die Verbindung zuerst?",["Dāl","Alif","Rā’"],"Dāl","Im Wort finden"),
    q("زَاد","Welcher Buchstabe steht rechts und verbindet nicht nach links?",["Zāy","Alif","Dāl"],"Zāy","Im Wort finden"),
    q("را","Warum bleiben Rā’ und Alif optisch getrennt?",["Rā’ verbindet nicht nach links","Alif hat keinen Punkt","Beide sind Vokale"],"Rā’ verbindet nicht nach links","Regel anwenden"),
    q("بـ","Welche Form zeigt einen Buchstaben, der nach links verbindet?",["بـ","د","و"],"بـ","Unterscheiden"),
    q("ا د ذ ر ز و","Wie viele Nicht-Verbinder musst du sicher erkennen?",["Sechs","Vier","Acht"],"Sechs","Festigen")
  ],
  "word-parts":[
    q("كَتَبَ","Aus welchen Buchstaben besteht dieses Wort?",["ك + ت + ب","ب + ت + ك","ك + ب + ت"],"ك + ت + ب","Wort zerlegen"),
    q("نُور","Aus welchen Buchstaben besteht dieses Wort?",["ن + و + ر","ر + و + ن","ن + ر + و"],"ن + و + ر","Wort zerlegen"),
    q("قَلَم","Welcher Buchstabe steht in der Mitte?",["Lām","Qāf","Mīm"],"Lām","Im Wort finden"),
    q("كِتَاب","Welcher Buchstabe steht am Wortende?",["Bā’","Kāf","Alif"],"Bā’","Im Wort finden"),
    q("فِي","Welcher Buchstabe steht am Wortanfang?",["Fā’","Yā’","Kasra"],"Fā’","Im Wort finden"),
    q("مَلِك","Wie viele Buchstaben hat dieses Wort?",["Drei","Vier","Zwei"],"Drei","Wort zerlegen"),
    q("صَبْر","Welche Folge liest du von rechts nach links?",["Ṣād – Bā’ – Rā’","Rā’ – Bā’ – Ṣād","Ṣād – Rā’ – Bā’"],"Ṣād – Bā’ – Rā’","Leserichtung"),
    q("عِلْم","Welcher Buchstabe steht zwischen ʿAyn und Mīm?",["Lām","Alif","Yā’"],"Lām","Im Wort finden"),
    q("بَاب","Welcher Buchstabe kommt zweimal vor?",["Bā’","Alif","Keiner"],"Bā’","Muster erkennen"),
    q("قُلْ","Welche zwei Buchstaben bilden das Wort?",["Qāf und Lām","Fā’ und Lām","Qāf und Nūn"],"Qāf und Lām","Wort zerlegen")
  ],
  "connected-reading":[
    q("بَاب","Wie wird dieses Wort gelesen?",["bāb","bayt","nūr"],"bāb","Wort lesen"),
    q("كِتَاب","Wie wird dieses Wort gelesen?",["kitāb","khabar","qalam"],"kitāb","Wort lesen"),
    q("نُور","Wie wird dieses Wort gelesen?",["nūr","nās","dār"],"nūr","Wort lesen"),
    q("قَلَم","Wie wird dieses Wort gelesen?",["qalam","qul","falaq"],"qalam","Wort lesen"),
    q("مَلِك","Wie wird dieses Wort gelesen?",["malik","min","kitāb"],"malik","Wort lesen"),
    q("فِي","Wie wird dieses Wort gelesen?",["fī","qul","rabb"],"fī","Wort lesen"),
    q("عِلْم","Wie wird dieses Wort gelesen?",["ʿilm","nūr","ṣabr"],"ʿilm","Wort lesen"),
    q("صَبْر","Wie wird dieses Wort gelesen?",["ṣabr","khabar","dār"],"ṣabr","Wort lesen"),
    q("رَبّ","Welches Wort bedeutet „Herr · Erhalter“?",["rabb","bāb","min"],"rabb","Wortschatz"),
    q("فَلَق","Welches Wort bedeutet „Morgendämmerung“?",["falaq","qalam","malik"],"falaq","Wortschatz")
  ],
  "short-vowels":[
    q("بَ","Wie liest du diese Silbe?",["ba","bi","bu"],"ba","Silbe lesen"),
    q("بِ","Wie liest du diese Silbe?",["bi","ba","bu"],"bi","Silbe lesen"),
    q("بُ","Wie liest du diese Silbe?",["bu","ba","bi"],"bu","Silbe lesen"),
    q("تَ","Wie liest du diese Silbe?",["ta","ti","tu"],"ta","Silbe lesen"),
    q("تِ","Wie liest du diese Silbe?",["ti","ta","tu"],"ti","Silbe lesen"),
    q("تُ","Wie liest du diese Silbe?",["tu","ta","ti"],"tu","Silbe lesen"),
    q("قَ","Welcher kurze Vokal steht auf Qāf?",["Fatḥa · a","Kasra · i","Ḍamma · u"],"Fatḥa · a","Vokal erkennen"),
    q("لِ","Welcher kurze Vokal steht auf Lām?",["Kasra · i","Fatḥa · a","Ḍamma · u"],"Kasra · i","Vokal erkennen"),
    q("مُ","Welcher kurze Vokal steht auf Mīm?",["Ḍamma · u","Fatḥa · a","Kasra · i"],"Ḍamma · u","Vokal erkennen"),
    q("بَ تِ مُ","Welche Lautfolge liest du?",["ba – ti – mu","bi – ta – ma","bu – tu – mi"],"ba – ti – mu","Folge lesen")
  ],
  "long-vowels":[
    q("بَا","Wie liest du diese Silbe?",["bā","ba","bī"],"bā","Silbe lesen"),
    q("بِي","Wie liest du diese Silbe?",["bī","bi","bū"],"bī","Silbe lesen"),
    q("بُو","Wie liest du diese Silbe?",["bū","bu","bā"],"bū","Silbe lesen"),
    q("قَالَ","Welcher Laut wird verlängert?",["ā","ī","ū"],"ā","Madd erkennen"),
    q("قِيلَ","Welcher Laut wird verlängert?",["ī","ā","ū"],"ī","Madd erkennen"),
    q("نُور","Welcher Laut wird verlängert?",["ū","ā","ī"],"ū","Madd erkennen"),
    q("فِي","Wie wird dieses Wort gelesen?",["fī","fi","fā"],"fī","Wort lesen"),
    q("بَاب","Wie wird dieses Wort gelesen?",["bāb","bab","bīb"],"bāb","Wort lesen"),
    q("نَاس","Welcher Buchstabe trägt hier das lange ā?",["Alif","Nūn","Sīn"],"Alif","Madd finden"),
    q("بَا بِ بِي","Welche Silbe enthält ein langes ī?",["بِي","بِ","بَا"],"بِي","Unterscheiden")
  ],
  sukun:[
    q("بْ","Welches Zeichen steht auf Bā’?",["Sukūn","Shadda","Fatḥa"],"Sukūn","Zeichen erkennen"),
    q("مِنْ","Welcher Buchstabe trägt Sukūn?",["Nūn","Mīm","Keiner"],"Nūn","Im Wort finden"),
    q("قُلْ","Welcher Buchstabe trägt Sukūn?",["Lām","Qāf","Beide"],"Lām","Im Wort finden"),
    q("لَمْ","Welcher Buchstabe trägt Sukūn?",["Mīm","Lām","Beide"],"Mīm","Im Wort finden"),
    q("قُلْ","Wie liest du dieses Wort?",["qul","qula","qūl"],"qul","Wort lesen"),
    q("مِنْ","Wie liest du dieses Wort?",["min","mina","mīn"],"min","Wort lesen"),
    q("صَبْر","Welcher Buchstabe hat keinen eigenen Vokal?",["Bā’","Ṣād","Rā’"],"Bā’","Regel anwenden"),
    q("يَلِدْ","Welcher Buchstabe endet mit Sukūn?",["Dāl","Lām","Yā’"],"Dāl","Im Wort finden"),
    q("نَسْتَعِينُ","Welcher Buchstabe trägt das erste Sukūn?",["Sīn","Tā’","Nūn"],"Sīn","Qurʾān-Wort lesen"),
    q("ْ","Was liest du bei Sukūn nicht zusätzlich?",["a, i oder u","den Konsonanten","den vorherigen Vokal"],"a, i oder u","Regel anwenden")
  ],
  shadda:[
    q("بّ","Was zeigt das Zeichen auf Bā’?",["Bā’ wird verdoppelt","Bā’ bleibt ohne Laut","Bā’ wird langes ā"],"Bā’ wird verdoppelt","Zeichen anwenden"),
    q("رَبّ","Welcher Buchstabe wird verdoppelt?",["Bā’","Rā’","Keiner"],"Bā’","Im Wort finden"),
    q("إِنَّ","Welcher Buchstabe wird verdoppelt?",["Nūn","Alif","Hamza"],"Nūn","Im Wort finden"),
    q("ثُمَّ","Welcher Buchstabe wird verdoppelt?",["Mīm","Thā’","Keiner"],"Mīm","Im Wort finden"),
    q("رَبّ","Wie wird dieses Wort gelesen?",["rabb","rab","rāb"],"rabb","Wort lesen"),
    q("إِنَّ","Wie wird dieses Wort gelesen?",["inna","ina","īna"],"inna","Wort lesen"),
    q("ثُمَّ","Wie wird dieses Wort gelesen?",["thumma","thuma","thammā"],"thumma","Wort lesen"),
    q("ٱلنَّاسِ","Auf welchem Buchstaben steht Shadda?",["Nūn","Lām","Sīn"],"Nūn","Qurʾān-Wort lesen"),
    q("شَرِّ","Auf welchem Buchstaben steht Shadda?",["Rā’","Shīn","Beide"],"Rā’","Qurʾān-Wort lesen"),
    q("رَبِّ","Welche Lautfolge ist richtig?",["rabbi","rabi","rābi"],"rabbi","Wort lesen")
  ],
  tanwin:[
    q("بٌ","Welche Endung liest du?",["-un","-an","-in"],"-un","Endung lesen"),
    q("بً","Welche Endung liest du?",["-an","-un","-in"],"-an","Endung lesen"),
    q("بٍ","Welche Endung liest du?",["-in","-an","-un"],"-in","Endung lesen"),
    q("كِتَابٌ","Wie lautet die Endung?",["-un","-an","-in"],"-un","Wortende lesen"),
    q("كِتَابًا","Wie lautet die Endung?",["-an","-un","-in"],"-an","Wortende lesen"),
    q("كِتَابٍ","Wie lautet die Endung?",["-in","-an","-un"],"-in","Wortende lesen"),
    q("غَاسِقٍ","Welches Tanwīn steht am Ende?",["Kasratān","Ḍammatān","Fatḥatān"],"Kasratān","Zeichen erkennen"),
    q("أَحَدٌ","Welches Tanwīn steht am Ende?",["Ḍammatān","Kasratān","Fatḥatān"],"Ḍammatān","Zeichen erkennen"),
    q("كُفُوًا","Welches Tanwīn steht am Ende?",["Fatḥatān","Ḍammatān","Kasratān"],"Fatḥatān","Zeichen erkennen"),
    q("ٌ ً ٍ","Was fügen diese Zeichen beim verbundenen Lesen hinzu?",["Einen n-Laut","Einen langen Vokal","Eine Verdopplung"],"Einen n-Laut","Regel anwenden")
  ]
});

Object.assign(TARGETED_QUESTION_BANK,{
  fatiha:[
    q("بِسْمِ","Welcher Buchstabe trägt Sukūn?",["Sīn","Bā’","Mīm"],"Sīn","Vers lesen"),
    q("ٱلْحَمْدُ","Welcher Buchstabe trägt Sukūn?",["Lām","Ḥā’","Dāl"],"Lām","Vers lesen"),
    q("لِلَّهِ","Welcher Buchstabe wird durch Shadda verdoppelt?",["Lām","Hā’","Alif"],"Lām","Vers lesen"),
    q("رَبِّ","Welcher Buchstabe wird verdoppelt?",["Bā’","Rā’","Yā’"],"Bā’","Vers lesen"),
    q("ٱلْعَـٰلَمِينَ","Welcher lange Vokal steht am Wortende vor Nūn?",["ī","ā","ū"],"ī","Madd finden"),
    q("إِيَّاكَ","Welcher Buchstabe trägt Shadda?",["Yā’","Kāf","Hamza"],"Yā’","Vers lesen"),
    q("نَسْتَعِينُ","Welcher Buchstabe trägt das erste Sukūn?",["Sīn","Tā’","ʿAyn"],"Sīn","Vers lesen"),
    q("ٱهْدِنَا","Welcher Buchstabe trägt Sukūn?",["Hā’","Dāl","Nūn"],"Hā’","Vers lesen"),
    q("ٱلصِّرَٰطَ","Welcher Buchstabe trägt Shadda?",["Ṣād","Rā’","Ṭā’"],"Ṣād","Vers lesen"),
    q("ٱلضَّآلِّينَ","Welcher Buchstabe trägt die zweite Shadda?",["Lām","Ḍād","Nūn"],"Lām","Vers lesen")
  ],
  ikhlas:[
    q("قُلْ","Welcher Buchstabe trägt Sukūn?",["Lām","Qāf","Beide"],"Lām","Vers lesen"),
    q("هُوَ","Welche kurze Vokalfolge liest du?",["huwa","hawa","hū"],"huwa","Wort lesen"),
    q("ٱللَّهُ","Welcher Buchstabe trägt Shadda?",["Lām","Hā’","Alif"],"Lām","Vers lesen"),
    q("أَحَدٌ","Welche Endung steht beim verbundenen Lesen?",["-un","-an","-in"],"-un","Tanwīn lesen"),
    q("ٱلصَّمَدُ","Welcher Buchstabe trägt Shadda?",["Ṣād","Mīm","Dāl"],"Ṣād","Vers lesen"),
    q("لَمْ","Welcher Buchstabe trägt Sukūn?",["Mīm","Lām","Keiner"],"Mīm","Vers lesen"),
    q("يَلِدْ","Welcher Buchstabe trägt Sukūn?",["Dāl","Lām","Yā’"],"Dāl","Vers lesen"),
    q("يُولَدْ","Welcher lange Vokal steht nach Yā’?",["ū","ā","ī"],"ū","Madd finden"),
    q("كُفُوًا","Welche Tanwīn-Endung steht am Wortende?",["-an","-un","-in"],"-an","Tanwīn lesen"),
    q("أَحَدْ","Welcher Buchstabe erhält beim Anhalten Qalqala?",["Dāl","Ḥā’","Alif"],"Dāl","وقف anwenden")
  ],
  falaq:[
    q("قُلْ","Wie wird dieses Wort gelesen?",["qul","qūl","qala"],"qul","Wort lesen"),
    q("أَعُوذُ","Welcher lange Vokal steht in der Wortmitte?",["ū","ā","ī"],"ū","Madd finden"),
    q("بِرَبِّ","Welcher Buchstabe trägt Shadda?",["Bā’","Rā’","Beide"],"Bā’","Vers lesen"),
    q("ٱلْفَلَقِ","Welcher Buchstabe trägt Sukūn?",["Lām","Fā’","Qāf"],"Lām","Vers lesen"),
    q("شَرِّ","Welcher Buchstabe wird verdoppelt?",["Rā’","Shīn","Beide"],"Rā’","Vers lesen"),
    q("مَا","Welcher lange Vokal steht hier?",["ā","ī","ū"],"ā","Madd finden"),
    q("غَاسِقٍ","Welche Tanwīn-Endung steht am Wortende?",["-in","-un","-an"],"-in","Tanwīn lesen"),
    q("ٱلنَّفَّـٰثَـٰتِ","Welche Buchstaben tragen Shadda?",["Nūn und Fā’","Fā’ und Thā’","Nūn und Tā’"],"Nūn und Fā’","Vers lesen"),
    q("ٱلْعُقَدِ","Welcher Buchstabe trägt Sukūn?",["Lām","ʿAyn","Qāf"],"Lām","Vers lesen"),
    q("حَاسِدٍ","Welche Endung liest du beim Verbinden?",["-in","-an","-un"],"-in","Tanwīn lesen")
  ],
  nas:[
    q("قُلْ","Welcher Buchstabe trägt Sukūn?",["Lām","Qāf","Beide"],"Lām","Vers lesen"),
    q("أَعُوذُ","Wie wird der lange Vokal gelesen?",["ū","ā","ī"],"ū","Madd finden"),
    q("ٱلنَّاسِ","Welcher Buchstabe trägt Shadda?",["Nūn","Sīn","Lām"],"Nūn","Vers lesen"),
    q("مَلِكِ","Wie wird dieses Wort gelesen?",["maliki","māliki","mulki"],"maliki","Wort lesen"),
    q("إِلَـٰهِ","Welcher lange Vokal steht nach Lām?",["ā","ī","ū"],"ā","Madd finden"),
    q("ٱلْوَسْوَاسِ","Welcher Buchstabe zwischen den beiden Wāw trägt Sukūn?",["Sīn","Wāw","Lām"],"Sīn","Vers lesen"),
    q("ٱلْخَنَّاسِ","Welcher Buchstabe trägt Shadda?",["Nūn","Khā’","Sīn"],"Nūn","Vers lesen"),
    q("صُدُورِ","Welcher lange Vokal ist enthalten?",["ū","ā","ī"],"ū","Madd finden"),
    q("ٱلْجِنَّةِ","Welcher Buchstabe trägt Shadda?",["Nūn","Jīm","Tā’ marbūṭa"],"Nūn","Vers lesen"),
    q("وَٱلنَّاسِ","Wie wird Hamzat al-Waṣl nach Wāw behandelt?",["Ohne neuen Hamza-Ansatz verbinden","Mit langer Pause lesen","Als langes ā lesen"],"Ohne neuen Hamza-Ansatz verbinden","Verbunden lesen")
  ]
});

Object.assign(TARGETED_QUESTION_BANK,{
  hamza:[
    q("ء","Wie heißt dieses Zeichen?",["Hamza","Sukūn","Shadda"],"Hamza","Zeichen erkennen"),
    q("أ","Wo steht Hamza?",["Über Alif","Unter Alif","Auf Wāw"],"Über Alif","Träger erkennen"),
    q("إ","Wo steht Hamza?",["Unter Alif","Über Alif","Auf Yā’"],"Unter Alif","Träger erkennen"),
    q("ؤ","Welcher Buchstabe trägt Hamza?",["Wāw","Alif","Yā’"],"Wāw","Träger erkennen"),
    q("ئ","Welcher Buchstabe trägt Hamza?",["Yā’-Träger","Wāw","Alif"],"Yā’-Träger","Träger erkennen"),
    q("أَ","Wie liest du diese Silbe?",["ʾa","ʾi","ʾu"],"ʾa","Silbe lesen"),
    q("إِ","Wie liest du diese Silbe?",["ʾi","ʾa","ʾu"],"ʾi","Silbe lesen"),
    q("أُ","Wie liest du diese Silbe?",["ʾu","ʾa","ʾi"],"ʾu","Silbe lesen"),
    q("أَحَدٌ","Mit welchem Laut beginnt das Wort?",["Hamza mit Fatḥa","ʿAyn mit Fatḥa","Alif-Madd"],"Hamza mit Fatḥa","Qurʾān-Wort lesen"),
    q("إِيَّاكَ","Welches Zeichen steht am Wortanfang?",["Hamza unter Alif","Hamzat al-Waṣl","Alif maqṣūra"],"Hamza unter Alif","Qurʾān-Wort lesen")
  ],
  "hamzat-wasl":[
    q("ٱ","Wie heißt dieses Zeichen?",["Hamzat al-Waṣl","Hamzat al-Qaṭʿ","Alif maqṣūra"],"Hamzat al-Waṣl","Zeichen erkennen"),
    q("ٱلْحَمْدُ","Was geschieht mit Hamzat al-Waṣl, wenn du hier beginnst?",["Es wird gesprochen","Es wird ausgelassen","Es wird verlängert"],"Es wird gesprochen","Am Anfang lesen"),
    q("بِسْمِ ٱللَّهِ","Was geschieht beim Verbinden vor ٱللَّهِ?",["Kein neuer Hamza-Ansatz","Eine lange Pause","Ein n-Laut wird ergänzt"],"Kein neuer Hamza-Ansatz","Verbunden lesen"),
    q("وَٱلْفَلَقِ","Wird nach وَ ein neuer Hamza-Ansatz gesprochen?",["Nein","Ja","Nur bei Sukūn"],"Nein","Verbunden lesen"),
    q("ٱلنَّاسِ","Welches Zeichen steht am Wortanfang?",["Hamzat al-Waṣl","Hamza unter Alif","Alif maqṣūra"],"Hamzat al-Waṣl","Im Wort finden"),
    q("ٱلرَّحْمَـٰنِ","Welcher Teil wird beim Beginn hörbar angesetzt?",["Hamzat al-Waṣl","Tanwīn","Tā’ marbūṭa"],"Hamzat al-Waṣl","Am Anfang lesen"),
    q("مِنَ ٱلْجِنَّةِ","Wie liest du den Übergang?",["Ohne neuen Hamza-Ansatz","Mit vollständiger Pause","Mit langem ā"],"Ohne neuen Hamza-Ansatz","Verbunden lesen"),
    q("أَ / ٱ","Welches Zeichen bleibt auch beim Verbinden als Hamza hörbar?",["أ","ٱ","Beide fallen aus"],"أ","Unterscheiden"),
    q("ٱهْدِنَا","Was gilt, wenn du mit diesem Wort beginnst?",["Hamzat al-Waṣl wird gesprochen","Alif bleibt stumm","Das Wort beginnt mit Madd"],"Hamzat al-Waṣl wird gesprochen","Am Anfang lesen"),
    q("وَٱلنَّاسِ","Welcher Buchstabe führt direkt in ٱلنَّاسِ hinein?",["Wāw","Alif","Nūn"],"Wāw","Verbunden lesen")
  ],
  "ta-marbuta":[
    q("ة","Wie heißt diese Endform?",["Tā’ marbūṭa","Hā’","Alif maqṣūra"],"Tā’ marbūṭa","Zeichen erkennen"),
    q("ـة","Wo kann diese Form stehen?",["Am Wortende","Am Wortanfang","In der Wortmitte"],"Am Wortende","Position erkennen"),
    q("رَحْمَةٌ","Welcher Buchstabe steht am Wortende?",["Tā’ marbūṭa","Hā’","Tā’ offen"],"Tā’ marbūṭa","Im Wort finden"),
    q("سُورَةٌ","Welcher Buchstabe steht am Wortende?",["Tā’ marbūṭa","Hā’","Alif maqṣūra"],"Tā’ marbūṭa","Im Wort finden"),
    q("رَحْمَةٌ","Welcher Laut wird beim verbundenen Lesen der Endung hörbar?",["t","h","y"],"t","Verbunden lesen"),
    q("رَحْمَةْ","Wie klingt Tā’ marbūṭa beim Anhalten gewöhnlich?",["wie h","wie t mit Fatḥa","wie langes ā"],"wie h","Beim وقف lesen"),
    q("ة / ه","Welche Form ist Tā’ marbūṭa?",["ة","ه","Beide"],"ة","Unterscheiden"),
    q("جَنَّةٌ","Welches Zeichen beendet das Wort?",["Tā’ marbūṭa","Hā’","Tā’ offen"],"Tā’ marbūṭa","Qurʾān-Wort lesen"),
    q("ٱلْجِنَّةِ","Welche Endform trägt Kasra?",["Tā’ marbūṭa","Nūn","Hā’"],"Tā’ marbūṭa","Im Wort finden"),
    q("بَيْت / رَحْمَة","In welchem Wort steht Tā’ marbūṭa?",["رَحْمَة","بَيْت","In beiden"],"رَحْمَة","Unterscheiden")
  ],
  "alif-maqsura":[
    q("ى","Wie heißt diese Endform?",["Alif maqṣūra","Yā’","Tā’ marbūṭa"],"Alif maqṣūra","Zeichen erkennen"),
    q("هُدَى","Wie wird der letzte Laut gesprochen?",["langes ā","y","kurzes i"],"langes ā","Wortende lesen"),
    q("عَلَى","Wie wird dieses Wort gelesen?",["ʿalā","ʿalay","ʿali"],"ʿalā","Wort lesen"),
    q("مُوسَى","Wie wird dieses Wort gelesen?",["Mūsā","Mūsy","Mūsi"],"Mūsā","Wort lesen"),
    q("ى / ي","Welche Form ist Alif maqṣūra?",["ى","ي","Beide"],"ى","Unterscheiden"),
    q("هُدَى","Wo steht Alif maqṣūra?",["Am Wortende","Am Wortanfang","In der Mitte"],"Am Wortende","Position erkennen"),
    q("فِي / عَلَى","Welches Wort endet mit Alif maqṣūra?",["عَلَى","فِي","Beide"],"عَلَى","Unterscheiden"),
    q("مُوسَى","Welche Buchstabenform steht ganz links?",["Alif maqṣūra","Yā’ mit Punkten","Alif normal"],"Alif maqṣūra","Im Wort finden"),
    q("ى","Trägt Alif maqṣūra zwei Punkte?",["Nein","Ja","Nur im Wortinneren"],"Nein","Unterscheiden"),
    q("هُدَى / هُدِيَ","In welchem Wort endet der Laut mit langem ā?",["هُدَى","هُدِيَ","In beiden"],"هُدَى","Wortende lesen")
  ],
  waqf:[
    q("م","Was bedeutet dieses Waqf-Zeichen?",["Anhalten","Nicht anhalten","Nur leiser lesen"],"Anhalten","Pausenzeichen"),
    q("لا","Was bedeutet dieses Waqf-Zeichen?",["Hier nicht anhalten","Unbedingt anhalten","Vers wiederholen"],"Hier nicht anhalten","Pausenzeichen"),
    q("ج","Was erlaubt dieses Waqf-Zeichen?",["Pause oder Fortsetzung","Nur Pause","Keine Pause"],"Pause oder Fortsetzung","Pausenzeichen"),
    q("م","Welche Handlung passt?",["Atem holen und sinnvoll anhalten","Ohne Pause weiterlesen","Wort auslassen"],"Atem holen und sinnvoll anhalten","Anwenden"),
    q("لا","Welche Handlung passt?",["Nach Möglichkeit weiterlesen","Sofort beenden","Zum Versanfang springen"],"Nach Möglichkeit weiterlesen","Anwenden"),
    q("ج","Welche Handlung passt?",["Beides ist möglich","Nur verbinden","Nur zurückgehen"],"Beides ist möglich","Anwenden"),
    q("م لا ج","Welches Zeichen zeigt einen notwendigen Halt?",["م","لا","ج"],"م","Unterscheiden"),
    q("م لا ج","Welches Zeichen rät vom Halt ab?",["لا","م","ج"],"لا","Unterscheiden"),
    q("م لا ج","Bei welchem Zeichen sind Pause und Fortsetzung erlaubt?",["ج","م","لا"],"ج","Unterscheiden"),
    q("ج","Was musst du trotz des Zeichens beachten?",["Sinn und Atemführung","Punktzahl des Buchstabens","Schreibrichtung"],"Sinn und Atemführung","Leseverständnis")
  ],
  makharij:[
    q("ء ه ع ح غ خ","Zu welcher Hauptregion gehören diese Buchstaben?",["Rachen","Lippen","Nur Nasenraum"],"Rachen","Artikulationsort"),
    q("ب م و","Welche Körperregion ist besonders beteiligt?",["Lippen","Rachen","Zähne allein"],"Lippen","Artikulationsort"),
    q("ع ح","Wo werden diese Laute gebildet?",["Im Rachen","An beiden Lippen","Nur an der Nasenspitze"],"Im Rachen","Artikulationsort"),
    q("ف","Woran sind die Lippen bei Fā’ beteiligt?",["Unterlippe und obere Schneidezähne","Beide Lippen geschlossen","Keine Lippenbeteiligung"],"Unterlippe und obere Schneidezähne","Artikulationsort"),
    q("ب","Wie wird Bā’ gebildet?",["Mit beiden Lippen","Tief im Rachen","Mit der Zungenmitte allein"],"Mit beiden Lippen","Artikulationsort"),
    q("م","Wie wird Mīm gebildet?",["Mit beiden Lippen","Mit der Zungenspitze an den Zähnen","Im tiefen Rachen"],"Mit beiden Lippen","Artikulationsort"),
    q("ق","Welcher Bereich ist besonders beteiligt?",["Hinterer Zungenbereich","Beide Lippen","Vorderzähne allein"],"Hinterer Zungenbereich","Artikulationsort"),
    q("ل","Welches Organ ist zentral für die Bildung?",["Zunge","Nur Lippen","Nur Nasenraum"],"Zunge","Artikulationsort"),
    q("ن","Welcher zusätzliche Klangraum begleitet Nūn?",["Nasenraum","Hohlraum allein","Lippenraum"],"Nasenraum","Artikulationsort"),
    q("ح / ه","Warum ist Hörkorrektur durch eine Lehrperson wichtig?",["Die Laute entstehen an unterschiedlichen Stellen","Beide Zeichen sind gleich","Nur die Schriftgröße unterscheidet sie"],"Die Laute entstehen an unterschiedlichen Stellen","Aussprache prüfen")
  ],
  qalqala:[
    q("ق ط ب ج د","Welche Gruppe siehst du?",["Qalqala-Buchstaben","Madd-Buchstaben","Nicht-Verbinder"],"Qalqala-Buchstaben","Gruppe erkennen"),
    q("دْ","Wann wird Qalqala hörbar?",["Wenn Dāl Sukūn trägt","Bei jeder Fatḥa","Nur bei Tanwīn"],"Wenn Dāl Sukūn trägt","Regel anwenden"),
    q("أَحَدْ","Welcher Buchstabe erhält beim وقف Qalqala?",["Dāl","Ḥā’","Alif"],"Dāl","Im Wort finden"),
    q("يَلِدْ","Welcher Buchstabe trägt Qalqala?",["Dāl","Lām","Yā’"],"Dāl","Im Wort finden"),
    q("خَلَقْ","Welcher Buchstabe erhält beim وقف Qalqala?",["Qāf","Lām","Khā’"],"Qāf","Im Wort finden"),
    q("قُلْ","Gibt es hier Qalqala?",["Nein","Ja, auf Qāf","Ja, auf Lām"],"Nein","Unterscheiden"),
    q("بْ","Welche Wirkung ist richtig?",["Kurzer Widerhall ohne vollen Vokal","Langes ā","Vollständiges ba"],"Kurzer Widerhall ohne vollen Vokal","Regel anwenden"),
    q("طْ","Was darf nicht ergänzt werden?",["Ein voller a-, i- oder u-Vokal","Ein kurzer Widerhall","Der Konsonant Ṭā’"],"Ein voller a-, i- oder u-Vokal","Fehler vermeiden"),
    q("مْ / دْ","Welche Form kann Qalqala erhalten?",["دْ","مْ","Beide"],"دْ","Unterscheiden"),
    q("قْ طْ بْ جْ دْ","Was haben alle Formen gemeinsam?",["Qalqala-Buchstabe mit Sukūn","Langer Vokal","Tanwīn-Endung"],"Qalqala-Buchstabe mit Sukūn","Regel erkennen")
  ],
  "nun-rules":[
    q("نْ + ب","Welche Regel gilt?",["Iqlāb","Iẓhār","Idghām"],"Iqlāb","Regel bestimmen"),
    q("مِنۢ بَعْدِ","Welche Regel wird angewendet?",["Iqlāb","Ikhfā’","Madd"],"Iqlāb","Qurʾān-Beispiel"),
    q("نْ + ه","Welche Regel gilt?",["Iẓhār","Iqlāb","Idghām"],"Iẓhār","Regel bestimmen"),
    q("مِنْ هَادٍ","Welche Regel wird angewendet?",["Iẓhār","Iqlāb","Ikhfā’"],"Iẓhār","Qurʾān-Beispiel"),
    q("نْ + ي","Welche Regelgruppe gilt?",["Idghām","Iqlāb","Qalqala"],"Idghām","Regel bestimmen"),
    q("مَنْ يَعْمَلْ","Welche Regel folgt auf Nūn sākin vor Yā’?",["Idghām","Iẓhār","Iqlāb"],"Idghām","Qurʾān-Beispiel"),
    q("نْ + ت","Welche Regel gilt?",["Ikhfā’","Iqlāb","Madd"],"Ikhfā’","Regel bestimmen"),
    q("مِنْ تَحْتِهَا","Welche Regel wird angewendet?",["Ikhfā’","Iẓhār","Idghām"],"Ikhfā’","Qurʾān-Beispiel"),
    q("نْ + ب","In welchen Klang wird Nūn bei Iqlāb gewandelt?",["m-Klang mit Ghunnah","langes ā","klarer l-Laut"],"m-Klang mit Ghunnah","Regel anwenden"),
    q("نْ / ٌ ٍ ً","Was entscheidet über die Regel?",["Der folgende Buchstabe","Die Schriftgröße","Die Wortlänge"],"Der folgende Buchstabe","Regel anwenden")
  ],
  "mim-rules":[
    q("مْ + م","Welche Regel gilt?",["Idghām shafawī","Ikhfā’ shafawī","Iẓhār shafawī"],"Idghām shafawī","Regel bestimmen"),
    q("هُم مَّا","Welche Regel wird angewendet?",["Idghām shafawī","Ikhfā’ shafawī","Qalqala"],"Idghām shafawī","Beispiel anwenden"),
    q("مْ + ب","Welche Regel gilt?",["Ikhfā’ shafawī","Idghām shafawī","Iẓhār shafawī"],"Ikhfā’ shafawī","Regel bestimmen"),
    q("تَرْمِيهِمْ بِحِجَارَةٍ","Welche Regel wird angewendet?",["Ikhfā’ shafawī","Idghām shafawī","Madd"],"Ikhfā’ shafawī","Qurʾān-Beispiel"),
    q("مْ + ف","Welche Regel gilt?",["Iẓhār shafawī","Ikhfā’ shafawī","Idghām shafawī"],"Iẓhār shafawī","Regel bestimmen"),
    q("هُمْ فِيهَا","Welche Regel wird angewendet?",["Iẓhār shafawī","Ikhfā’ shafawī","Idghām shafawī"],"Iẓhār shafawī","Beispiel anwenden"),
    q("مْ + م","Was geschieht mit den beiden Mīm-Lauten?",["Sie verschmelzen mit Ghunnah","Sie werden zu Bā’","Sie werden langes ā"],"Sie verschmelzen mit Ghunnah","Regel anwenden"),
    q("مْ + ب","Wie wird Mīm gelesen?",["Verborgen an den Lippen mit Ghunnah","Vollständig ausgelassen","Als Nūn"],"Verborgen an den Lippen mit Ghunnah","Regel anwenden"),
    q("مْ + ل","Welche Regel gilt vor Lām?",["Iẓhār shafawī","Ikhfā’ shafawī","Idghām shafawī"],"Iẓhār shafawī","Regel bestimmen"),
    q("مْ","Was entscheidet über die Regel?",["Der folgende Buchstabe","Der vorherige lange Vokal","Die Versnummer"],"Der folgende Buchstabe","Regel anwenden")
  ],
  madd:[
    q("َ + ا","Welcher lange Vokal entsteht?",["ā","ī","ū"],"ā","Madd bilden"),
    q("ِ + يْ","Welcher lange Vokal entsteht?",["ī","ā","ū"],"ī","Madd bilden"),
    q("ُ + وْ","Welcher lange Vokal entsteht?",["ū","ā","ī"],"ū","Madd bilden"),
    q("قَالَ","Welcher Madd-Laut steht im Wort?",["ā","ī","ū"],"ā","Im Wort finden"),
    q("قِيلَ","Welcher Madd-Laut steht im Wort?",["ī","ā","ū"],"ī","Im Wort finden"),
    q("يَقُولُ","Welcher Madd-Laut steht im Wort?",["ū","ā","ī"],"ū","Im Wort finden"),
    q("مَدّ طبيعي","Wie lange dauert der natürliche Madd?",["Zwei Zählzeiten","Eine Zählzeit","Immer sechs Zählzeiten"],"Zwei Zählzeiten","Länge anwenden"),
    q("بَ / بَا","Welche Silbe wird zwei Zählzeiten gehalten?",["بَا","بَ","Beide gleich"],"بَا","Unterscheiden"),
    q("فِي","Welcher Buchstabe trägt den langen ī-Laut?",["Yā’","Fā’","Kasra allein"],"Yā’","Im Wort finden"),
    q("نُور","Welcher Buchstabe trägt den langen ū-Laut?",["Wāw","Nūn","Rā’"],"Wāw","Im Wort finden")
  ]
});

Object.entries(TARGETED_QUESTION_BANK).forEach(([id,questions])=>{
  LESSONS[id].questions=questions;
});

Object.values(LESSONS).forEach(lesson=>{
  const quiz=lesson.slides.find(slide=>slide.type==="quiz");
  if(quiz){quiz.title="Erkennen, lesen und anwenden";quiz.body="Bearbeite zehn praktische Aufgaben zum Lernziel dieser Lektion.";}
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
