# Netisoft rek

## Baza danych mysql

> Dostęp do bazy domyślnie jest ustawiony na użytkownika root na localhost, zmiana tych parametrów odbywa się w pliku ".env"

1. Utworzenie bazy `php bin/console doctrine:database:create`
1. Update schematów `php bin/console doctrine:schema:update --force`

# Uruchomienie

1. Do uruchomienia potrzebne są:
    1. Npm [Link do pobrania](https://nodejs.org/en)
    1. Symfony [Link do pobrania](https://symfony.com/download)
    1. Php [Link do pobrania](https://www.php.net/downloads.php)
    1. Mysql [Link do pobrania](https://dev.mysql.com/downloads/)
1. Zainstaluj dependencie `npm i`
1. Uruchom za pomocą komendy `npm start`
1. Uruchom serwer mysql
