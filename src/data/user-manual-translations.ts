// Translations of the customized MIT-licensed manual by Jason Liu
// License: public/licenses/user-manual-MIT.txt
import { userManualMarkdown } from "@/data/user-manual";

export const manualLanguages = [
  { code: "en", name: "English", icon: "EN", direction: "ltr" },
  { code: "it", name: "Italian", icon: "IT", direction: "ltr" },
  { code: "de", name: "German", icon: "DE", direction: "ltr" },
  { code: "nl", name: "Dutch", icon: "NL", direction: "ltr" },
  { code: "fr", name: "French", icon: "FR", direction: "ltr" },
  { code: "es", name: "Spanish", icon: "ES", direction: "ltr" },
  { code: "fa", name: "Farsi", icon: "فا", direction: "rtl" },
  { code: "ar", name: "Arabic", icon: "ع", direction: "rtl" },
  { code: "tr", name: "Turkish", icon: "TR", direction: "ltr" },
] as const;

export type ManualLanguage = (typeof manualLanguages)[number]["code"];

export const manualTranslations: Record<ManualLanguage, string> = {
  en: userManualMarkdown,
  it: `# Manuale d’uso

Qualche consiglio per lavorare bene insieme Sto imparando a delegare di più, così posso dedicarmi al lavoro che fa davvero la differenza

---

## Cosa conta per me

- **Imparare e crescere sempre** - Imparare cose nuove è ciò che mi dà energia Mi piacerebbe che fosse lo stesso anche per il mio team
- **Muoversi in fretta, anche a costo di sbagliare** - Passa all’azione senza paura Se qualcosa non va, lo sistemiamo insieme dopo Non serve aspettare il mio via libera
- **Comunicazione asincrona** - Preferisco la comunicazione asincrona Quando mi scrivi, immagina che abbia circa 5 minuti per leggere e risponderti
- **Comunicazione diretta** - Se puoi, punta su sì/no o numeri Bastano poche righe Metti in evidenza le informazioni importanti
- **Prendersi la responsabilità** - Se un compito ti sembra difficile, forse non ti ho dato abbastanza dettagli Chiedimi pure tutto ciò che ti serve
- **Semplicità** - Non amo la complessità inutile Un diagramma di flusso con 12 elementi mi manda un po’ in tilt

---

## Cosa mi mette in difficoltà

- **Il silenzio** - Quando non ricevo aggiornamenti mi preoccupo un po’ Anche un “Ci sto lavorando” o un “Qui sono bloccato” mi aiutano tantissimo
- **Cambiare contesto** - Quando mi aggiorni, ricordami a che punto eravamo Probabilmente l’ho letto, ma potrei non ricordarlo
- **La mancanza di feedback** - Per me il feedback sincero è prezioso, anche quando è critico Dirmi cosa posso migliorare aiuta entrambi a crescere

---

## Come comunicare con me

**Meglio l’asincrono** Discord/Telegram o un SMS sono perfetti Poche righe ed elenchi puntati sono l’ideale

**Spesso sono in giro** Scrivi in modo che il messaggio si legga in un attimo Metti le informazioni principali all’inizio

**Fai domande precise** Se puoi, formulale in modo che si risponda con sì/no o con un numero “Come posso aiutarti?” funziona meglio di “Pensi che dovrei lavorare su X?”

**Aiutami a prepararmi alle riunioni** Mandami il materiale prima, così arrivo concentrato Dopo, un breve riepilogo con i prossimi passi è sempre utile

---

## Come scrivermi

Scrivimi pure su Discord/Telegram Se è urgente, mandami un SMS Messaggi brevi e senza link, grazie

**Qualche buona abitudine:**

- **Oggetti chiari** - Fai capire subito di cosa si tratta
    - Bene: “Urgente: la proposta per il cliente va approvata entro le 15”
    - Meno bene: “Domanda veloce”
- **Aiutami a decidere in fretta** - Proponi opzioni numerate
    - Bene: “Opzioni logo: 1 Blu 2 Verde 3 Rosso Quale preferisci? Se non ti sento entro sera, vado con la n° 1”
    - Meno bene: “Che colore usiamo?”
- **Segnala ciò che ha una scadenza** - Usa i prefissi [Urgente], [Con scadenza] o [Per info]
- **Usa le immagini** - Uno screenshot spiega le cose più in fretta del testo
    - Bene: “Nuovo layout della dashboard: [screenshot] Che ne dici?”
    - Meno bene: Una lunga descrizione delle modifiche al layout
- **Chiudi con un prossimo passo chiaro** - Cosa ti serve da me?
- **Vai dritto al punto** - Metti la richiesta all’inizio, così so subito cosa fare
- **Meglio chiedere scusa che permesso** - “Faccio così, dimmi se non va bene” funziona meglio di “Cosa ne pensi?”

---

## Come scelgo le priorità

- **Prima i clienti** - Cerchiamo di far avanzare sempre il lavoro, o di essere in attesa di un loro feedback
- **Il venerdì è per i progetti personali** - Se lavori a tempo pieno, il venerdì puoi dedicarlo ai tuoi progetti
- **Chiarisci presto** - Se qualcosa non è chiaro, chiedimelo subito Preferisco investire un po’ di tempo all’inizio
- **Fai sapere a chi stai aspettando** - “Aspetto che tu faccia X per poter consegnare Y entro questa data, altrimenti Z”

---

## Lavorare insieme

- **Fai tuoi i compiti** - Non serve aspettare la mia approvazione su ogni dettaglio Vai avanti, anche se ogni tanto si sbaglia
- **Tienimi aggiornato** - Il silenzio crea tensione, anche un piccolo aggiornamento aiuta Se ogni giorno ci si sposta dell’1%, a fine settimana si è completamente fuori rotta
- **Dimmi cosa pensi davvero** - Raccontami cosa non funziona Il tuo feedback mi aiuta a crescere
- **Dopo le riunioni, fai un riepilogo** - Prossimi passi chiari e cosa richiede un feedback

---

## Il mio modo di guidare il team

Sono un manager alle prime armi e mi piace lasciare autonomia Se il team sbaglia, la responsabilità me la prendo io: è un’occasione per imparare a essere un leader migliore
`,
  de: `# Benutzerhandbuch

So arbeiten wir gut zusammen Ich lerne gerade, mehr abzugeben, damit ich mich auf die Arbeit konzentrieren kann, die wirklich etwas bewegt

---

## Was mir wichtig ist

- **Immer weiter lernen und wachsen** - Neues zu lernen gibt mir Energie Ich freue mich, wenn mein Team das genauso sieht
- **Schnell loslegen, auch mal danebenliegen** - Leg einfach los Wenn etwas nicht passt, bügeln wir es später gemeinsam aus Du musst nicht auf mein Okay warten
- **Asynchrone Kommunikation** - Ich kommuniziere am liebsten asynchron Wenn du mir schreibst, geh davon aus, dass ich etwa 5 Minuten zum Lesen und Antworten habe
- **Klare Kommunikation** - Am liebsten Ja/Nein oder Zahlen Ein paar Zeilen reichen völlig Wichtiges gern gleich nach oben
- **Verantwortung übernehmen** - Wenn sich eine Aufgabe schwer anfühlt, habe ich dir wahrscheinlich zu wenig Details gegeben Frag mich ruhig nach allem, was du brauchst
- **Einfachheit** - Unnötige Komplexität mag ich gar nicht Bei einem Flussdiagramm mit 12 Kästchen steige ich ehrlich gesagt aus

---

## Was mir schwerfällt

- **Funkstille** - Wenn ich nichts höre, werde ich schnell unruhig Ein kurzes „Bin dran“ oder „Hier hänge ich gerade“ hilft mir schon sehr
- **Kontextwechsel** - Erinner mich bei Updates kurz daran, wo wir stehen Wahrscheinlich habe ich es gelesen, aber nicht mehr im Kopf
- **Fehlendes Feedback** - Ehrliches, auch kritisches Feedback ist mir wirklich wichtig Wenn du mir sagst, was besser laufen könnte, bringt uns das beide weiter

---

## Wie wir am besten kommunizieren

**Am liebsten asynchron** Discord/Telegram oder eine SMS sind perfekt Kurz und gern in Stichpunkten

**Ich bin oft unterwegs** Schreib so, dass man die Nachricht schnell überfliegen kann Das Wichtigste gehört an den Anfang

**Stell konkrete Fragen** Am besten so, dass ich mit Ja/Nein oder einer Zahl antworten kann „Wie kann ich helfen?“ funktioniert besser als „Meinst du, ich sollte an X arbeiten?“

**Hilf mir, mich auf Meetings vorzubereiten** Schick mir die Unterlagen vorab, dann bin ich gleich wieder im Thema Danach freue ich mich über eine kurze Zusammenfassung mit den nächsten Schritten

---

## Wie du mir schreibst

Schreib mir gern auf Discord/Telegram Wenn es dringend ist, schick mir eine SMS Bitte kurz und ohne Links

**Was gut funktioniert:**

- **Klare Betreffzeilen** - Man sollte sofort sehen, worum es geht
    - Gut: „Dringend: Kundenangebot muss bis 15 Uhr freigegeben werden“
    - Weniger gut: „Kurze Frage“
- **Schnelle Entscheidungen ermöglichen** - Gib nummerierte Optionen vor
    - Gut: „Logo-Optionen: 1 Blau 2 Grün 3 Rot Welche? Wenn ich bis heute Abend nichts höre, nehme ich Nr. 1“
    - Weniger gut: „Welche Farbe sollen wir nehmen?“
- **Zeitkritisches markieren** - Nutze Präfixe wie [Dringend], [Zeitkritisch] oder [Zur Info]
- **Zeig es mir** - Ein Screenshot sagt oft mehr als viele Worte
    - Gut: „Neues Dashboard-Layout: [Screenshot] Was meinst du?“
    - Weniger gut: Eine lange Beschreibung der Layout-Änderungen
- **Mit einem klaren nächsten Schritt enden** - Was brauchst du von mir?
- **Kurz halten** - Deine Bitte gleich nach oben, damit ich sofort weiß, was zu tun ist
- **Lieber um Verzeihung als um Erlaubnis bitten** - „Ich mache das so, sag Bescheid, falls es nicht passt“ ist besser als „Was hältst du davon?“

---

## Wie ich priorisiere

- **Kundenarbeit zuerst** - Wir halten die Dinge immer in Bewegung oder warten auf Feedback vom Kunden
- **Freitags Zeit für eigene Projekte** - Wenn du Vollzeit arbeitest, ist der Freitag gut für eigene Projekte
- **Früh nachfragen** - Wenn etwas unklar ist, frag am besten gleich Ich investiere lieber am Anfang etwas Zeit
- **Sag Bescheid, auf wen du wartest** - „Ich warte darauf, dass du X erledigst, damit ich Y bis zu diesem Datum liefern kann, sonst Z“

---

## Zusammenarbeit

- **Übernimm deine Aufgaben** - Du musst nicht bei jedem Detail auf mein Okay warten Leg los, auch wenn mal ein Fehler passiert
- **Halte mich auf dem Laufenden** - Funkstille sorgt für Stress, schon kleine Updates helfen Wer jeden Tag 1 % vom Kurs abkommt, ist am Ende der Woche komplett woanders
- **Sag mir ehrlich deine Meinung** - Erzähl mir, was nicht funktioniert Dein Feedback hilft mir zu wachsen
- **Nach Meetings kurz zusammenfassen** - Klare nächste Schritte und alles, wozu Feedback nötig ist

---

## Wie ich führe

Ich bin noch ein neuer Manager und lasse meinem Team gern viel Freiraum Wenn das Team einen Fehler macht, übernehme ich die Verantwortung und sehe es als Chance, eine bessere Führungskraft zu werden
`,
  nl: `# Gebruikershandleiding

Zo werken we fijn samen Ik leer om meer uit handen te geven, zodat ik me kan richten op het werk dat echt het verschil maakt

---

## Wat ik belangrijk vind

- **Blijven leren en groeien** - Ik krijg energie van steeds nieuwe dingen leren Het zou mooi zijn als mijn team dat ook zo voelt
- **Snel schakelen, ook als het eens misgaat** - Ga gewoon aan de slag Zit je ernaast, dan lossen we het later samen op Je hoeft niet op mijn akkoord te wachten
- **Asynchrone communicatie** - Ik communiceer het liefst asynchroon Als je me een bericht stuurt, ga er dan van uit dat ik zo’n 5 minuten heb om het te lezen en te reageren
- **Duidelijke communicatie** - Het liefst ja/nee of cijfers Een paar zinnen is genoeg Zet belangrijke informatie bovenaan
- **Eigenaarschap** - Voelt een taak lastig, dan heb ik je waarschijnlijk te weinig details gegeven Vraag gerust alles wat je nodig hebt
- **Eenvoud** - Ik houd niet van onnodige complexiteit Bij een stroomschema met 12 blokjes haak ik eerlijk gezegd af

---

## Waar ik moeite mee heb

- **Stilte** - Als ik niets hoor, word ik een beetje onrustig Een kort “Ik ben ermee bezig” of “Hier loop ik vast” helpt me al enorm
- **Van context wisselen** - Herinner me bij een update even waar we gebleven waren Ik heb het waarschijnlijk gelezen, maar weet het misschien niet meer
- **Gebrek aan feedback** - Eerlijke, ook kritische feedback vind ik echt waardevol Als je me vertelt wat beter kan, helpt dat ons allebei vooruit

---

## Hoe we het best communiceren

**Liefst asynchroon** Discord/Telegram of een sms werken perfect Kort en graag in opsommingstekens

**Ik ben vaak onderweg** Schrijf zo dat ik je bericht snel kan scannen Zet de belangrijkste info bovenaan

**Stel concrete vragen** Het liefst zo dat ik met ja/nee of een getal kan antwoorden “Hoe kan ik helpen?” werkt beter dan “Denk je dat ik aan X moet werken?”

**Help me me voor te bereiden op meetings** Stuur de stukken vooraf, dan zit ik er meteen weer in Achteraf is een korte samenvatting met de volgende stappen heel fijn

---

## Hoe je me een bericht stuurt

Stuur me gerust een bericht via Discord/Telegram Is het dringend, stuur dan een sms Graag kort en zonder links

**Wat goed werkt:**

- **Duidelijke onderwerpregels** - Laat meteen zien waar het over gaat
    - Goed: “Dringend: klantvoorstel moet vóór 15.00 uur worden goedgekeurd”
    - Minder goed: “Snelle vraag”
- **Maak snel beslissen makkelijk** - Geef genummerde opties
    - Goed: “Logo-opties: 1 Blauw 2 Groen 3 Rood Welke? Hoor ik vandaag niets, dan ga ik voor nr. 1”
    - Minder goed: “Welke kleur zullen we nemen?”
- **Markeer wat haast heeft** - Gebruik voorvoegsels als [Dringend], [Tijdgevoelig] of [Ter info]
- **Laat het zien** - Een screenshot zegt vaak meer dan veel woorden
    - Goed: “Nieuwe dashboardlayout: [screenshot] Wat vind je ervan?”
    - Minder goed: Een lange beschrijving van de layoutwijzigingen
- **Sluit af met een duidelijke volgende stap** - Wat heb je van mij nodig?
- **Houd het kort** - Zet je vraag bovenaan, zodat ik meteen weet wat er van me verwacht wordt
- **Liever achteraf sorry dan vooraf toestemming** - “Ik pak het zo aan, laat het weten als het niet klopt” werkt beter dan “Wat vind jij hiervan?”

---

## Hoe ik prioriteiten stel

- **Klantwerk eerst** - We houden het werk altijd in beweging, of we wachten op feedback van de klant
- **Vrijdag voor eigen projecten** - Werk je fulltime, dan is vrijdag een mooie dag voor je eigen projecten
- **Vraag het vroeg** - Is iets onduidelijk, vraag het dan meteen Ik steek liever aan het begin wat tijd erin
- **Laat weten op wie je wacht** - “Ik wacht op jou voor X, zodat ik Y vóór deze datum kan opleveren, anders Z”

---

## Samenwerken

- **Neem je taken in eigen hand** - Je hoeft niet bij elk detail op mijn akkoord te wachten Ga ervoor, ook als er eens iets misgaat
- **Houd me op de hoogte** - Stilte zorgt voor stress, en zelfs kleine updates helpen Wie elke dag 1% van koers raakt, zit aan het eind van de week helemaal ergens anders
- **Zeg eerlijk wat je denkt** - Vertel me wat niet werkt Jouw feedback helpt me groeien
- **Vat meetings even samen** - Duidelijke volgende stappen en alles waar feedback op nodig is

---

## Hoe ik leidinggeef

Ik ben een nieuwe manager en geef mijn team graag veel vrijheid Maakt het team een fout, dan neem ik daar de verantwoordelijkheid voor en zie ik het als een kans om een betere leider te worden
`,
  fr: `# Manuel d’utilisation

Quelques repères pour bien travailler ensemble J’apprends à déléguer davantage pour me consacrer au travail qui compte vraiment

---

## Ce qui compte pour moi

- **Apprendre et progresser sans cesse** - Apprendre de nouvelles choses me donne de l’énergie J’aime quand mon équipe partage cet état d’esprit
- **Avancer vite, quitte à se tromper** - Lance-toi Si quelque chose ne va pas, on corrigera ensemble plus tard Pas besoin d’attendre mon feu vert
- **Communication asynchrone** - Je préfère communiquer en asynchrone Quand tu m’écris, pars du principe que j’ai environ 5 minutes pour lire et te répondre
- **Communication directe** - Idéalement, des réponses en oui/non ou en chiffres Quelques lignes suffisent Mets les informations importantes bien en vue
- **Prendre les choses en main** - Si une tâche te paraît difficile, c’est sans doute que je ne t’ai pas donné assez de détails N’hésite pas à me demander ce dont tu as besoin
- **Simplicité** - Je n’aime pas la complexité inutile Un organigramme avec 12 cases, honnêtement, ça me dépasse

---

## Ce qui me met mal à l’aise

- **Le silence** - Quand je n’ai pas de nouvelles, je m’inquiète un peu Un simple « J’y travaille » ou « Je bloque ici » m’aide énormément
- **Changer de contexte** - Quand tu me fais un point, rappelle-moi où on en était Je l’ai sûrement lu, mais je ne m’en souviens peut-être plus
- **Le manque de retours** - Les retours sincères, même critiques, comptent beaucoup pour moi Me dire ce qui pourrait être mieux nous fait avancer tous les deux

---

## Comment communiquer avec moi

**L’asynchrone d’abord** Discord/Telegram ou un SMS, c’est parfait Court et en liste à puces, c’est l’idéal

**Je suis souvent en déplacement** Écris de façon à ce que le message se lise en un coup d’œil Mets l’essentiel au début

**Pose des questions précises** Si possible, pour que je puisse répondre par oui/non ou par un chiffre « Comment puis-je aider ? » marche mieux que « Tu penses que je devrais travailler sur X ? »

**Aide-moi à préparer les réunions** Envoie-moi les documents avant, pour que je sois tout de suite dans le sujet Après, un petit résumé avec les prochaines étapes est toujours bienvenu

---

## Comment m’écrire

Écris-moi sur Discord/Telegram Si c’est urgent, envoie-moi un SMS Des messages courts et sans liens, merci

**Les bonnes habitudes :**

- **Des objets clairs** - On doit comprendre tout de suite de quoi il s’agit
    - Bien : « Urgent : la proposition client doit être validée avant 15 h »
    - Moins bien : « Petite question »
- **Facilite les décisions rapides** - Propose des options numérotées
    - Bien : « Options de logo : 1 Bleu 2 Vert 3 Rouge Lequel ? Sans réponse d’ici ce soir, je pars sur le n° 1 »
    - Moins bien : « Quelle couleur on prend ? »
- **Signale ce qui est urgent** - Utilise les préfixes [Urgent], [Échéance proche] ou [Pour info]
- **Montre-moi** - Une capture d’écran en dit souvent plus qu’un long texte
    - Bien : « Nouvelle mise en page du tableau de bord : [capture d’écran] Qu’en penses-tu ? »
    - Moins bien : Une longue description des changements de mise en page
- **Termine par une prochaine étape claire** - De quoi as-tu besoin de ma part ?
- **Fais court** - Mets ta demande en premier, pour que je sache tout de suite quoi faire
- **Mieux vaut demander pardon que la permission** - « Je fais comme ça, dis-moi si ça ne va pas » vaut mieux que « Qu’en penses-tu ? »

---

## Comment je fixe les priorités

- **Les clients d’abord** - On fait toujours avancer les choses, ou on attend un retour du client
- **Le vendredi pour les projets perso** - Si tu travailles à temps plein, le vendredi est idéal pour tes projets personnels
- **Demande tôt** - Si quelque chose n’est pas clair, demande-moi tout de suite Je préfère y passer un peu de temps au début
- **Dis à qui tu attends quelque chose** - « J’attends que tu fasses X pour pouvoir livrer Y d’ici cette date, sinon Z »

---

## Travailler ensemble

- **Approprie-toi tes tâches** - Pas besoin d’attendre mon accord à chaque détail Avance, même si une erreur arrive de temps en temps
- **Tiens-moi au courant** - Le silence crée du stress, et même un petit point aide Dévier de 1 % chaque jour, c’est être complètement à côté en fin de semaine
- **Dis-moi franchement ce que tu penses** - Raconte-moi ce qui ne marche pas Tes retours m’aident à grandir
- **Fais un petit résumé après les réunions** - Des prochaines étapes claires et ce qui demande un retour

---

## Ma façon de diriger

Je suis un manager encore tout nouveau et j’aime laisser beaucoup d’autonomie Si l’équipe se trompe, j’en assume la responsabilité et j’y vois une occasion d’apprendre à devenir un meilleur leader
`,
  es: `# Manual de usuario

Algunas claves para trabajar bien juntos Estoy aprendiendo a delegar más para poder dedicarme al trabajo que de verdad marca la diferencia

---

## Lo que valoro

- **Aprender y crecer siempre** - Aprender cosas nuevas me da energía Me encanta cuando mi equipo lo vive igual
- **Avanzar rápido, aunque a veces nos equivoquemos** - Lánzate Si algo no sale bien, lo arreglamos juntos más adelante No hace falta esperar mi visto bueno
- **Comunicación asíncrona** - Prefiero la comunicación asíncrona Cuando me escribas, piensa que tengo unos 5 minutos para leerte y responder
- **Comunicación directa** - Mejor con respuestas de sí/no o números Con unas pocas líneas basta Deja la información importante bien a la vista
- **Hacerse cargo** - Si una tarea te parece difícil, seguramente no te di suficientes detalles Pídeme sin problema todo lo que necesites
- **Sencillez** - No me gusta la complejidad innecesaria Un diagrama de flujo con 12 cajas, sinceramente, me supera

---

## Lo que me cuesta

- **El silencio** - Cuando no sé nada, me pongo un poco nervioso Un simple «Estoy en ello» o «Aquí me he atascado» me ayuda muchísimo
- **Cambiar de contexto** - Cuando me pongas al día, recuérdame en qué punto estábamos Seguramente lo leí, pero puede que no lo recuerde
- **La falta de feedback** - Valoro mucho el feedback sincero, incluso cuando es crítico Contarme qué podría mejorar nos ayuda a crecer a los dos

---

## Cómo comunicarte conmigo

**Primero lo asíncrono** Discord/Telegram o un SMS son perfectos Corto y con viñetas es lo ideal

**Suelo estar en movimiento** Escribe para que el mensaje se lea de un vistazo Pon lo principal al principio

**Haz preguntas concretas** Si puedes, que se respondan con sí/no o con un número «¿Cómo puedo ayudarte?» funciona mejor que «¿Crees que debería trabajar en X?»

**Ayúdame a preparar las reuniones** Envíame el material antes, así llego centrado en el tema Después, un breve resumen con los próximos pasos siempre viene genial

---

## Cómo escribirme

Escríbeme por Discord/Telegram Si es urgente, mándame un SMS Mensajes cortos y sin enlaces, por favor

**Buenas costumbres:**

- **Asuntos claros** - Que se entienda enseguida de qué se trata
    - Bien: «Urgente: la propuesta del cliente necesita aprobación antes de las 15:00»
    - Menos bien: «Pregunta rápida»
- **Facilita decidir rápido** - Propón opciones numeradas
    - Bien: «Opciones de logo: 1 Azul 2 Verde 3 Rojo ¿Cuál? Si no sé nada antes de esta noche, voy con la n.º 1»
    - Menos bien: «¿Qué color usamos?»
- **Marca lo que tiene fecha límite** - Usa prefijos como [Urgente], [Con plazo] o [Para tu info]
- **Muéstramelo** - Una captura de pantalla dice más que mucho texto
    - Bien: «Nuevo diseño del panel: [captura] ¿Qué te parece?»
    - Menos bien: Una descripción larga de los cambios de diseño
- **Termina con un próximo paso claro** - ¿Qué necesitas de mí?
- **Sé breve** - Pon tu petición al principio, así sé enseguida qué hacer
- **Mejor pedir perdón que permiso** - «Lo hago así, avísame si no te convence» funciona mejor que «¿Qué opinas de esto?»

---

## Cómo priorizo

- **Primero los clientes** - Siempre vamos avanzando o esperando el feedback del cliente
- **Los viernes, para proyectos propios** - Si trabajas a tiempo completo, el viernes es buen día para tus proyectos personales
- **Pregunta pronto** - Si algo no está claro, pregúntame enseguida Prefiero dedicarle algo de tiempo al principio
- **Avisa a quién estás esperando** - «Estoy esperando a que hagas X para poder entregar Y en esta fecha, si no, Z»

---

## Trabajar juntos

- **Haz tuyas tus tareas** - No hace falta esperar mi aprobación en cada detalle Sigue adelante, aunque a veces haya errores
- **Mantenme al día** - El silencio genera estrés, y hasta una pequeña actualización ayuda Si cada día te desvías un 1%, al final de la semana estarás en otro sitio
- **Dime con sinceridad lo que piensas** - Cuéntame qué no funciona Tu feedback me ayuda a crecer
- **Resume después de las reuniones** - Próximos pasos claros y lo que necesite feedback

---

## Mi forma de liderar

Soy un manager nuevo y me gusta dar mucha autonomía Si el equipo se equivoca, asumo la responsabilidad y lo veo como una oportunidad para aprender a ser un mejor líder
`,
  fa: `# راهنمای کار با من

چند نکته برای اینکه با هم خوب و راحت کار کنیم دارم یاد می‌گیرم کارها را بیشتر به دیگران بسپارم تا بتوانم روی کارهایی تمرکز کنم که واقعاً اثرگذارند

---

## چیزهایی که برایم مهم است

- **همیشه یاد گرفتن و رشد کردن** - یاد گرفتن چیزهای تازه به من انرژی می‌دهد خوشحال می‌شوم اگر تیمم هم همین حس را داشته باشد
- **سریع جلو برویم، حتی اگر گاهی اشتباه کنیم** - با خیال راحت دست به کار شوید اگر جایی اشتباه شد، بعداً با هم درستش می‌کنیم لازم نیست منتظر تأیید من بمانید
- **ارتباط غیرهم‌زمان** - ارتباط غیرهم‌زمان را ترجیح می‌دهم وقتی پیام می‌دهید، در نظر بگیرید که حدود ۵ دقیقه برای خواندن و جواب دادن وقت دارم
- **ارتباط روشن و مستقیم** - اگر می‌شود، جواب‌ها بله/خیر یا عددی باشد چند خط کوتاه کافی است نکته‌های مهم را جلوی چشم بگذارید
- **مسئولیت‌پذیری** - اگر کاری سخت به نظر می‌رسد، احتمالاً من جزئیات کافی نداده‌ام هر چیزی لازم دارید، راحت بپرسید
- **سادگی** - از پیچیدگی بی‌دلیل خوشم نمی‌آید راستش فلوچارتی با ۱۲ مورد حسابی گیجم می‌کند

---

## چیزهایی که برایم سخت است

- **بی‌خبری** - وقتی خبری نمی‌رسد، کمی نگران می‌شوم یک «دارم رویش کار می‌کنم» یا «اینجا گیر کرده‌ام» خیلی کمکم می‌کند
- **جابه‌جایی بین موضوع‌ها** - وقتی خبر می‌دهید، یادم بیندازید کار کجا بود احتمالاً خوانده‌ام، ولی شاید یادم نمانده باشد
- **نبود بازخورد** - بازخورد صادقانه، حتی انتقادی، برایم خیلی ارزشمند است اگر بگویید چه چیزی می‌تواند بهتر شود، به هر دوی ما کمک می‌کند

---

## چطور با هم در ارتباط باشیم

**اول پیام غیرهم‌زمان** دیسکورد/تلگرام یا پیامک عالی است کوتاه و با فهرست نکته‌ها، بهترین حالت است

**اغلب در رفت‌وآمدم** طوری بنویسید که پیام با یک نگاه خوانده شود مهم‌ترین نکته را اول بگذارید

**سؤال‌های مشخص بپرسید** اگر می‌شود، طوری بپرسید که با بله/خیر یا یک عدد جواب داده شود «چطور می‌توانم کمک کنم؟» بهتر از «فکر می‌کنید باید روی X کار کنم؟» است

**کمکم کنید برای جلسه‌ها آماده شوم** مطالب را از قبل بفرستید تا سریع در جریان قرار بگیرم بعد از جلسه هم یک خلاصهٔ کوتاه با قدم‌های بعدی خیلی به کار می‌آید

---

## چطور به من پیام بدهید

در دیسکورد/تلگرام پیام بدهید اگر فوری است، پیامک بفرستید لطفاً کوتاه و بدون لینک

**چند عادت خوب:**

- **عنوان روشن** - از همان اول معلوم باشد موضوع چیست
    - خوب: «فوری: پیشنهاد مشتری باید تا ساعت ۱۵ تأیید شود»
    - نه چندان خوب: «یک سؤال کوتاه»
- **تصمیم‌گیری را آسان کنید** - گزینه‌ها را شماره‌گذاری کنید
    - خوب: «گزینه‌های لوگو: ۱ آبی ۲ سبز ۳ قرمز کدام؟ اگر تا آخر روز خبری نشد، با گزینهٔ ۱ جلو می‌روم»
    - نه چندان خوب: «چه رنگی استفاده کنیم؟»
- **کارهای زمان‌دار را مشخص کنید** - از پیشوندهای [فوری]، [زمان‌دار] یا [برای اطلاع] استفاده کنید
- **نشانم بدهید** - یک اسکرین‌شات خیلی سریع‌تر از متن منظور را می‌رساند
    - خوب: «چیدمان جدید داشبورد: [اسکرین‌شات] نظرتان چیست؟»
    - نه چندان خوب: توضیح طولانی دربارهٔ تغییرات چیدمان
- **با قدم بعدی روشن تمام کنید** - چه کاری از من لازم دارید؟
- **کوتاه بنویسید** - درخواستتان را اول بگذارید تا زود بفهمم چه کاری باید بکنم
- **عذرخواهی بهتر از اجازه گرفتن** - «این کار را این‌طور انجام می‌دهم، اگر درست نیست خبرم کنید» بهتر از «نظرتان دربارهٔ این چیست؟» است

---

## اولویت‌هایم را چطور می‌چینم

- **اول کار مشتری** - همیشه کار را جلو می‌بریم یا منتظر بازخورد مشتری هستیم
- **جمعه‌ها برای کارهای شخصی** - اگر تمام‌وقت کار می‌کنید، جمعه‌ها برای پروژه‌های شخصی‌تان روز خوبی است
- **زود بپرسید** - اگر چیزی روشن نیست، همین حالا بپرسید ترجیح می‌دهم از اول کمی وقت بگذارم
- **بگویید منتظر چه کسی هستید** - «منتظرم X را انجام دهید تا بتوانم Y را تا این تاریخ تحویل بدهم، وگرنه Z»

---

## کار کردن با هم

- **کارهایتان را از آن خودتان بدانید** - لازم نیست برای هر جزئیاتی منتظر تأیید من بمانید جلو بروید، حتی اگر گاهی اشتباهی پیش بیاید
- **مرتب خبر بدهید** - بی‌خبری استرس می‌آورد و حتی یک خبر کوچک هم کمک می‌کند اگر هر روز ۱٪ از مسیر دور شوید، آخر هفته کاملاً از مسیر خارج شده‌اید
- **رک نظرتان را بگویید** - بگویید چه چیزی خوب کار نمی‌کند بازخورد شما کمکم می‌کند رشد کنم
- **بعد از جلسه خلاصه بفرستید** - قدم‌های بعدی روشن و هر چیزی که به بازخورد نیاز دارد

---

## سبک رهبری من

مدیر تازه‌کاری هستم و دوست دارم به تیم آزادی عمل بدهم اگر تیم اشتباهی کند، مسئولیتش را می‌پذیرم و آن را فرصتی می‌بینم برای اینکه رهبر بهتری شوم
`,
  ar: `# دليل التعامل معي

بعض النصائح لنعمل معاً بسهولة وراحة أتعلم أن أفوّض أكثر حتى أتفرغ للعمل الذي يُحدث فرقاً حقيقياً

---

## ما يهمني

- **التعلّم والنمو دائماً** - تعلّم أشياء جديدة يمنحني الطاقة ويسعدني أن يشاركني فريقي هذا الشغف
- **التحرك بسرعة حتى لو أخطأنا أحياناً** - ابدأ بثقة إذا لم يسر شيء كما يجب، سنصلحه معاً لاحقاً لا داعي لانتظار موافقتي
- **التواصل غير المتزامن** - أفضّل التواصل غير المتزامن عندما تراسلني، اعتبر أن لديّ نحو 5 دقائق للقراءة والرد
- **التواصل الواضح والمباشر** - يُفضَّل أن تكون الإجابات بنعم/لا أو بالأرقام بضعة أسطر تكفي ضع المعلومات المهمة في مكان واضح
- **تحمّل المسؤولية** - إذا بدت لك مهمة صعبة، فغالباً لم أقدّم لك تفاصيل كافية لا تتردد في طلب كل ما تحتاجه
- **البساطة** - لا أحب التعقيد غير الضروري وبصراحة، مخطط انسيابي فيه 12 عنصراً يربكني تماماً

---

## ما يصعب عليّ

- **الصمت** - عندما لا تصلني أخبار، أشعر ببعض القلق رسالة بسيطة مثل «أعمل على ذلك» أو «توقفت هنا» تساعدني كثيراً
- **تبديل السياق** - عندما تحدّثني بالمستجدات، ذكّرني أين وصلنا غالباً قرأت الرسالة، لكن ربما لا أتذكرها
- **غياب الملاحظات** - أقدّر كثيراً الملاحظات الصادقة، حتى النقدية منها عندما تخبرني بما يمكن تحسينه، يتقدم كلانا

---

## كيف نتواصل

**التواصل غير المتزامن أولاً** ديسكورد/تيليجرام أو رسالة نصية خيار مثالي رسائل قصيرة بنقاط واضحة هي الأفضل

**غالباً ما أكون متنقلاً** اكتب رسالتك بحيث تُقرأ بنظرة سريعة وضع أهم المعلومات في البداية

**اسأل أسئلة محددة** إن أمكن، صغها بحيث يُجاب عنها بنعم/لا أو برقم «كيف يمكنني المساعدة؟» أفضل من «هل تعتقد أنني يجب أن أعمل على X؟»

**ساعدني على التحضير للاجتماعات** أرسل المواد مسبقاً حتى أكون حاضر الذهن وبعد الاجتماع، يكون ملخص قصير بالخطوات التالية مفيداً جداً

---

## كيف تراسلني

راسلني على ديسكورد/تيليجرام وإذا كان الأمر عاجلاً، أرسل لي رسالة نصية رسائل قصيرة ومن دون روابط من فضلك

**عادات مفيدة:**

- **عناوين واضحة** - ليتضح الموضوع من أول نظرة
    - جيد: «عاجل: عرض العميل يحتاج إلى موافقة قبل الساعة 3 مساءً»
    - أقل فائدة: «سؤال سريع»
- **سهّل اتخاذ القرار** - قدّم خيارات مرقّمة
    - جيد: «خيارات الشعار: 1 أزرق 2 أخضر 3 أحمر أيّها؟ إذا لم يصلني رد قبل نهاية اليوم، سأعتمد الخيار 1»
    - أقل فائدة: «ما اللون الذي نستخدمه؟»
- **ميّز ما له موعد نهائي** - استخدم البادئات [عاجل] أو [مرتبط بموعد] أو [للعلم]
- **أرِني** - لقطة شاشة توصل الفكرة أسرع من النص
    - جيد: «تصميم جديد للوحة المعلومات: [لقطة شاشة] ما رأيك؟»
    - أقل فائدة: وصف طويل لتغييرات التصميم
- **اختم بخطوة تالية واضحة** - ماذا تحتاج مني؟
- **اختصر** - ضع طلبك في البداية حتى أعرف فوراً ما المطلوب
- **الاعتذار لاحقاً أفضل من الاستئذان** - «سأفعل ذلك بهذه الطريقة، أخبرني إن لم يكن مناسباً» أفضل من «ما رأيك في هذا؟»

---

## كيف أرتّب أولوياتي

- **عمل العملاء أولاً** - نحرص دائماً على تقدّم العمل أو ننتظر ملاحظات العميل
- **أيام الجمعة للمشاريع الشخصية** - إذا كنت تعمل بدوام كامل، فالجمعة يوم مناسب لمشاريعك الخاصة
- **اسأل مبكراً** - إذا كان شيء غير واضح، اسألني فوراً أفضّل أن أخصص بعض الوقت في البداية
- **أخبر من تنتظره** - «أنتظر أن تُنجز X حتى أتمكن من تسليم Y بحلول هذا التاريخ، وإلا Z»

---

## العمل معاً

- **امتلك مهامك** - لا داعي لانتظار موافقتي على كل تفصيل تقدّم، حتى لو حدثت بعض الأخطاء
- **أبقني على اطلاع** - الصمت يسبب التوتر، وحتى التحديث الصغير يساعد إذا انحرفت 1% كل يوم، ستجد نفسك في مكان مختلف تماماً بنهاية الأسبوع
- **قل لي رأيك بصراحة** - أخبرني بما لا ينجح ملاحظاتك تساعدني على النمو
- **لخّص بعد الاجتماعات** - خطوات تالية واضحة وكل ما يحتاج إلى ملاحظات

---

## أسلوبي في القيادة

أنا مدير جديد وأحب أن أمنح الفريق مساحة واسعة من الحرية إذا أخطأ الفريق، أتحمّل المسؤولية وأراها فرصة لأتعلم كيف أصبح قائداً أفضل
`,
  tr: `# Kullanım Kılavuzu

Birlikte rahatça çalışabilmemiz için birkaç ipucu Daha fazla iş devretmeyi öğreniyorum, böylece gerçekten fark yaratan işlere odaklanabiliyorum

---

## Benim İçin Önemli Olanlar

- **Sürekli öğrenmek ve gelişmek** - Yeni şeyler öğrenmek bana enerji veriyor Ekibimin de böyle hissetmesi beni çok mutlu eder
- **Hızlı ilerlemek, ara sıra hata yapsak bile** - Çekinmeden harekete geç Bir şey ters giderse sonra birlikte düzeltiriz Benim onayımı beklemene gerek yok
- **Eşzamansız iletişim** - Eşzamansız iletişimi tercih ederim Bana yazdığında, okuyup cevap vermek için yaklaşık 5 dakikam olduğunu düşün
- **Net ve doğrudan iletişim** - Mümkünse evet/hayır ya da sayılarla ilerleyelim Birkaç satır yeterli Önemli bilgileri göz önünde tut
- **Sorumluluk almak** - Bir iş zor geliyorsa, büyük ihtimalle sana yeterince ayrıntı vermemişimdir İhtiyacın olan her şeyi rahatça sorabilirsin
- **Sadelik** - Gereksiz karmaşıklığı sevmem Açıkçası 12 kutulu bir akış şeması kafamı epey karıştırır

---

## Zorlandığım Şeyler

- **Sessizlik** - Haber alamayınca biraz endişelenirim Kısa bir “Üzerinde çalışıyorum” ya da “Burada takıldım” bile çok işime yarar
- **Bağlam değiştirmek** - Bana bilgi verirken nerede kaldığımızı kısaca hatırlat Muhtemelen okumuşumdur ama aklımda kalmamış olabilir
- **Geri bildirim eksikliği** - Dürüst, hatta eleştirel geri bildirim benim için çok değerli Neyin daha iyi olabileceğini söylemen ikimizi de ileri taşır

---

## Nasıl İletişim Kuralım

**Önce eşzamansız** Discord/Telegram ya da SMS harika olur Kısa ve maddeler hâlinde yazman en iyisi

**Çoğu zaman yoldayım** Mesajın bir bakışta okunabilsin En önemli bilgiyi başa koy

**Net sorular sor** Mümkünse evet/hayır ya da bir sayıyla cevaplanabilecek şekilde sor “Nasıl yardımcı olabilirim?” sorusu “Sence X üzerinde çalışmalı mıyım?” sorusundan daha iyi işler

**Toplantılara hazırlanmama yardım et** Materyalleri önceden gönder, böylece konuya hemen odaklanayım Toplantıdan sonra sonraki adımları içeren kısa bir özet de çok makbule geçer

---

## Bana Nasıl Yazmalısın

Bana Discord/Telegram üzerinden yazabilirsin Acilse SMS at Lütfen kısa ve bağlantısız mesajlar

**İşe yarayan alışkanlıklar:**

- **Net konu başlıkları** - Konunun ne olduğu hemen anlaşılsın
    - İyi: “Acil: Müşteri teklifinin saat 15:00’e kadar onaylanması gerekiyor”
    - Pek iyi değil: “Kısa bir soru”
- **Hızlı karar vermeyi kolaylaştır** - Numaralı seçenekler sun
    - İyi: “Logo seçenekleri: 1 Mavi 2 Yeşil 3 Kırmızı Hangisi? Gün sonuna kadar haber gelmezse 1 numarayla devam ediyorum”
    - Pek iyi değil: “Hangi rengi kullanalım?”
- **Süreli işleri belirt** - [Acil], [Süreli] veya [Bilgin olsun] ön eklerini kullan
- **Göster** - Bir ekran görüntüsü uzun bir metinden çok daha hızlı anlatır
    - İyi: “Yeni pano düzeni: [ekran görüntüsü] Ne dersin?”
    - Pek iyi değil: Düzen değişikliklerinin uzun uzun anlatılması
- **Net bir sonraki adımla bitir** - Benden ne yapmamı istiyorsun?
- **Kısa tut** - İsteğini en başa yaz, böylece ne yapmam gerektiğini hemen anlayayım
- **İzin istemek yerine gerekirse özür dile** - “Bunu böyle yapıyorum, yanlışsa haber ver” demek “Bu konuda ne düşünüyorsun?” demekten daha iyi işler

---

## Önceliklerimi Nasıl Belirlerim

- **Önce müşteri işi** - İşleri hep ilerletiriz ya da müşteriden geri bildirim bekleriz
- **Cuma günleri kişisel projelere** - Tam zamanlı çalışıyorsan, cuma kişisel projelerin için güzel bir gün
- **Erken sor** - Bir şey net değilse hemen sor Başta biraz zaman ayırmayı tercih ederim
- **Kimi beklediğini söyle** - “Y’yi bu tarihe kadar teslim edebilmem için X’i yapmanı bekliyorum, yoksa Z”

---

## Birlikte Çalışmak

- **İşini sahiplen** - Her ayrıntı için onayımı beklemene gerek yok İlerle, arada bir hata olsa da olur
- **Beni haberdar et** - Sessizlik strese yol açar, küçük bir güncelleme bile işe yarar Her gün %1 sapan, hafta sonunda bambaşka bir yerde bulur kendini
- **Bana açıkça ne düşündüğünü söyle** - Neyin işlemediğini anlat Geri bildirimin büyümeme yardım ediyor
- **Toplantılardan sonra kısa bir özet geç** - Net sonraki adımlar ve geri bildirim gereken her şey

---

## Liderlik Yaklaşımım

Yeni bir yöneticiyim ve ekibime bolca alan tanımayı seviyorum Ekip bir hata yaparsa sorumluluğu ben üstlenirim ve bunu daha iyi bir lider olmayı öğrenmek için bir fırsat olarak görürüm
`,
};
