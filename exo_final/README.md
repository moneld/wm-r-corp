# Execution du programme

Le code a été dévéloppé en JS. Veuillez executer: ``npm i``

Voici la liste de nos commandes
``node todo.js add "Test task" `` : Pour ajouter une tache
``node todo.js done 1`` : Pour marquer une tache à done. Nb: 1 represente l'id de la tache
``node todo.js list`` : Pour visualiser la liste des taches
``node todo.js report`` : Pour generer le rapport des taches passées à done

En cas de mauvais commande frappé, le message retourné dans la console est : ``Unknown command``

# Execution des tests

Pour executer les tests, la commande est: ``npx jest``