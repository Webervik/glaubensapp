# WEITER GLAUBEN

Erster klickbarer Prototyp für eine offene, wissenschaftlich informierte und spirituell sensible Glaubens-App. Der Name ist bewusst mehrdeutig: im Glauben weitergehen und zugleich weiter, offener glauben.

Zum Starten `index.html` direkt im Browser öffnen oder im Ordner einen lokalen Webserver starten.

## Im Prototyp enthalten

- Startseite mit klarem Produktversprechen
- exemplarischer Tagesimpuls mit drei Perspektiven
- drei thematische Entdeckungswege
- vollständig ausgearbeiteter 7-teiliger Weg „Die Bibel lesen, ohne sie wörtlich zu nehmen“
- lokal gespeicherter Lernfortschritt und persönliche Reflexionsnotizen
- Export und Import des Lernstands; persönliche Notizen nur nach aktiver Auswahl
- anonyme geräteübergreifende Sicherung mit clientseitiger AES-GCM-Verschlüsselung und Wiederherstellungscode
- behutsame Einladung zur offiziellen landeskirchlichen Gemeindesuche
- Eingabe für persönliche Glaubensfragen
- responsive Darstellung für Smartphone und Desktop

Die Inhalte sind redaktionelle Demonstrationen und noch kein vollständig geprüftes oder lizenziertes Inhaltsangebot.

## Verschlüsselte Online-Sicherung

Der Browser erzeugt den Wiederherstellungscode, verschlüsselt den ausgewählten Lernstand lokal und sendet nur den verschlüsselten Datenblock sowie einen aus dem Code abgeleiteten Bezeichner an die API. Der Server kennt den Code und den Klartext nicht. Datensätze laufen zwölf Monate nach der letzten Aktualisierung ab.

## Inhaltliche Prüfung

Vor einer Veröffentlichung sollten Bibelwissenschaftler:innen, jüdische Gesprächspartner:innen und Menschen mit Erfahrungen religiösen Machtmissbrauchs den Lernweg gemeinsam prüfen. Besonders Aussagen zur Entstehung biblischer Texte und zum jüdisch-christlichen Verhältnis benötigen eine verantwortliche redaktionelle Abnahme.
