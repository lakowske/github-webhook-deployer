github-webhook-deployer listens for github webhook push events.  

When a push event occurs, the current directory's branch is compared to the push event branch.
If they are the same, git pull is called and the server process terminates.
The server process restarts using forever (or an equivelent daemon manager).
Deployment is complete and you are running the latest code.



  