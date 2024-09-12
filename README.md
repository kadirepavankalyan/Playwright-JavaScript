Setup token as globally
git config --global credential.helper store
git config --global credential.https://github.com.token "add your token"

Commands to push the code to the repository:
 git init
 git status
 git add filename or git add . 
 git commit -m "first commit"
 git log
 git branch -M main
 git branch
 git remote add origin "github repo url"
 git push -u origin main 
