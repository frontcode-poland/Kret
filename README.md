# Kret
Zestaw gier i narzędzi wspomagających rehabilitację i rozwój dzieci cierpiących na neurologiczne zaburzenie rozwoju.

## Wymagania
Do uruchumienia projektu wymagane są:
* **Node.js** w ostatniej stabilnej wersji (LTS)
* **Gulp** zainstalowany globalnie (npm i -g gulp)
* **Typescript** zainstalowany globalnie (npm i -g typescript)

## Instalcja projektu 
Przed rozpoczęciem prac nad rozwojem projektu należy zainstalować wszystkie wymagane zależności, których lista znajduje się w pliku **package.json**.
Wykonaj poniższą komendę i poczekaj aż manager pakietów npm zainstaluje wymagane pakiety:
```bash
npm istall
```

## Uruchomienie
Projekt uruchamiamy za pomocą **Gulpa** (task runner'a). Służy do tego polecenie:
```bash
gulp
```
Po chwili w domyślnej przeglądarce powinna otworzyć się w nowej karcie nasza aplikacja. Domyślnym adresem i portem uruchamianego przez nas projektu jest **http://localhost:3000**

## Struktura projektu
Projekt podzielony jest na kilka katalogów. Każdy z nich odpowiada za konkretne warstwy funkcjonalne aplikacji.

* _**./src/templates/**_ katalog z templatkami stron i komponentów. Z tych plików generowane są statyczne pliki HTML. Więcej na ten temat przeczytasz tutaj: [Nunjucks](https://mozilla.github.io/nunjucks/).

* _**./src/assets/styles/**_ katalog ze stylami opisującymi cały projekt. Do pisania styli wykorzystany został preprocessor **Sass** a piki zawarte w tym katalogu posegregowane zostały zgdnie ze wzorcem architektury [7-1](https://sass-guidelin.es/pl/).

* _**./src/assets/scripts/**_ katalog ze skryptami. W projekcie tym do wytwarzania kodu JavaScript wykorzystany został Typescript, który przy pomocy Gulpa i Webpacka kompiluje pliki ***.ts** do dwóch wynikowych plików JS: scripts.min.js oraz scripts.vendors.min.js.

* _**./src/assets/[images/fonts...]**_ ponadto w katalogu assets znajdują się foldery pomocnicze dla plików odpowiadające ich rodzajom - katalog dla plików graficznych / fontów etc.

## Flow wytwarzania oprogramowania
Aplikację rozwijamy wspomagając się techniką GitFlow:
* [Bardzo przejrzysty opis techniki wraz z przykładami](https://nvie.com/posts/a-successful-git-branching-model/)
* [Opis techniki stworzony przez zespół firmy Attlassian](https://pl.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

