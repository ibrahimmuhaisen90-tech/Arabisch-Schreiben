const ALPHABET = [
  { id:"alif",letter:"ا",name:"Alif",sound:"ā / a",forms:["ا","ـا","—","—"],joinsLeft:false,family:"Grundform",note:"Ein gerader Grundstrich. Verbindet sich nicht mit dem folgenden Buchstaben links." },
  { id:"ba",letter:"ب",name:"Bā’",sound:"b",forms:["ب","ـب","ـبـ","بـ"],joinsLeft:true,family:"Punktfamilie",note:"Ein Punkt unter der Grundform." },
  { id:"ta",letter:"ت",name:"Tā’",sound:"t",forms:["ت","ـت","ـتـ","تـ"],joinsLeft:true,family:"Punktfamilie",note:"Zwei Punkte über der gleichen Grundform." },
  { id:"tha",letter:"ث",name:"Thā’",sound:"th wie engl. think",forms:["ث","ـث","ـثـ","ثـ"],joinsLeft:true,family:"Punktfamilie",note:"Drei Punkte über der gleichen Grundform." },
  { id:"jim",letter:"ج",name:"Jīm",sound:"dsch",forms:["ج","ـج","ـجـ","جـ"],joinsLeft:true,family:"Schalenform",note:"Ein Punkt in der Schale." },
  { id:"ha",letter:"ح",name:"Ḥā’",sound:"tiefes, gehauchtes ḥ",forms:["ح","ـح","ـحـ","حـ"],joinsLeft:true,family:"Schalenform",note:"Ohne Punkt. Ein tiefer Hauchlaut aus dem Rachen." },
  { id:"kha",letter:"خ",name:"Khā’",sound:"ch wie in Bach",forms:["خ","ـخ","ـخـ","خـ"],joinsLeft:true,family:"Schalenform",note:"Ein Punkt über der Schalenform." },
  { id:"dal",letter:"د",name:"Dāl",sound:"d",forms:["د","ـد","—","—"],joinsLeft:false,family:"Bogenform",note:"Verbindet sich nicht mit dem folgenden Buchstaben links." },
  { id:"dhal",letter:"ذ",name:"Dhāl",sound:"th wie engl. this",forms:["ذ","ـذ","—","—"],joinsLeft:false,family:"Bogenform",note:"Dāl mit einem Punkt darüber." },
  { id:"ra",letter:"ر",name:"Rā’",sound:"gerolltes r",forms:["ر","ـر","—","—"],joinsLeft:false,family:"Bogenform",note:"Verbindet sich nicht mit dem folgenden Buchstaben links." },
  { id:"zay",letter:"ز",name:"Zāy",sound:"stimmhaftes s",forms:["ز","ـز","—","—"],joinsLeft:false,family:"Bogenform",note:"Rā’ mit einem Punkt darüber." },
  { id:"sin",letter:"س",name:"Sīn",sound:"s",forms:["س","ـس","ـسـ","سـ"],joinsLeft:true,family:"Zahnform",note:"Drei kleine Zähne ohne Punkt." },
  { id:"shin",letter:"ش",name:"Shīn",sound:"sch",forms:["ش","ـش","ـشـ","شـ"],joinsLeft:true,family:"Zahnform",note:"Sīn mit drei Punkten darüber." },
  { id:"sad",letter:"ص",name:"Ṣād",sound:"dunkles s",forms:["ص","ـص","ـصـ","صـ"],joinsLeft:true,family:"Breitform",note:"Ein voller, emphatischer S-Laut." },
  { id:"dad",letter:"ض",name:"Ḍād",sound:"dunkles d",forms:["ض","ـض","ـضـ","ضـ"],joinsLeft:true,family:"Breitform",note:"Ṣād mit einem Punkt darüber." },
  { id:"tta",letter:"ط",name:"Ṭā’",sound:"dunkles t",forms:["ط","ـط","ـطـ","طـ"],joinsLeft:true,family:"Hochform",note:"Ein voller, emphatischer T-Laut." },
  { id:"zza",letter:"ظ",name:"Ẓā’",sound:"dunkles dh",forms:["ظ","ـظ","ـظـ","ظـ"],joinsLeft:true,family:"Hochform",note:"Ṭā’ mit einem Punkt darüber." },
  { id:"ayn",letter:"ع",name:"ʿAyn",sound:"tiefer Rachenlaut",forms:["ع","ـع","ـعـ","عـ"],joinsLeft:true,family:"Rachenform",note:"Ein charakteristischer Laut aus der Mitte des Rachens." },
  { id:"ghayn",letter:"غ",name:"Ghayn",sound:"r/ch aus dem Rachen",forms:["غ","ـغ","ـغـ","غـ"],joinsLeft:true,family:"Rachenform",note:"ʿAyn mit einem Punkt darüber." },
  { id:"fa",letter:"ف",name:"Fā’",sound:"f",forms:["ف","ـف","ـفـ","فـ"],joinsLeft:true,family:"Kopfform",note:"Ein Punkt über der runden Kopfform." },
  { id:"qaf",letter:"ق",name:"Qāf",sound:"tiefes q",forms:["ق","ـق","ـقـ","قـ"],joinsLeft:true,family:"Kopfform",note:"Zwei Punkte über der Kopfform; der Laut entsteht weit hinten." },
  { id:"kaf",letter:"ك",name:"Kāf",sound:"k",forms:["ك","ـك","ـكـ","كـ"],joinsLeft:true,family:"Einzelform",note:"Ein klarer K-Laut." },
  { id:"lam",letter:"ل",name:"Lām",sound:"l",forms:["ل","ـل","ـلـ","لـ"],joinsLeft:true,family:"Hochform",note:"Ein hoher Strich mit geschwungenem Fuß." },
  { id:"mim",letter:"م",name:"Mīm",sound:"m",forms:["م","ـم","ـمـ","مـ"],joinsLeft:true,family:"Rundform",note:"Ein geschlossener M-Laut über beide Lippen." },
  { id:"nun",letter:"ن",name:"Nūn",sound:"n",forms:["ن","ـن","ـنـ","نـ"],joinsLeft:true,family:"Punktfamilie",note:"Ein Punkt über der Grundform." },
  { id:"ha2",letter:"ه",name:"Hā’",sound:"leichtes h",forms:["ه","ـه","ـهـ","هـ"],joinsLeft:true,family:"Rundform",note:"Ein leichter Hauchlaut; nicht mit Ḥā’ verwechseln." },
  { id:"waw",letter:"و",name:"Wāw",sound:"w / ū",forms:["و","ـو","—","—"],joinsLeft:false,family:"Bogenform",note:"Kann Konsonant w oder Träger eines langen ū sein." },
  { id:"ya",letter:"ي",name:"Yā’",sound:"y / ī",forms:["ي","ـي","ـيـ","يـ"],joinsLeft:true,family:"Punktfamilie",note:"Kann Konsonant y oder Träger eines langen ī sein." }
];

const WORD_PRACTICE = [
  {word:"بَاب",plain:"باب",reading:"bāb",meaning:"Tür",letters:["ba","alif","ba"],choices:["bāb","bayt","nūr"]},
  {word:"حَبّ",plain:"حب",reading:"ḥabb",meaning:"Korn · Samen",letters:["ha","ba"],choices:["ḥabb","khayr","qalam"]},
  {word:"دَار",plain:"دار",reading:"dār",meaning:"Haus · Wohnstätte",letters:["dal","alif","ra"],choices:["dār","nās","fī"]},
  {word:"خَبَر",plain:"خبر",reading:"khabar",meaning:"Nachricht",letters:["kha","ba","ra"],choices:["khabar","ṣabr","malik"]},
  {word:"نُور",plain:"نور",reading:"nūr",meaning:"Licht",letters:["nun","waw","ra"],choices:["nūr","bāb","ʿilm"]},
  {word:"قَلَم",plain:"قلم",reading:"qalam",meaning:"Stift",letters:["qaf","lam","mim"],choices:["qalam","qul","falāq"]},
  {word:"كِتَاب",plain:"كتاب",reading:"kitāb",meaning:"Buch",letters:["kaf","ta","alif","ba"],choices:["kitāb","khabar","dār"]},
  {word:"رَبّ",plain:"رب",reading:"rabb",meaning:"Herr · Erhalter",letters:["ra","ba"],choices:["rabb","bāb","min"]},
  {word:"مَلِك",plain:"ملك",reading:"malik",meaning:"König",letters:["mim","lam","kaf"],choices:["malik","qalam","nās"]},
  {word:"نَاس",plain:"ناس",reading:"nās",meaning:"Menschen",letters:["nun","alif","sin"],choices:["nās","nūr","dār"]},
  {word:"قُلْ",plain:"قل",reading:"qul",meaning:"Sprich!",letters:["qaf","lam"],choices:["qul","fī","min"]},
  {word:"مِنْ",plain:"من",reading:"min",meaning:"von · aus",letters:["mim","nun"],choices:["min","malik","ṣabr"]},
  {word:"فِي",plain:"في",reading:"fī",meaning:"in",letters:["fa","ya"],choices:["fī","qul","nūr"]},
  {word:"عِلْم",plain:"علم",reading:"ʿilm",meaning:"Wissen",letters:["ayn","lam","mim"],choices:["ʿilm","malik","qalam"]},
  {word:"صَبْر",plain:"صبر",reading:"ṣabr",meaning:"Geduld",letters:["sad","ba","ra"],choices:["ṣabr","khabar","rabb"]},
  {word:"فَلَق",plain:"فلق",reading:"falaq",meaning:"Morgendämmerung",letters:["fa","lam","qaf"],choices:["falaq","qalam","fī"]}
];

const COURSE_MODULES = [
  { id:"script",number:"01",title:"Schriftbasis",description:"Alle Buchstaben sicher erkennen und unterscheiden",tone:"green",lessons:[
    {id:"rtl-alif",title:"Leserichtung & Alif",meta:"8 Min. · Schreiben",available:true},
    {id:"dots",title:"Bā’, Tā’ und Thā’",meta:"10 Min. · Erkennen",available:true},
    {id:"bowls",title:"Jīm, Ḥā’ und Khā’",meta:"10 Min. · Laute",available:true},
    {id:"curves",title:"Dāl bis Zāy",meta:"12 Min. · 4 Buchstaben"},
    {id:"teeth",title:"Sīn bis Ḍād",meta:"14 Min. · 4 Buchstaben"},
    {id:"throat",title:"Ṭā’ bis Ghayn",meta:"16 Min. · Rachenlaute"},
    {id:"heads",title:"Fā’ bis Lām",meta:"14 Min. · 4 Buchstaben"},
    {id:"finals",title:"Mīm bis Yā’",meta:"16 Min. · Abschluss"}]},
  {id:"connections",number:"02",title:"Buchstaben verbinden",description:"Formen am Anfang, in der Mitte und am Ende",tone:"blue",lessons:[{title:"Formen im Wort",meta:"Anfang · Mitte · Ende"},{title:"Nicht-Verbinder",meta:"6 besondere Buchstaben"},{title:"Wörter zerlegen",meta:"Formen sicher erkennen"},{title:"Verbindungen lesen",meta:"Erste Wortbilder"}]},
  {id:"vowels",number:"03",title:"Vokalzeichen",description:"Kurze und lange Vokale flüssig lesen",tone:"gold",lessons:[{title:"Fatḥa, Kasra, Ḍamma",meta:"Kurze Vokale"},{title:"Lange Vokale",meta:"ā · ī · ū"},{title:"Sukūn",meta:"Ohne Vokal"},{title:"Shadda",meta:"Verdopplung"},{title:"Tanwīn",meta:"Endungen"}]},
  {id:"reading",number:"04",title:"Leseregeln",description:"Typische Zeichen im Muṣḥaf verstehen",tone:"violet",lessons:[{title:"Hamza",meta:"Formen und Träger"},{title:"Hamzat al-Waṣl",meta:"Verbinden beim Lesen"},{title:"Tā’ marbūṭa",meta:"Endungen erkennen"},{title:"Alif maqṣūra",meta:"Besondere Endform"},{title:"Waqf-Zeichen",meta:"Pausenzeichen"}]},
  {id:"tajwid",number:"05",title:"Tajwīd-Grundlagen",description:"Behutsamer Einstieg in die korrekte Rezitation",tone:"rose",lessons:[{title:"Artikulationsorte",meta:"Makharij"},{title:"Qalqala",meta:"Echo-Laut"},{title:"Nūn sākin & Tanwīn",meta:"Grundregeln"},{title:"Mīm sākin",meta:"Grundregeln"},{title:"Madd",meta:"Dehnungsarten"}]},
  {id:"quran",number:"06",title:"Koranpraxis",description:"Begleitete Verse lesen und wiederholen",tone:"ink",lessons:[{title:"Al-Fātiḥa",meta:"Wort für Wort"},{title:"Al-Ikhlāṣ",meta:"Begleitete Lektüre"},{title:"Al-Falaq",meta:"Begleitete Lektüre"},{title:"An-Nās",meta:"Begleitete Lektüre"}]}
];

const LESSONS = {
  "rtl-alif": {title:"Leserichtung & Alif",eyebrow:"Lektion 1 · Schriftbasis",letters:["alif"],slides:[
    {type:"direction",title:"Arabisch liest du von rechts nach links",body:"Du beginnst am rechten Rand und bewegst deinen Blick nach links. Die Buchstaben eines Wortes folgen ebenfalls dieser Richtung."},
    {type:"letters",title:"Dein erster Buchstabe",body:"Alif ist ein gerader Grundstrich. In Verbindung mit Vokalzeichen oder anderen Buchstaben trägt er häufig einen langen a-Laut."},
    {type:"writing",title:"Schreibe Alif",body:"Ziehe mit Apple Pencil oder Finger einen ruhigen, geraden Strich von oben nach unten."}]},
  "dots": {title:"Bā’, Tā’ und Thā’",eyebrow:"Lektion 2 · Schriftbasis",letters:["ba","ta","tha"],slides:[
    {type:"letters",title:"Eine Form, drei Buchstaben",body:"Bā’, Tā’ und Thā’ haben dieselbe Grundform. Anzahl und Position der Punkte bestimmen den Buchstaben."},
    {type:"contrast",title:"Achte zuerst auf die Punkte",body:"Ein Punkt unten: Bā’. Zwei Punkte oben: Tā’. Drei Punkte oben: Thā’. Lies die Form erst, nachdem du die Punkte bewusst gezählt hast."},
    {type:"quiz",title:"Kannst du sie unterscheiden?",body:"Wähle jeweils den richtigen Namen."}],questions:[
      {glyph:"ب",prompt:"Welcher Buchstabe ist das?",options:["Bā’","Tā’","Thā’"],answer:"Bā’"},{glyph:"ث",prompt:"Welcher Buchstabe hat drei Punkte?",options:["Tā’","Thā’","Bā’"],answer:"Thā’"},{glyph:"ت",prompt:"Wähle den Namen dieser Form.",options:["Thā’","Bā’","Tā’"],answer:"Tā’"},{glyph:"ب",prompt:"Wo liegen die Punkte bei Bā’?",options:["Ein Punkt unten","Zwei Punkte oben","Drei Punkte oben"],answer:"Ein Punkt unten"}]},
  "bowls": {title:"Jīm, Ḥā’ und Khā’",eyebrow:"Lektion 3 · Schriftbasis",letters:["jim","ha","kha"],slides:[
    {type:"letters",title:"Die Schalenfamilie",body:"Diese drei Buchstaben teilen dieselbe Grundform. Der Punkt entscheidet; zugleich unterscheiden sich ihre Laute deutlich."},
    {type:"contrast",title:"Sehen und Artikulation trennen",body:"Jīm hat einen Punkt in der Schale. Ḥā’ bleibt ohne Punkt und wird tief gehaucht. Khā’ trägt einen Punkt oben und klingt wie ch in „Bach“."},
    {type:"quiz",title:"Formen sicher erkennen",body:"Ordne die Formen ihren Namen zu. Die Aussprache wird nach fachlicher Audioprüfung ergänzt."}],questions:[
      {glyph:"ح",prompt:"Welcher Buchstabe hat keinen Punkt?",options:["Jīm","Ḥā’","Khā’"],answer:"Ḥā’"},{glyph:"خ",prompt:"Welcher Buchstabe ist das?",options:["Khā’","Jīm","Ḥā’"],answer:"Khā’"},{glyph:"ج",prompt:"Wo liegt der Punkt bei Jīm?",options:["Über der Form","In der Schale","Kein Punkt"],answer:"In der Schale"},{glyph:"ح",prompt:"Wähle den Namen dieser Form.",options:["Ḥā’","Khā’","Jīm"],answer:"Ḥā’"}]}
};
